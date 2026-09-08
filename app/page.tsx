'use client';

import { useCallback, useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { BookOpen, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, Flag, Languages, Menu, RefreshCw, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { exams as baseExams8, type Exam, type Question } from '@/lib/exams';
import { additionalExams8 } from '@/lib/exams8-content';
import { exams9 } from '@/lib/exams9';
import { exams10 } from '@/lib/exams10';
import { vocabularyByGrade, type VocabularyItem } from '@/lib/vocabulary';

type Answers = Record<number, number>;
type ExamMode = 'practice' | 'test';
type GradeLevel = 8 | 9 | 10;
type MenuGroup = NonNullable<Exam['menuGroup']>;
type ModelContext = { registerTool: (tool: Record<string, unknown>, options?: { signal: AbortSignal }) => void | Promise<void> };
type DictionaryState = { word: string; translation: string; status: 'loading' | 'ready' | 'error' | 'empty'; x: number; y: number };
const exams8 = [...baseExams8, ...additionalExams8];

function buildTestQuestions(examQuestions: Question[], allExams: { questions: Question[] }[], examIndex: number) {
  const chosen = [...examQuestions];
  const seen = new Set(chosen.map((item) => `${item.prompt}|${item.options.join('|')}`));
  const orderedExams = [...allExams.slice(examIndex + 1), ...allExams.slice(0, examIndex + 1)];
  for (const item of orderedExams.flatMap((entry) => entry.questions).filter((entry) => entry.section === 'Language Focus')) {
    const key = `${item.prompt}|${item.options.join('|')}`;
    if (!seen.has(key)) {
      chosen.push(item);
      seen.add(key);
    }
    if (chosen.length === 40) break;
  }
  return chosen.slice(0, 40).map((item, index) => ({ ...item, id: index + 1 }));
}

function randomVocabulary(grade: GradeLevel): VocabularyItem[] {
  return [...vocabularyByGrade[grade]].sort(() => Math.random() - 0.5).slice(0, 3);
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function UnderlinedOption({ text, target }: { text: string; target?: string }) {
  if (!target) return <>{text}</>;
  const start = text.toLowerCase().indexOf(target.toLowerCase());
  if (start < 0) return <>{text}</>;
  return <>{text.slice(0, start)}<u className="decoration-2 underline-offset-4">{text.slice(start, start + target.length)}</u>{text.slice(start + target.length)}</>;
}

export default function Home() {
  const [grade, setGrade] = useState<GradeLevel>(8);
  const [mode, setMode] = useState<ExamMode>('practice');
  const [examIndex, setExamIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(60 * 60);
  const [submitted, setSubmitted] = useState(false);
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [dictionary, setDictionary] = useState<DictionaryState | null>(null);
  const availableExams = grade === 8 ? exams8 : grade === 9 ? exams9 : exams10;
  const exam = availableExams[examIndex];
  const questions = useMemo(() => mode === 'test' ? buildTestQuestions(exam.questions, availableExams, examIndex) : exam.questions, [availableExams, exam, examIndex, mode]);
  const question = questions[questionIndex];
  const selected = answers[question.id];
  const isAnswered = selected !== undefined;
  const isCorrect = selected === question.answer;
  const trueFalseQuestions = questions.filter((item) => item.section === 'Reading' && item.options.length === 2 && item.options[0] === 'True' && item.options[1] === 'False');
  const isTrueFalseBlock = trueFalseQuestions.some((item) => item.id === question.id);

  const score = useMemo(() => questions.filter((item) => answers[item.id] === item.answer).length, [answers, questions]);
  const answeredCount = Object.keys(answers).length;
  const feedbackVisible = mode === 'practice' || submitted;
  const canSubmit = mode === 'test' ? answeredCount === questions.length : answeredCount > 0;

  useEffect(() => {
    if (mode !== 'test' || submitted || secondsLeft <= 0) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [mode, secondsLeft, submitted]);

  useEffect(() => {
    setVocabulary(randomVocabulary(grade));
  }, [grade, examIndex]);

  const selectExam = useCallback((index: number) => {
    setExamIndex(index);
    setQuestionIndex(0);
    setAnswers({});
    setFlagged([]);
    setSubmitted(false);
    setSecondsLeft(60 * 60);
    setDictionary(null);
  }, []);

  const switchGrade = (nextGrade: GradeLevel) => {
    setGrade(nextGrade);
    setExamIndex(0);
    setQuestionIndex(0);
    setAnswers({});
    setFlagged([]);
    setSubmitted(false);
    setSecondsLeft(60 * 60);
    setDictionary(null);
  };

  const switchMode = (nextMode: ExamMode) => {
    setMode(nextMode);
    setQuestionIndex(0);
    setAnswers({});
    setFlagged([]);
    setSubmitted(false);
    setSecondsLeft(60 * 60);
    setDictionary(null);
  };

  const chooseAnswer = useCallback((value: number) => {
    setAnswers((current) => ({ ...current, [questions[questionIndex].id]: value }));
  }, [questions, questionIndex]);

  const openDictionary = async (event: ReactMouseEvent<HTMLElement>) => {
    if (mode !== 'practice') return;
    event.preventDefault();
    const selectedText = window.getSelection()?.toString().trim().replace(/\s+/g, ' ') ?? '';
    const x = Math.min(event.clientX, window.innerWidth - 300);
    const y = Math.min(event.clientY, window.innerHeight - 190);
    if (!selectedText || selectedText.length > 120 || !/[a-zA-Z]/.test(selectedText)) {
      setDictionary({ word: '', translation: 'Hãy bôi đen một từ hoặc cụm từ tiếng Anh, sau đó nhấp chuột phải.', status: 'empty', x, y });
      return;
    }
    setDictionary({ word: selectedText, translation: 'Đang tra nghĩa…', status: 'loading', x, y });
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(selectedText)}&langpair=en|vi`);
      if (!response.ok) throw new Error('Translation failed');
      const data = await response.json() as { responseData?: { translatedText?: string } };
      const translation = data.responseData?.translatedText?.trim();
      if (!translation) throw new Error('No translation');
      setDictionary({ word: selectedText, translation, status: 'ready', x, y });
    } catch {
      setDictionary({ word: selectedText, translation: 'Chưa tra được nghĩa. Hãy kiểm tra kết nối mạng và thử lại.', status: 'error', x, y });
    }
  };

  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const report = () => undefined;
    try {
      void Promise.resolve(context.registerTool({
        name: 'select_exam',
        title: 'Chọn đề luyện tập',
        description: `Mở một đề trong bộ Tiếng Anh ${grade} hiện tại và đặt lại lượt làm bài.`,
        inputSchema: { type: 'object', properties: { examNumber: { type: 'integer', minimum: 1, maximum: availableExams.length } }, required: ['examNumber'], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input: unknown) {
          const value = (input as { examNumber?: number }).examNumber;
          if (!Number.isInteger(value) || !value || value < 1 || value > availableExams.length) throw new Error(`examNumber must be an integer from 1 to ${availableExams.length}`);
          selectExam(value - 1);
          return { examNumber: value, status: 'ready' };
        },
      }, { signal: lifecycle.signal })).catch(report);
      void Promise.resolve(context.registerTool({
        name: 'answer_current_question',
        title: 'Trả lời câu hiện tại',
        description: 'Chọn đáp án theo số thứ tự (1–4) cho câu hỏi đang hiển thị và trả lại kết quả đúng/sai.',
        inputSchema: { type: 'object', properties: { optionNumber: { type: 'integer', minimum: 1, maximum: 4 } }, required: ['optionNumber'], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input: unknown) {
          const value = (input as { optionNumber?: number }).optionNumber;
          if (!Number.isInteger(value) || !value || value < 1 || value > question.options.length) throw new Error(`optionNumber must be from 1 to ${question.options.length}`);
          chooseAnswer(value - 1);
          return mode === 'practice'
            ? { question: question.id, correct: value - 1 === question.answer, correctOptionNumber: question.answer + 1 }
            : { question: question.id, status: 'recorded' };
        },
      }, { signal: lifecycle.signal })).catch(report);
    } catch { report(); }
    return () => lifecycle.abort();
  }, [availableExams.length, chooseAnswer, grade, mode, question, selectExam]);

  const resetExam = () => selectExam(examIndex);
  const toggleFlag = () => setFlagged((items) => items.includes(question.id) ? items.filter((id) => id !== question.id) : [...items, question.id]);

  const renderExamButton = (item: (typeof availableExams)[number], index: number) => (
    <button key={item.id} onClick={() => selectExam(index)} className={`group rounded-2xl px-3 py-2.5 text-left transition ${index === examIndex ? 'bg-sky-600 text-white shadow-md shadow-sky-100' : 'bg-sky-50 text-[#15324a] hover:bg-sky-100'}`}>
      <span className="block font-bold">{item.menuLabel ?? `Đề số ${item.id}`}</span>
    </button>
  );

  const menuGroups: [MenuGroup, string][] = grade === 9
    ? [
        ['unit', 'Học theo Unit'],
        ['review', 'Ôn tập'],
        ['survey', 'Khảo sát đầu năm'],
        ['midterm', 'Đề giữa kỳ I'],
        ['final', 'Đề cuối kỳ I'],
      ]
    : [
        ['unit', 'Học theo Unit'],
        ['midterm', 'Đề giữa kỳ I'],
        ['review', 'Ôn tập cuối kỳ I'],
        ['final', 'Đề cuối kỳ I'],
      ];

  const examMenu = (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-sky-700">Nội dung · English {grade}</p>
      <nav className="grid gap-3">
        {menuGroups.map(([group, label]) => {
          const groupItems = availableExams
            .map((item, index) => ({ item, index }))
            .filter(({ item }) => item.menuGroup === group);

          if (groupItems.length === 0) return null;

          return <details key={`${grade}-${group}`} className="group overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-sky-50 px-3 py-3 font-bold text-sky-900 transition hover:bg-sky-100 [&::-webkit-details-marker]:hidden">
              <span>{label}</span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-sky-700">{groupItems.length}</span>
                <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
              </span>
            </summary>
            <div className="grid gap-2 border-t border-sky-100 p-2">
              {groupItems.map(({ item, index }) => renderExamButton(item, index))}
            </div>
          </details>;
        })}
      </nav>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f7fbff] text-[#15324a]">
      <header className="sticky top-0 z-30 border-b border-sky-100 bg-white/92 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={grade === 8 ? 'duck-grade8-reading.png' : grade === 9 ? 'duck-grade9-explorer.png' : 'duck-learn.png'} alt={`Mascot vịt vàng English ${grade}`} className="h-12 w-12 rounded-xl object-cover object-top" />
            <div><strong className="block text-lg leading-tight">Vịt Nhỏ English {grade}</strong><span className="hidden text-sm text-slate-500 sm:block">{grade === 8 ? 'Ôn giữa kỳ thật nhẹ nhàng' : grade === 9 ? 'Vững nền tảng, tự tin vào lớp 9' : 'Học chắc từng Unit, tiến bộ mỗi ngày'}</span></div>
          </div>
          <div className="flex rounded-2xl border border-sky-100 bg-sky-50 p-1" aria-label="Chọn khối lớp">
            {([8, 9, 10] as GradeLevel[]).map((item) => <button key={item} onClick={() => switchGrade(item)} className={`rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:px-4 ${grade === item ? 'bg-sky-600 text-white shadow-sm' : 'text-sky-800 hover:bg-white'}`} aria-pressed={grade === item}>English {item}</button>)}
          </div>
          <span className="hidden rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800 xl:inline">{availableExams.length} mục học · {availableExams.reduce((total, item) => total + item.questions.length, 0)} câu</span>
          <Sheet><SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Mở danh sách đề" />}><Menu /></SheetTrigger><SheetContent side="left"><SheetTitle className="mb-5">Chọn đề</SheetTitle>{examMenu}</SheetContent></Sheet>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[210px_minmax(0,1fr)_250px]">
        <aside className="hidden self-start rounded-3xl border border-sky-100 bg-white p-4 shadow-sm lg:block">{examMenu}</aside>

        <section className="min-w-0" onContextMenu={openDictionary}>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-sky-700"><BookOpen className="size-4"/> English {grade} · {question.section}</p><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{exam.title}</h1></div>
            <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold shadow-sm">{isTrueFalseBlock ? `Câu ${questions.indexOf(trueFalseQuestions[0]) + 1}–${questions.indexOf(trueFalseQuestions.at(-1)!) + 1}` : `Câu ${questionIndex + 1}`} / {questions.length}</span>
          </div>
          <div className="mb-3 grid gap-2 text-sm sm:grid-cols-2">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-950"><strong>Luyện tập:</strong> không giới hạn thời gian; đáp án và hướng dẫn xuất hiện sau khi chọn. Bôi đen tiếng Anh rồi nhấp chuột phải để dịch.</div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700"><strong>Làm bài test:</strong> 40 câu trong 60 phút; làm đủ và nộp bài mới xem kết quả.</div>
          </div>
          <div className="mb-5 grid grid-cols-2 rounded-2xl border border-sky-100 bg-white p-1.5 shadow-sm">
            <button onClick={() => switchMode('practice')} className={`rounded-xl px-3 py-2.5 text-sm font-bold transition ${mode === 'practice' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-sky-50'}`}>Luyện tập</button>
            <button onClick={() => switchMode('test')} className={`rounded-xl px-3 py-2.5 text-sm font-bold transition ${mode === 'test' ? 'bg-[#123c5a] text-white shadow-sm' : 'text-slate-600 hover:bg-sky-50'}`}>Làm bài test</button>
          </div>
          {exam.sourceNote && <p className="mb-5 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-900"><strong>Nguồn ôn tập:</strong> {exam.sourceNote}</p>}
          {exam.reviewNotes && <details className="mb-5 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/70" open>
            <summary className="cursor-pointer px-5 py-4 font-bold text-amber-950">Kiến thức cần nhớ trước khi luyện</summary>
            <div className="grid gap-3 border-t border-amber-200 p-4 sm:grid-cols-2">
              {exam.reviewNotes.map((note) => <div key={note.title} className="rounded-2xl bg-white p-4 shadow-sm">
                <strong className="text-sky-800">{note.title}</strong>
                <p className="mt-1 text-sm leading-6 text-slate-700">{note.rule}</p>
                <p className="mt-2 rounded-lg bg-sky-50 px-3 py-2 text-sm font-medium text-sky-900">Ví dụ: {note.example}</p>
              </div>)}
            </div>
          </details>}
          <Progress value={(answeredCount / questions.length) * 100} className="mb-5 h-2.5" />

          {submitted ? (
            <article className="overflow-hidden rounded-[28px] border border-sky-100 bg-white text-center shadow-[0_16px_50px_rgba(24,95,140,.08)]">
              <div className="bg-sky-600 px-6 py-8 text-white"><img src="duck-celebrate.png" alt="Vịt nhỏ chúc mừng" className="mx-auto h-36 w-36 object-contain drop-shadow-lg"/><p className="mt-2 text-sm font-bold uppercase tracking-[.18em] text-sky-100">Đã hoàn thành English {grade} · {exam.menuLabel ?? `Đề ${exam.id}`}</p><h2 className="mt-2 text-4xl font-extrabold">{score}/{questions.length} câu đúng</h2></div>
              <div className="p-7">
                <p className="text-lg text-slate-600">{score / questions.length >= 0.8 ? 'Xuất sắc! Vịt Nhỏ thấy bạn đã nắm bài rất chắc.' : score / questions.length >= 0.6 ? 'Làm tốt lắm! Xem lại vài câu sai là bạn sẽ tiến bộ nhanh.' : 'Mình cùng xem lại đáp án rồi thử lần nữa nhé.'}</p>
                <div className="mt-7 space-y-3 text-left">
                  <h3 className="text-lg font-bold">Đáp án và hướng dẫn giải</h3>
                  {questions.map((item, index) => {
                    const chosen = answers[item.id];
                    const correct = chosen === item.answer;
                    return <details key={item.id} className={`rounded-2xl border ${correct ? 'border-emerald-200 bg-emerald-50/60' : 'border-rose-200 bg-rose-50/60'}`}>
                      <summary className="cursor-pointer list-none p-4 font-semibold"><span className={`mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm text-white ${correct ? 'bg-emerald-500' : 'bg-rose-500'}`}>{correct ? '✓' : '×'}</span>Câu {index + 1}: {item.prompt}</summary>
                      <div className="border-t border-current/10 px-4 pb-4 pt-3 text-sm leading-6">
                        <p>Bạn chọn: <strong>{chosen === undefined ? 'Chưa trả lời' : `${String.fromCharCode(65 + chosen)}. ${item.options[chosen]}`}</strong></p>
                        <p>Đáp án đúng: <strong>{String.fromCharCode(65 + item.answer)}. {item.options[item.answer]}</strong></p>
                        <p className="mt-2 text-slate-700">{item.explanation}</p>
                      </div>
                    </details>;
                  })}
                </div>
                <Button onClick={resetExam} size="lg" className="mt-7 rounded-xl bg-sky-600"><RotateCcw /> Làm lại đề</Button>
              </div>
            </article>
          ) : (
            <article className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_16px_50px_rgba(24,95,140,.08)] sm:p-8">
              <div className="mb-5 flex items-center justify-between gap-3"><span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">{question.section === 'Reading' ? `Bài đọc · ${exam.passageTitle}` : 'Ngữ âm · Từ vựng · Ngữ pháp'}</span><button onClick={toggleFlag} className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${flagged.includes(question.id) ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:bg-slate-50'}`}><Flag className="size-4" fill={flagged.includes(question.id) ? 'currentColor' : 'none'}/> {flagged.includes(question.id) ? 'Đã đánh dấu' : 'Đánh dấu'}</button></div>
              {question.section === 'Reading' && <div className="mb-6 max-h-52 overflow-y-auto rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-[15px] leading-7 text-slate-700"><strong className="mb-2 block text-amber-900">{exam.passageTitle}</strong>{exam.passage}</div>}
              {isTrueFalseBlock ? (
                <div>
                  <p className="mb-4 text-lg font-semibold">Decide whether each statement is True or False.</p>
                  <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <Table>
                      <TableHeader><TableRow className="bg-[#123c5a] hover:bg-[#123c5a]"><TableHead className="w-full min-w-64 text-white">Câu nhận định</TableHead><TableHead className="w-24 text-center text-white">True</TableHead><TableHead className="w-24 text-center text-white">False</TableHead></TableRow></TableHeader>
                      <TableBody>{trueFalseQuestions.map((item, rowIndex) => {
                        const rowAnswer = answers[item.id];
                        const rowAnswered = rowAnswer !== undefined;
                        const rowCorrect = rowAnswer === item.answer;
                        return <TableRow key={item.id} className={rowAnswered && feedbackVisible ? rowCorrect ? 'bg-emerald-50/60' : 'bg-rose-50/70' : ''}>
                          <TableCell className="whitespace-normal py-4 align-top text-base font-medium"><span className="mr-2 font-bold">{questions.indexOf(item) + 1}.</span>{item.prompt}{rowAnswered && feedbackVisible && <div className={`mt-3 rounded-xl p-3 text-sm font-normal leading-relaxed ${rowCorrect ? 'bg-emerald-100/70 text-emerald-900' : 'bg-rose-100/80 text-rose-900'}`}><strong>{rowCorrect ? 'Chính xác. ' : `Chưa đúng — đáp án là ${item.options[item.answer]}. `}</strong>{item.explanation}</div>}</TableCell>
                          {[0,1].map((value) => <TableCell key={value} className="text-center align-top"><button onClick={() => setAnswers((current) => ({ ...current, [item.id]: value }))} aria-label={`Câu ${rowIndex + 1}: chọn ${value === 0 ? 'True' : 'False'}`} aria-pressed={rowAnswer === value} className={`mx-auto grid h-10 w-10 place-items-center rounded-full border-2 transition ${rowAnswer === value ? feedbackVisible ? value === item.answer ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-rose-500 bg-rose-500 text-white' : 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300 bg-white hover:border-sky-500'}`}>{rowAnswer === value && (feedbackVisible ? value === item.answer ? <Check className="size-5"/> : <X className="size-5"/> : <Check className="size-5"/>)}</button></TableCell>)}
                        </TableRow>;
                      })}</TableBody>
                    </Table>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3"><Button variant="outline" onClick={() => setQuestionIndex(Math.max(0, questions.indexOf(trueFalseQuestions[0]) - 1))} className="rounded-xl"><ChevronLeft/> Câu trước</Button>{questions.indexOf(trueFalseQuestions.at(-1)!) < questions.length - 1 ? <Button onClick={() => setQuestionIndex(questions.indexOf(trueFalseQuestions.at(-1)!) + 1)} className="rounded-xl bg-sky-600 px-5 hover:bg-sky-700">Câu tiếp <ChevronRight/></Button> : <Button disabled={!canSubmit} onClick={() => setSubmitted(true)} className="rounded-xl bg-[#123c5a] px-5 hover:bg-[#0e3048]">Nộp bài</Button>}</div>
                </div>
              ) : (
                <>
                  <p className="mb-5 text-lg font-semibold leading-relaxed">{question.prompt}</p>
                  <RadioGroup value={isAnswered ? String(selected) : ''} onValueChange={(value) => chooseAnswer(Number(value))} className="grid gap-3">
                    {question.options.map((option, index) => {
                      const chosen = selected === index;
                      const correct = isAnswered && index === question.answer;
                      const wrong = chosen && !isCorrect;
                      return <label key={option} className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${feedbackVisible && correct ? 'border-emerald-400 bg-emerald-50' : feedbackVisible && wrong ? 'border-rose-400 bg-rose-50' : chosen ? 'border-sky-500 bg-sky-50' : 'border-slate-200 hover:border-sky-300 hover:bg-sky-50/40'}`}><RadioGroupItem value={String(index)} className="mt-0.5"/><span className="flex-1 text-base font-medium"><b className="mr-2">{String.fromCharCode(65 + index)}.</b><UnderlinedOption text={option} target={question.underlines?.[index]} /></span>{feedbackVisible && correct && <Check className="size-5 text-emerald-600"/>}{feedbackVisible && wrong && <X className="size-5 text-rose-600"/>}</label>;
                    })}
                  </RadioGroup>
                  {isAnswered && feedbackVisible && <div aria-live="polite" className={`mt-5 overflow-hidden rounded-2xl border ${isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-rose-200 bg-rose-50 text-rose-900'}`}><div className={`px-4 py-2 text-sm font-bold uppercase tracking-wide ${isCorrect ? 'bg-emerald-100' : 'bg-rose-100'}`}>Hướng dẫn giải chi tiết</div><div className="p-4"><strong>{isCorrect ? 'Chính xác!' : `Chưa đúng. Đáp án: ${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`}</strong><p className="mt-2 text-[15px] leading-7 opacity-90">{question.explanation}</p></div></div>}
                  <div className="mt-6 flex items-center justify-between gap-3"><Button variant="outline" disabled={questionIndex === 0} onClick={() => setQuestionIndex((value) => value - 1)} className="rounded-xl"><ChevronLeft/> Câu trước</Button>{questionIndex === questions.length - 1 ? <Button disabled={!canSubmit} onClick={() => setSubmitted(true)} className="rounded-xl bg-[#123c5a] px-5 hover:bg-[#0e3048]">Nộp bài</Button> : <Button onClick={() => setQuestionIndex((value) => value + 1)} className="rounded-xl bg-sky-600 px-5 hover:bg-sky-700">Câu tiếp <ChevronRight/></Button>}</div>
                </>
              )}
            </article>
          )}
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {mode === 'test' ? <div className="rounded-3xl bg-[#123c5a] p-5 text-white shadow-lg shadow-sky-100"><div className="mb-3 flex items-center justify-between"><span className="text-sm text-sky-100">Thời gian còn lại</span><Clock3 className="size-5 text-amber-300"/></div><strong suppressHydrationWarning className="font-mono text-3xl tracking-tight">{formatTime(secondsLeft)}</strong><div className="mt-4 flex justify-between border-t border-white/15 pt-3 text-sm"><span>Đã làm</span><b>{answeredCount}/{questions.length}</b></div><Button disabled={!canSubmit} onClick={() => setSubmitted(true)} className="mt-4 w-full bg-amber-500 font-bold text-white hover:bg-amber-600">NỘP BÀI</Button>{answeredCount < questions.length && <p className="mt-2 text-center text-xs leading-5 text-sky-100">Làm đủ 40 câu để mở nút nộp bài.</p>}</div> : <div className="rounded-3xl bg-sky-600 p-5 text-white shadow-lg shadow-sky-100"><div className="flex items-center justify-between"><span className="font-bold">Luyện tập tự do</span><BookOpen className="size-5 text-amber-200"/></div><p className="mt-2 text-sm leading-6 text-sky-50">Không giới hạn thời gian. Chọn đáp án để xem hướng dẫn ngay.</p><div className="mt-4 flex justify-between border-t border-white/20 pt-3 text-sm"><span>Đã luyện</span><b>{answeredCount}/{questions.length}</b></div>{answeredCount > 0 && <Button onClick={() => setSubmitted(true)} className="mt-4 w-full bg-white font-bold text-sky-700 hover:bg-sky-50">XEM TỔNG KẾT</Button>}</div>}
          <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm"><p className="mb-3 text-sm font-bold">Danh sách câu</p><div className="grid grid-cols-5 gap-2">{questions.map((item, index) => { const done = answers[item.id] !== undefined; const marked = flagged.includes(item.id); return <button aria-label={`Mở câu ${index + 1}`} key={item.id} onClick={() => setQuestionIndex(index)} className={`relative aspect-square rounded-xl text-sm font-bold transition ${questionIndex === index && !submitted ? 'ring-2 ring-sky-700 ring-offset-2' : ''} ${marked ? 'bg-indigo-400 text-white' : done ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-sky-100'}`}>{index + 1}</button>})}</div><div className="mt-4 grid gap-2 text-xs text-slate-600"><span><i className="mr-2 inline-block h-3 w-3 rounded-full bg-sky-500"/>Câu đã làm</span><span><i className="mr-2 inline-block h-3 w-3 rounded-full bg-slate-200"/>Câu chưa làm</span><span><i className="mr-2 inline-block h-3 w-3 rounded-full bg-indigo-400"/>Đã đánh dấu để xem lại</span></div></div>
          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Sparkles className="size-5 text-amber-600"/><strong className="text-amber-950">Từ vựng của Vịt</strong></div><button onClick={() => setVocabulary(randomVocabulary(grade))} className="rounded-full p-2 text-amber-700 transition hover:bg-amber-100" aria-label="Đổi ba từ vựng"><RefreshCw className="size-4"/></button></div><div className="mt-3 grid gap-3">{vocabulary.map((item) => <div key={item.word} className="rounded-2xl bg-white p-3 shadow-sm"><strong className="text-sky-800">{item.word}</strong><span className="ml-2 text-sm text-amber-800">{item.meaning}</span><p className="mt-1 text-sm leading-5 text-slate-600">{item.example}</p></div>)}</div></div>
        </aside>
      </div>
      {dictionary && <div role="dialog" aria-live="polite" onClick={(event) => event.stopPropagation()} className="fixed z-50 w-72 rounded-2xl border border-sky-200 bg-white p-4 shadow-2xl" style={{ left: Math.max(12, dictionary.x), top: Math.max(12, dictionary.y) }}><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2 text-sky-800"><Languages className="size-5"/><strong>Từ điển Anh–Việt</strong></div><button onClick={() => setDictionary(null)} className="rounded-full p-1 text-slate-400 hover:bg-slate-100" aria-label="Đóng từ điển"><X className="size-4"/></button></div>{dictionary.word && <p className="mt-3 break-words text-base font-bold text-slate-900">{dictionary.word}</p>}<p className={`mt-1 break-words text-sm leading-6 ${dictionary.status === 'error' ? 'text-rose-700' : 'text-slate-700'}`}>{dictionary.translation}</p>{dictionary.status === 'ready' && <p className="mt-2 text-[11px] text-slate-400">Bản dịch tự động · MyMemory</p>}</div>}
    </main>
  );
}

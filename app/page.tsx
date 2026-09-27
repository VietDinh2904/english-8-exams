'use client';

import { useCallback, useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, Clock3, Flag, Languages, Menu, RefreshCw, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { exams as baseExams8, type Exam, type Question } from '@/lib/exams';
import { additionalExams8 } from '@/lib/exams8-content';
import { exams9 } from '@/lib/exams9';
import { exams10 } from '@/lib/exams10';
import { vocabularyByGrade, type VocabularyItem } from '@/lib/vocabulary';
import { distributeAnswers, distributeExams } from '@/lib/answer-distribution';
import { GrammarLesson } from '@/components/grammar-lesson';
import { grammarLessons8 } from '@/lib/grammar-lessons8';
import { grammarLessons9 } from '@/lib/grammar-lessons9';
import { grammarLessons10 } from '@/lib/grammar-lessons10';
import { enrichUnitExam } from '@/lib/unit-enrichment';
import { ExerciseQuestion } from '@/components/exercise-question';
import { correctAnswer, formatAnswer, isAnswerComplete, isQuestionCorrect, questionKey, type AnswerValue } from '@/lib/question-utils';
import { semester2Exams, upgradeEnglish10MidtermSix } from '@/lib/semester2-exams';

type Answers = Record<number, AnswerValue>;
type ExamMode = 'practice' | 'test';
type GradeLevel = 8 | 9 | 10;
type MenuGroup = NonNullable<Exam['menuGroup']>;
type ModelContext = { registerTool: (tool: Record<string, unknown>, options?: { signal: AbortSignal }) => void | Promise<void> };
type DictionaryState = { word: string; translation: string; status: 'loading' | 'ready' | 'error' | 'empty'; x: number; y: number };
const exams8 = distributeExams([...baseExams8, ...additionalExams8, ...semester2Exams[8]].map((exam) => enrichUnitExam(exam, 8)));
const balancedExams9 = distributeExams([...exams9, ...semester2Exams[9]].map((exam) => enrichUnitExam(exam, 9)));
const balancedExams10 = distributeExams(upgradeEnglish10MidtermSix([...exams10, ...semester2Exams[10]]).map((exam) => enrichUnitExam(exam, 10)));

function buildTestQuestions(examQuestions: Question[], allExams: Exam[], examIndex: number) {
  const chosen: Question[] = [];
  const seen = new Set<string>();
  for (const item of examQuestions) {
    const key = questionKey(item);
    if (!seen.has(key)) { chosen.push(item); seen.add(key); }
  }
  const orderedExams = [...allExams.slice(examIndex + 1), ...allExams.slice(0, examIndex + 1)];
  const includeUnitEnrichment = allExams[examIndex].menuGroup === 'unit';
  for (const item of orderedExams.flatMap((entry) => entry.questions).filter((entry) => entry.section === 'Language Focus' && (includeUnitEnrichment || entry.origin !== 'unit-enrichment'))) {
    const key = questionKey(item);
    if (!seen.has(key)) {
      chosen.push(item);
      seen.add(key);
    }
    if (chosen.length === 40) break;
  }
  return distributeAnswers(chosen.slice(0, 40).map((item, index) => ({ ...item, id: index + 1 })), `test|${examIndex}`);
}

function randomVocabulary(grade: GradeLevel): VocabularyItem[] {
  return [...vocabularyByGrade[grade]].sort(() => Math.random() - 0.5).slice(0, 3);
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export default function Home() {
  const [grade, setGrade] = useState<GradeLevel>(8);
  const [mode, setMode] = useState<ExamMode>('practice');
  const [examIndex, setExamIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [drafts, setDrafts] = useState<Answers>({});
  const [lockedQuestion, setLockedQuestion] = useState<number | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [flagged, setFlagged] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(60 * 60);
  const [submitted, setSubmitted] = useState(false);
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [dictionary, setDictionary] = useState<DictionaryState | null>(null);
  const availableExams = grade === 8 ? exams8 : grade === 9 ? balancedExams9 : balancedExams10;
  const exam = availableExams[examIndex];
  const unitLesson = exam.menuGroup === 'unit'
    ? grade === 8 ? grammarLessons8[exam.id - 6] : grade === 9 ? grammarLessons9[exam.id - 100] : grammarLessons10[exam.id]
    : undefined;
  const questions = useMemo(() => mode === 'test' ? buildTestQuestions(exam.questions, availableExams, examIndex) : exam.questions, [availableExams, exam, examIndex, mode]);
  const question = questions[questionIndex];
  const selected = drafts[question.id] ?? answers[question.id];
  const isAnswered = answers[question.id] !== undefined;
  const firstUnansweredIndex = questions.findIndex((item) => answers[item.id] === undefined);

  const score = useMemo(() => questions.filter((item) => isQuestionCorrect(item, answers[item.id])).length, [answers, questions]);
  const answeredCount = questions.filter((item) => isAnswerComplete(item, answers[item.id])).length;
  const canSubmit = answeredCount === questions.length;

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
    setDrafts({});
    setLockedQuestion(null);
    setHintOpen(false);
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
    setDrafts({});
    setLockedQuestion(null);
    setHintOpen(false);
    setFlagged([]);
    setSubmitted(false);
    setSecondsLeft(60 * 60);
    setDictionary(null);
  };

  const switchMode = (nextMode: ExamMode) => {
    setMode(nextMode);
    setQuestionIndex(0);
    setAnswers({});
    setDrafts({});
    setLockedQuestion(null);
    setHintOpen(false);
    setFlagged([]);
    setSubmitted(false);
    setSecondsLeft(60 * 60);
    setDictionary(null);
  };

  const chooseAnswer = useCallback((value: AnswerValue) => {
    const currentQuestion = questions[questionIndex];
    if (lockedQuestion === currentQuestion.id || (mode === 'practice' && answers[currentQuestion.id] !== undefined)) return;
    if (mode === 'test') {
      setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
      setDrafts((current) => ({ ...current, [currentQuestion.id]: value }));
      return;
    }
    setDrafts((current) => ({ ...current, [currentQuestion.id]: value }));
    if (typeof value !== 'number') return;
    if (isQuestionCorrect(currentQuestion, value)) {
      setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
    } else {
      setLockedQuestion(currentQuestion.id);
      setHintOpen(true);
    }
  }, [answers, lockedQuestion, mode, questionIndex, questions]);

  const checkTypedAnswer = useCallback(() => {
    const currentQuestion = questions[questionIndex];
    const value = drafts[currentQuestion.id];
    if (!isAnswerComplete(currentQuestion, value)) return;
    if (mode === 'test' || isQuestionCorrect(currentQuestion, value)) {
      setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
    } else {
      setLockedQuestion(currentQuestion.id);
      setHintOpen(true);
    }
  }, [drafts, mode, questionIndex, questions]);

  const retryAfterHint = () => {
    if (lockedQuestion === null) return;
    setDrafts((current) => { const next = { ...current }; delete next[lockedQuestion]; return next; });
    setLockedQuestion(null);
    setHintOpen(false);
  };

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
        description: 'Chọn đáp án theo số thứ tự cho câu trắc nghiệm đang hiển thị.',
        inputSchema: { type: 'object', properties: { optionNumber: { type: 'integer', minimum: 1, maximum: 4 } }, required: ['optionNumber'], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input: unknown) {
          if (question.kind === 'typed' || question.kind === 'cloze-dropdown' || typeof question.answer !== 'number') throw new Error('Câu này cần nhập trực tiếp trên biểu mẫu.');
          const value = (input as { optionNumber?: number }).optionNumber;
          if (!Number.isInteger(value) || !value || value < 1 || value > question.options.length) throw new Error(`optionNumber must be from 1 to ${question.options.length}`);
          chooseAnswer(value - 1);
          return mode === 'practice'
            ? { question: question.id, correct: value - 1 === question.answer, status: value - 1 === question.answer ? 'completed' : 'retry' }
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

  const menuGroups: [MenuGroup, string][] = [
    ['unit', 'Học theo Unit'],
    ['review', 'Ôn tập'],
    ...(grade === 9 ? [['survey', 'Khảo sát đầu năm'] as [MenuGroup, string]] : []),
    ['midterm', 'Đề giữa kỳ I'],
    ['final', 'Đề cuối kỳ I'],
    ['midterm2', 'Đề giữa kỳ II'],
    ['final2', 'Đề cuối kỳ II'],
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
            <div><strong className="block text-lg leading-tight">English MOET</strong><span className="hidden text-sm text-slate-500 sm:block">English {grade} · Học chắc, luyện đúng dạng</span></div>
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
            <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold shadow-sm">Câu {questionIndex + 1} / {questions.length}</span>
          </div>
          <div className="mb-3 grid gap-2 text-sm sm:grid-cols-2">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-950"><strong>Luyện tập:</strong> mỗi lần một câu, không giới hạn thời gian. Nếu sai, câu bị khóa và hiện gợi ý; bấm “Đã hiểu” để xóa câu trả lời và làm lại từ đầu. Bôi đen tiếng Anh rồi nhấp chuột phải để dịch.</div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700"><strong>Làm bài test:</strong> mỗi lần một câu; 40 câu trong 60 phút. Làm đủ và nộp bài mới xem đáp án, lời giải.</div>
          </div>
          <div className="mb-5 grid grid-cols-2 rounded-2xl border border-sky-100 bg-white p-1.5 shadow-sm">
            <button onClick={() => switchMode('practice')} className={`rounded-xl px-3 py-2.5 text-sm font-bold transition ${mode === 'practice' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-sky-50'}`}>Luyện tập</button>
            <button onClick={() => switchMode('test')} className={`rounded-xl px-3 py-2.5 text-sm font-bold transition ${mode === 'test' ? 'bg-[#123c5a] text-white shadow-sm' : 'text-slate-600 hover:bg-sky-50'}`}>Làm bài test</button>
          </div>
          {exam.sourceNote && <p className="mb-5 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-900"><strong>Nguồn ôn tập:</strong> {exam.sourceNote}</p>}
          {unitLesson && (mode === 'practice' || submitted) && <GrammarLesson key={`${grade}-${exam.id}`} grade={grade} lesson={unitLesson} />}
          {exam.reviewNotes && !unitLesson && <details className="mb-5 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/70" open>
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
                    const correct = isQuestionCorrect(item, chosen);
                    return <details key={item.id} className={`rounded-2xl border ${correct ? 'border-emerald-200 bg-emerald-50/60' : 'border-rose-200 bg-rose-50/60'}`}>
                      <summary className="cursor-pointer list-none p-4 font-semibold"><span className={`mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm text-white ${correct ? 'bg-emerald-500' : 'bg-rose-500'}`}>{correct ? '✓' : '×'}</span>Câu {index + 1}: {item.prompt}</summary>
                      <div className="border-t border-current/10 px-4 pb-4 pt-3 text-sm leading-6">
                        <p>Bạn trả lời: <strong>{formatAnswer(item, chosen)}</strong></p>
                        <p>Đáp án đúng: <strong>{correctAnswer(item)}</strong></p>
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
              {question.section === 'Reading' && exam.passage && <div className="mb-6 max-h-52 overflow-y-auto rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-[15px] leading-7 text-slate-700"><strong className="mb-2 block text-amber-900">{exam.passageTitle}</strong>{exam.passage}</div>}
              <ExerciseQuestion
                question={question}
                questionNumber={questionIndex + 1}
                value={selected}
                disabled={lockedQuestion === question.id || (mode === 'practice' && answers[question.id] !== undefined)}
                practiceCorrect={mode === 'practice' && isQuestionCorrect(question, answers[question.id])}
                showCheck={mode === 'practice'}
                onChange={chooseAnswer}
                onCheck={checkTypedAnswer}
              />
              {mode === 'practice' && answers[question.id] !== undefined && <div aria-live="polite" className="mt-5 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-900"><div className="bg-emerald-100 px-4 py-2 text-sm font-bold uppercase tracking-wide">Hướng dẫn giải chi tiết</div><div className="p-4"><strong>Chính xác! Đáp án: {correctAnswer(question)}</strong><p className="mt-2 text-[15px] leading-7">{question.explanation}</p></div></div>}
              <div className="mt-6 flex items-center justify-between gap-3"><Button variant="outline" disabled={questionIndex === 0} onClick={() => setQuestionIndex((value) => value - 1)} className="rounded-xl"><ChevronLeft/> Câu trước</Button>{questionIndex === questions.length - 1 ? <Button disabled={!canSubmit} onClick={() => setSubmitted(true)} className="rounded-xl bg-[#123c5a] px-5 hover:bg-[#0e3048]">{mode === 'test' ? 'Nộp bài' : 'Xem tổng kết'}</Button> : <Button disabled={mode === 'practice' && !isAnswered} onClick={() => setQuestionIndex((value) => value + 1)} className="rounded-xl bg-sky-600 px-5 hover:bg-sky-700">Câu tiếp <ChevronRight/></Button>}</div>
            </article>
          )}
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {mode === 'test' ? <div className="rounded-3xl bg-[#123c5a] p-5 text-white shadow-lg shadow-sky-100"><div className="mb-3 flex items-center justify-between"><span className="text-sm text-sky-100">Thời gian còn lại</span><Clock3 className="size-5 text-amber-300"/></div><strong suppressHydrationWarning className="font-mono text-3xl tracking-tight">{formatTime(secondsLeft)}</strong><div className="mt-4 flex justify-between border-t border-white/15 pt-3 text-sm"><span>Đã làm</span><b>{answeredCount}/{questions.length}</b></div><Button disabled={!canSubmit} onClick={() => setSubmitted(true)} className="mt-4 w-full bg-amber-500 font-bold text-white hover:bg-amber-600">NỘP BÀI</Button>{answeredCount < questions.length && <p className="mt-2 text-center text-xs leading-5 text-sky-100">Làm đủ {questions.length} câu để mở nút nộp bài.</p>}</div> : <div className="rounded-3xl bg-sky-600 p-5 text-white shadow-lg shadow-sky-100"><div className="flex items-center justify-between"><span className="font-bold">Luyện tập tự do</span><BookOpen className="size-5 text-amber-200"/></div><p className="mt-2 text-sm leading-6 text-sky-50">Không giới hạn thời gian. Nếu sai, đọc gợi ý rồi bấm “Đã hiểu” để xóa đáp án và làm lại từ đầu.</p><div className="mt-4 flex justify-between border-t border-white/20 pt-3 text-sm"><span>Đã luyện</span><b>{answeredCount}/{questions.length}</b></div>{canSubmit && <Button onClick={() => setSubmitted(true)} className="mt-4 w-full bg-white font-bold text-sky-700 hover:bg-sky-50">XEM TỔNG KẾT</Button>}</div>}
          <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm"><p className="mb-3 text-sm font-bold">Danh sách câu</p><div className="grid grid-cols-5 gap-2">{questions.map((item, index) => { const done = isAnswerComplete(item, answers[item.id]); const marked = flagged.includes(item.id); const locked = mode === 'practice' && firstUnansweredIndex !== -1 && index > firstUnansweredIndex; return <button aria-label={`Mở câu ${index + 1}`} key={item.id} disabled={locked} onClick={() => setQuestionIndex(index)} className={`relative aspect-square rounded-xl text-sm font-bold transition ${questionIndex === index && !submitted ? 'ring-2 ring-sky-700 ring-offset-2' : ''} ${locked ? 'cursor-not-allowed bg-slate-50 text-slate-300' : marked ? 'bg-indigo-400 text-white' : done ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-sky-100'}`}>{index + 1}</button>})}</div><div className="mt-4 grid gap-2 text-xs text-slate-600"><span><i className="mr-2 inline-block h-3 w-3 rounded-full bg-sky-500"/>Câu đã làm</span><span><i className="mr-2 inline-block h-3 w-3 rounded-full bg-slate-200"/>Câu chưa làm</span><span><i className="mr-2 inline-block h-3 w-3 rounded-full bg-indigo-400"/>Đã đánh dấu để xem lại</span></div></div>
          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Sparkles className="size-5 text-amber-600"/><strong className="text-amber-950">Từ vựng của Vịt</strong></div><button onClick={() => setVocabulary(randomVocabulary(grade))} className="rounded-full p-2 text-amber-700 transition hover:bg-amber-100" aria-label="Đổi ba từ vựng"><RefreshCw className="size-4"/></button></div><div className="mt-3 grid gap-3">{vocabulary.map((item) => <div key={item.word} className="rounded-2xl bg-white p-3 shadow-sm"><strong className="text-sky-800">{item.word}</strong><span className="ml-2 text-sm text-amber-800">{item.meaning}</span><p className="mt-1 text-sm leading-5 text-slate-600">{item.example}</p></div>)}</div></div>
        </aside>
      </div>
      {hintOpen && lockedQuestion === question.id && <dialog open className="fixed inset-0 z-[70] m-0 grid h-screen w-screen max-w-none place-items-center bg-slate-950/45 p-4" aria-labelledby="hint-title"><div className="w-full max-w-lg rounded-[28px] border border-amber-200 bg-white p-6 shadow-2xl"><div className="flex items-center gap-3"><img src="duck-learn.png" alt="Mascot vịt đưa gợi ý" className="h-16 w-16 rounded-2xl object-cover"/><div><p className="text-sm font-bold uppercase tracking-wider text-amber-700">Hint</p><h2 id="hint-title" className="text-xl font-extrabold text-slate-900">Chưa đúng — xem gợi ý nhé</h2></div></div><p className="mt-4 rounded-2xl bg-amber-50 p-4 leading-7 text-slate-700">{question.hint ?? 'Read the instruction carefully. Check the tense marker, word form, sentence structure, or the exact evidence in the passage before trying again.'}</p><p className="mt-3 text-sm text-slate-500">Đáp án chưa được tiết lộ. Khi bấm nút dưới đây, câu trả lời vừa nhập sẽ bị xóa để em làm lại từ đầu.</p><Button onClick={retryAfterHint} autoFocus className="mt-5 w-full rounded-xl bg-amber-500 font-bold text-white hover:bg-amber-600">Đã hiểu · Làm lại</Button></div></dialog>}
      {dictionary && <div role="dialog" aria-live="polite" onClick={(event) => event.stopPropagation()} className="fixed z-50 w-72 rounded-2xl border border-sky-200 bg-white p-4 shadow-2xl" style={{ left: Math.max(12, dictionary.x), top: Math.max(12, dictionary.y) }}><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2 text-sky-800"><Languages className="size-5"/><strong>Từ điển Anh–Việt</strong></div><button onClick={() => setDictionary(null)} className="rounded-full p-1 text-slate-400 hover:bg-slate-100" aria-label="Đóng từ điển"><X className="size-4"/></button></div>{dictionary.word && <p className="mt-3 break-words text-base font-bold text-slate-900">{dictionary.word}</p>}<p className={`mt-1 break-words text-sm leading-6 ${dictionary.status === 'error' ? 'text-rose-700' : 'text-slate-700'}`}>{dictionary.translation}</p>{dictionary.status === 'ready' && <p className="mt-2 text-[11px] text-slate-400">Bản dịch tự động · MyMemory</p>}</div>}
    </main>
  );
}

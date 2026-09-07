'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookOpen, Check, ChevronLeft, ChevronRight, Clock3, Flag, Menu, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { exams } from '@/lib/exams';

type Answers = Record<number, number>;
type ModelContext = { registerTool: (tool: Record<string, unknown>, options?: { signal: AbortSignal }) => void | Promise<void> };

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export default function Home() {
  const [examIndex, setExamIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(60 * 60);
  const [submitted, setSubmitted] = useState(false);
  const exam = exams[examIndex];
  const question = exam.questions[questionIndex];
  const selected = answers[question.id];
  const isAnswered = selected !== undefined;
  const isCorrect = selected === question.answer;

  const score = useMemo(() => exam.questions.filter((item) => answers[item.id] === item.answer).length, [answers, exam]);
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    if (submitted || secondsLeft <= 0) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [secondsLeft, submitted]);

  const selectExam = useCallback((index: number) => {
    setExamIndex(index);
    setQuestionIndex(0);
    setAnswers({});
    setFlagged([]);
    setSubmitted(false);
    setSecondsLeft(60 * 60);
  }, []);

  const chooseAnswer = useCallback((value: number) => {
    setAnswers((current) => ({ ...current, [exam.questions[questionIndex].id]: value }));
  }, [exam.questions, questionIndex]);

  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const report = () => undefined;
    try {
      void Promise.resolve(context.registerTool({
        name: 'select_exam',
        title: 'Chọn đề luyện tập',
        description: 'Mở một trong sáu đề giữa kỳ Tiếng Anh 8 và đặt lại lượt làm bài.',
        inputSchema: { type: 'object', properties: { examNumber: { type: 'integer', minimum: 1, maximum: 6 } }, required: ['examNumber'], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input: unknown) {
          const value = (input as { examNumber?: number }).examNumber;
          if (!Number.isInteger(value) || !value || value < 1 || value > 6) throw new Error('examNumber must be an integer from 1 to 6');
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
          return { question: question.id, correct: value - 1 === question.answer, correctOptionNumber: question.answer + 1 };
        },
      }, { signal: lifecycle.signal })).catch(report);
    } catch { report(); }
    return () => lifecycle.abort();
  }, [chooseAnswer, question, selectExam]);

  const resetExam = () => selectExam(examIndex);
  const toggleFlag = () => setFlagged((items) => items.includes(question.id) ? items.filter((id) => id !== question.id) : [...items, question.id]);

  const examMenu = (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-sky-700">Bộ đề giữa kỳ</p>
      <nav className="grid gap-2">
        {exams.map((item, index) => (
          <button key={item.id} onClick={() => selectExam(index)} className={`group rounded-2xl px-3 py-3 text-left transition ${index === examIndex ? 'bg-sky-600 text-white shadow-md shadow-sky-100' : 'bg-sky-50 text-[#15324a] hover:bg-sky-100'}`}>
            <span className="block font-bold">Đề số {item.id}</span><span className={`mt-0.5 block text-xs ${index === examIndex ? 'text-sky-100' : 'text-slate-500'}`}>{item.theme}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f7fbff] text-[#15324a]">
      <header className="sticky top-0 z-30 border-b border-sky-100 bg-white/92 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/duck-learn.png" alt="Mascot vịt vàng đang học" className="h-12 w-12 object-contain" />
            <div><strong className="block text-lg leading-tight">Vịt Nhỏ English 8</strong><span className="hidden text-sm text-slate-500 sm:block">Ôn giữa kỳ thật nhẹ nhàng</span></div>
          </div>
          <span className="hidden rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800 md:inline">Global Success · Unit 1–3</span>
          <Sheet><SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Mở danh sách đề" />}><Menu /></SheetTrigger><SheetContent side="left"><SheetTitle className="mb-5">Chọn đề</SheetTitle>{examMenu}</SheetContent></Sheet>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[210px_minmax(0,1fr)_250px]">
        <aside className="hidden self-start rounded-3xl border border-sky-100 bg-white p-4 shadow-sm lg:block">{examMenu}</aside>

        <section className="min-w-0">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-sky-700"><BookOpen className="size-4"/> {question.section}</p><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{exam.title}</h1></div>
            <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold shadow-sm">Câu {questionIndex + 1} / {exam.questions.length}</span>
          </div>
          <Progress value={(answeredCount / exam.questions.length) * 100} className="mb-5 h-2.5" />

          {submitted ? (
            <article className="overflow-hidden rounded-[28px] border border-sky-100 bg-white text-center shadow-[0_16px_50px_rgba(24,95,140,.08)]">
              <div className="bg-sky-600 px-6 py-8 text-white"><img src="/duck-learn.png" alt="Vịt nhỏ chúc mừng" className="mx-auto h-32 w-32 object-contain drop-shadow-lg"/><p className="mt-2 text-sm font-bold uppercase tracking-[.18em] text-sky-100">Đã hoàn thành đề {exam.id}</p><h2 className="mt-2 text-4xl font-extrabold">{score}/{exam.questions.length} câu đúng</h2></div>
              <div className="p-7"><p className="text-lg text-slate-600">{score >= 8 ? 'Xuất sắc! Vịt Nhỏ thấy bạn đã nắm bài rất chắc.' : score >= 6 ? 'Làm tốt lắm! Xem lại vài câu sai là bạn sẽ tiến bộ nhanh.' : 'Mình cùng xem lại đáp án rồi thử lần nữa nhé.'}</p><Button onClick={resetExam} size="lg" className="mt-6 rounded-xl bg-sky-600"><RotateCcw /> Làm lại đề</Button></div>
            </article>
          ) : (
            <article className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_16px_50px_rgba(24,95,140,.08)] sm:p-8">
              <div className="mb-5 flex items-center justify-between gap-3"><span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">{question.section === 'Reading' ? `Bài đọc · ${exam.passageTitle}` : 'Ngữ âm · Từ vựng · Ngữ pháp'}</span><button onClick={toggleFlag} className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${flagged.includes(question.id) ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:bg-slate-50'}`}><Flag className="size-4" fill={flagged.includes(question.id) ? 'currentColor' : 'none'}/> {flagged.includes(question.id) ? 'Đã đánh dấu' : 'Đánh dấu'}</button></div>
              {question.section === 'Reading' && <div className="mb-6 max-h-52 overflow-y-auto rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-[15px] leading-7 text-slate-700"><strong className="mb-2 block text-amber-900">{exam.passageTitle}</strong>{exam.passage}</div>}
              <p className="mb-5 text-lg font-semibold leading-relaxed">{question.prompt}</p>
              <RadioGroup value={isAnswered ? String(selected) : ''} onValueChange={(value) => chooseAnswer(Number(value))} className="grid gap-3">
                {question.options.map((option, index) => {
                  const chosen = selected === index;
                  const correct = isAnswered && index === question.answer;
                  const wrong = chosen && !isCorrect;
                  return <label key={option} className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${correct ? 'border-emerald-400 bg-emerald-50' : wrong ? 'border-rose-400 bg-rose-50' : chosen ? 'border-sky-500 bg-sky-50' : 'border-slate-200 hover:border-sky-300 hover:bg-sky-50/40'}`}><RadioGroupItem value={String(index)} className="mt-0.5"/><span className="flex-1 text-base font-medium"><b className="mr-2">{String.fromCharCode(65 + index)}.</b>{option}</span>{correct && <Check className="size-5 text-emerald-600"/>}{wrong && <X className="size-5 text-rose-600"/>}</label>;
                })}
              </RadioGroup>
              {isAnswered && <div aria-live="polite" className={`mt-5 rounded-2xl border p-4 ${isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-rose-200 bg-rose-50 text-rose-900'}`}><strong>{isCorrect ? 'Chính xác!' : `Chưa đúng. Đáp án: ${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`}</strong><p className="mt-1 text-sm leading-relaxed opacity-85">{question.explanation}</p></div>}
              <div className="mt-6 flex items-center justify-between gap-3"><Button variant="outline" disabled={questionIndex === 0} onClick={() => setQuestionIndex((value) => value - 1)} className="rounded-xl"><ChevronLeft/> Câu trước</Button>{questionIndex === exam.questions.length - 1 ? <Button disabled={!answeredCount} onClick={() => setSubmitted(true)} className="rounded-xl bg-[#123c5a] px-5 hover:bg-[#0e3048]">Nộp bài</Button> : <Button onClick={() => setQuestionIndex((value) => value + 1)} className="rounded-xl bg-sky-600 px-5 hover:bg-sky-700">Câu tiếp <ChevronRight/></Button>}</div>
            </article>
          )}
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-[#123c5a] p-5 text-white shadow-lg shadow-sky-100"><div className="mb-3 flex items-center justify-between"><span className="text-sm text-sky-100">Thời gian còn lại</span><Clock3 className="size-5 text-amber-300"/></div><strong suppressHydrationWarning className="font-mono text-3xl tracking-tight">{formatTime(secondsLeft)}</strong><div className="mt-4 flex justify-between border-t border-white/15 pt-3 text-sm"><span>Đã làm</span><b>{answeredCount}/{exam.questions.length}</b></div></div>
          <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm"><p className="mb-3 text-sm font-bold">Danh sách câu</p><div className="grid grid-cols-5 gap-2">{exam.questions.map((item, index) => { const done = answers[item.id] !== undefined; const correct = answers[item.id] === item.answer; return <button aria-label={`Mở câu ${index + 1}`} key={item.id} onClick={() => { setQuestionIndex(index); setSubmitted(false); }} className={`relative aspect-square rounded-xl text-sm font-bold transition ${questionIndex === index && !submitted ? 'ring-2 ring-sky-600 ring-offset-2' : ''} ${done ? correct ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600 hover:bg-sky-100'}`}>{index + 1}{flagged.includes(item.id) && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-amber-400"/>}</button>})}</div><div className="mt-4 grid gap-2 text-xs text-slate-500"><span><i className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-300"/>Đúng</span><span><i className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-rose-300"/>Cần xem lại</span></div></div>
          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5"><Sparkles className="mb-2 size-5 text-amber-600"/><strong className="block text-amber-900">Mẹo của Vịt</strong><p className="mt-1 text-sm leading-relaxed text-amber-800">Sai cũng không sao — đọc lời giải ngay dưới câu hỏi rồi thử nhớ quy tắc nhé.</p></div>
        </aside>
      </div>
    </main>
  );
}

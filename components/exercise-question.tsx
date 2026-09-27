'use client';

import type { Question } from '@/lib/exams';
import type { AnswerValue } from '@/lib/question-utils';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function UnderlinedOption({ text, target }: { text: string; target?: string }) {
  if (!target) return <>{text}</>;
  const start = text.toLowerCase().indexOf(target.toLowerCase());
  if (start < 0) return <>{text}</>;
  return <>{text.slice(0, start)}<u className="decoration-2 underline-offset-4">{text.slice(start, start + target.length)}</u>{text.slice(start + target.length)}</>;
}

function InlineTemplate({ question, values, disabled, onChange }: { question: Question; values: string[]; disabled: boolean; onChange: (values: string[]) => void }) {
  const parts = (question.template ?? question.prompt).split(/(\[\[\d+\]\])/g);
  const longAnswer = question.kind === 'typed' && (Array.isArray(question.answer) ? question.answer : [question.answer]).some((answer) => String(answer).length > 24);
  return <div className="whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-50 p-5 text-[17px] leading-10 text-slate-800">
    {parts.map((part, partIndex) => {
      const match = part.match(/^\[\[(\d+)\]\]$/);
      if (!match) return <span key={partIndex}>{part}</span>;
      const gapIndex = Number(match[1]);
      if (question.kind === 'cloze-dropdown') {
        return <select key={partIndex} disabled={disabled} value={values[gapIndex] ?? ''} onChange={(event) => { const next = [...values]; next[gapIndex] = event.target.value; onChange(next); }} className="mx-1 inline-block min-w-32 rounded-lg border-2 border-sky-200 bg-white px-2 py-1 font-semibold text-sky-900 focus:border-sky-500 focus:outline-none">
          <option value="">Choose…</option>
          {(question.gapOptions?.[gapIndex] ?? []).map((option) => <option key={option} value={option}>{option}</option>)}
        </select>;
      }
      return <input key={partIndex} disabled={disabled} value={values[gapIndex] ?? ''} onChange={(event) => { const next = [...values]; next[gapIndex] = event.target.value; onChange(next); }} autoComplete="off" spellCheck={false} aria-label={`Blank ${gapIndex + 1}`} className={`${longAnswer ? 'my-2 block w-full' : 'mx-1 inline-block w-44'} rounded-lg border-0 border-b-2 border-sky-400 bg-white px-3 py-1 font-semibold text-sky-950 outline-none focus:border-sky-700 disabled:bg-slate-100`} />;
    })}
  </div>;
}

export function ExerciseQuestion({ question, questionNumber, value, disabled, practiceCorrect, showCheck, onChange, onCheck }: { question: Question; questionNumber: number; value: AnswerValue | undefined; disabled: boolean; practiceCorrect: boolean; showCheck: boolean; onChange: (value: AnswerValue) => void; onCheck: () => void }) {
  const isTrueFalse = question.options.length === 2 && question.options[0] === 'True' && question.options[1] === 'False' && question.kind !== 'typed';
  if (question.kind === 'typed' || question.kind === 'cloze-dropdown') {
    const values = Array.isArray(value) ? value : value === undefined ? [] : [String(value)];
    return <div className="space-y-5">
      {question.template && <p className="text-lg font-semibold leading-relaxed">{question.prompt}</p>}
      {question.givenWord && <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3"><span className="text-sm font-bold uppercase tracking-wide text-amber-700">Given word</span><strong className="mt-1 block text-xl tracking-wide text-amber-950">{question.givenWord}</strong></div>}
      <InlineTemplate question={question} values={values} disabled={disabled} onChange={onChange} />
      {showCheck && !practiceCorrect && <Button type="button" onClick={onCheck} disabled={disabled || !Array.from({ length: Array.isArray(question.answer) ? question.answer.length : 1 }, (_, index) => values[index] ?? '').every((item) => item.trim())} className="rounded-xl bg-sky-600">Kiểm tra câu trả lời</Button>}
    </div>;
  }
  if (isTrueFalse) {
    return <div className="overflow-hidden rounded-2xl border border-slate-200"><Table><TableHeader><TableRow className="bg-[#123c5a] hover:bg-[#123c5a]"><TableHead className="w-full min-w-64 text-white">Statement</TableHead><TableHead className="w-24 text-center text-white">True</TableHead><TableHead className="w-24 text-center text-white">False</TableHead></TableRow></TableHeader><TableBody><TableRow className={practiceCorrect ? 'bg-emerald-50/60' : ''}><TableCell className="whitespace-normal py-4 align-top text-base font-medium"><span className="mr-2 font-bold">{questionNumber}.</span>{question.prompt}</TableCell>{[0, 1].map((option) => <TableCell key={option} className="text-center align-top"><button type="button" onClick={() => onChange(option)} disabled={disabled} aria-pressed={value === option} className={`mx-auto grid h-10 w-10 place-items-center rounded-full border-2 transition ${value === option ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300 bg-white hover:border-sky-500'}`}>{value === option && <Check className="size-5"/>}</button></TableCell>)}</TableRow></TableBody></Table></div>;
  }
  return <><p className="mb-5 text-lg font-semibold leading-relaxed">{question.prompt}</p><RadioGroup value={typeof value === 'number' ? String(value) : ''} onValueChange={(next) => onChange(Number(next))} className="grid gap-3">{question.options.map((option, index) => <label key={`${index}-${option}`} className={`flex items-start gap-3 rounded-2xl border p-4 transition ${practiceCorrect && index === question.answer ? 'border-emerald-400 bg-emerald-50' : value === index ? 'border-sky-500 bg-sky-50' : disabled ? 'border-slate-200 bg-slate-50' : 'cursor-pointer border-slate-200 hover:border-sky-300 hover:bg-sky-50/40'}`}><RadioGroupItem value={String(index)} disabled={disabled} className="mt-0.5"/><span className="flex-1 text-base font-medium"><b className="mr-2">{String.fromCharCode(65 + index)}.</b><UnderlinedOption text={option} target={question.underlines?.[index]} /></span>{practiceCorrect && index === question.answer && <Check className="size-5 text-emerald-600"/>}</label>)}</RadioGroup></>;
}

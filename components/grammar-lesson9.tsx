'use client';

import { useState } from 'react';
import { grammarLessons9 } from '@/lib/grammar-lessons9';

export function GrammarLesson9({ unit }: { unit: number }) {
  const lesson = grammarLessons9[unit];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  if (!lesson) return null;

  const answered = Object.keys(answers).length;
  const correct = lesson.exercises.filter((question) => answers[question.id] === question.answer).length;

  return <details className="mb-5 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/70" open>
    <summary className="cursor-pointer px-5 py-4 text-base font-bold text-amber-950">Bài học ngữ pháp · Unit {unit}</summary>
    <div className="space-y-4 border-t border-amber-200 p-4 sm:p-5">
      {lesson.topics.map((topic) => <section key={topic.title} className="rounded-2xl border border-sky-100 bg-white p-4 sm:p-5">
        <h2 className="text-lg font-bold text-sky-900">{topic.title}</h2>
        <div className="mt-4 grid gap-4 text-base leading-7 text-slate-700">
          <div><h3 className="font-bold text-sky-800">Ý nghĩa</h3><p>{topic.meaning}</p></div>
          <div><h3 className="font-bold text-sky-800">Cấu trúc (Form)</h3><ul className="mt-1 list-inside list-disc space-y-1">{topic.structure.map((line) => <li key={line} className="break-words">{line}</li>)}</ul></div>
          <div><h3 className="font-bold text-sky-800">Cách dùng (Use)</h3><p>{topic.use}</p></div>
          <div><h3 className="font-bold text-sky-800">Ví dụ (Examples)</h3><div className="mt-1 grid gap-2">{topic.examples.map((example) => <div key={example.english} className="rounded-xl bg-sky-50 p-3"><p className="font-semibold text-sky-950">{example.english}</p><p>{example.vietnamese}</p></div>)}</div></div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3"><h3 className="font-bold text-amber-900">Lỗi dễ gặp</h3><p>{topic.note}</p></div>
        </div>
      </section>)}

      <details className="overflow-hidden rounded-2xl border border-sky-200 bg-white">
        <summary className="cursor-pointer px-4 py-4 text-base font-bold text-sky-900">Thử nhanh 10 câu · {answered}/10 đã làm{answered === 10 ? ` · ${correct}/10 đúng` : ''}</summary>
        <div className="space-y-5 border-t border-sky-100 p-4">
          <p className="text-base text-slate-700">Chọn một đáp án cho mỗi câu. Bạn sẽ thấy đáp án đúng và lời giải ngay sau khi chọn.</p>
          {lesson.exercises.map((question, index) => {
            const selected = answers[question.id];
            return <fieldset key={question.id} className="rounded-2xl border border-slate-200 p-4">
              <legend className="px-1 text-base font-bold text-slate-900">{index + 1}. {question.prompt}</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {question.options.map((option, optionIndex) => <label key={`${optionIndex}-${option}`} className={`flex cursor-pointer items-start gap-2 rounded-xl border px-3 py-2.5 text-base leading-6 ${selected !== undefined && optionIndex === question.answer ? 'border-emerald-400 bg-emerald-50' : selected === optionIndex ? 'border-rose-400 bg-rose-50' : 'border-slate-200 hover:border-sky-300'}`}>
                  <input type="radio" name={`mini-unit-${unit}-question-${question.id}`} checked={selected === optionIndex} onChange={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))} className="mt-1 accent-sky-600" />
                  <span><strong>{String.fromCharCode(65 + optionIndex)}.</strong> {option}</span>
                </label>)}
              </div>
              {selected !== undefined && <p className={`mt-3 rounded-xl p-3 text-base leading-7 ${selected === question.answer ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`} role="status">
                <strong>{selected === question.answer ? 'Đúng rồi!' : `Chưa đúng. Đáp án: ${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}.`}</strong> {question.explanation}
              </p>}
            </fieldset>;
          })}
          {answered > 0 && <button type="button" onClick={() => setAnswers({})} className="rounded-xl border border-sky-300 px-4 py-2.5 font-semibold text-sky-800 hover:bg-sky-50">Làm lại 10 câu</button>}
        </div>
      </details>
    </div>
  </details>;
}

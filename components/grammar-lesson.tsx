'use client';

import { useState } from 'react';
import type { GrammarLesson as GrammarLessonData } from '@/lib/grammar-lessons9';
import { unitEnrichment } from '@/lib/unit-enrichment';

export function GrammarLesson({ grade, lesson, vocabularyReviewed = false, onVocabularyReviewed }: { grade: 6 | 7 | 8 | 9 | 10 | 11 | 12; lesson: GrammarLessonData; vocabularyReviewed?: boolean; onVocabularyReviewed?: () => void }) {
  const unit = lesson.unit;
  const enrichment = unitEnrichment[grade][unit];
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [wrongAttempts, setWrongAttempts] = useState<Record<number, number[]>>({});
  if (!lesson) return null;

  const answered = Object.keys(answers).length;
  const question = lesson.exercises[questionIndex];
  const correctIndex = typeof question.answer === 'number' ? question.answer : 0;
  const triedWrong = wrongAttempts[question.id] ?? [];
  const isCorrect = answers[question.id] === correctIndex;

  const chooseAnswer = (optionIndex: number) => {
    if (isCorrect || triedWrong.includes(optionIndex)) return;
    if (optionIndex === correctIndex) {
      setAnswers((current) => ({ ...current, [question.id]: optionIndex }));
    } else {
      setWrongAttempts((current) => ({ ...current, [question.id]: [...(current[question.id] ?? []), optionIndex] }));
    }
  };

  const resetExercises = () => {
    setQuestionIndex(0);
    setAnswers({});
    setWrongAttempts({});
  };

  return <details className="mb-5 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/70" open>
    <summary className="cursor-pointer px-5 py-4 text-base font-bold text-amber-950">Bài học Unit {unit}: phát âm · từ vựng · ngữ pháp · English {grade}</summary>
    <div className="space-y-4 border-t border-amber-200 p-4 sm:p-5">
      {enrichment && <section className="rounded-2xl border border-sky-100 bg-white p-4 sm:p-5">
        <h2 className="text-lg font-bold text-sky-900">Phát âm · {enrichment.pronunciation.title}</h2>
        <p className="mt-3 text-base leading-7 text-slate-700">{enrichment.pronunciation.guidance}</p>
        <div className="mt-3 rounded-xl bg-sky-50 p-3 text-base leading-7 text-sky-950" lang="en">{enrichment.pronunciation.examples}</div>
        <p className="mt-3 text-sm leading-6 text-slate-600">Hãy đọc thành tiếng và so sánh âm hoặc vị trí trọng âm. Phần này không có bài nghe.</p>
      </section>}
      {enrichment && <section className="overflow-hidden rounded-2xl border border-sky-100 bg-white">
        <div className="border-b border-sky-100 px-4 py-4 sm:px-5"><h2 className="text-lg font-bold text-sky-900">Từ vựng cốt lõi</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm sm:text-base">
            <thead className="bg-sky-50 text-sky-950"><tr><th className="px-4 py-3">Từ / phiên âm</th><th className="px-4 py-3">Từ loại</th><th className="px-4 py-3">Nghĩa</th><th className="px-4 py-3">Ví dụ</th></tr></thead>
            <tbody>{enrichment.vocabulary.map((item) => <tr key={item.word} className="border-t border-sky-100 align-top">
              <td className="px-4 py-3"><strong lang="en" className="text-sky-950">{item.word}</strong><span className="mt-1 block text-sky-700">{item.ipa}</span></td>
              <td className="px-4 py-3 font-medium text-amber-900">{item.partOfSpeech ?? '—'}</td>
              <td className="px-4 py-3 text-slate-700">{item.meaning}</td>
              <td lang="en" className="px-4 py-3 text-slate-700">{item.example}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <div className={`border-t p-4 sm:px-5 ${vocabularyReviewed ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
          {vocabularyReviewed ? <p className="font-semibold text-emerald-900">✓ Đã review Vocabulary — câu kiểm tra nghĩa từ ở Looking Back đã được mở.</p> : <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-medium text-amber-950">Đọc từ, nghĩa, từ loại và ví dụ trước khi mở bài kiểm tra Looking Back.</p><button type="button" onClick={onVocabularyReviewed} className="rounded-xl bg-amber-500 px-4 py-2.5 font-bold text-white hover:bg-amber-600">Tôi đã review Vocabulary</button></div>}
        </div>
      </section>}
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
        <summary className="cursor-pointer px-4 py-4 text-base font-bold text-sky-900">Thử nhanh 10 câu · {answered}/{lesson.exercises.length} đã làm</summary>
        <div className="space-y-5 border-t border-sky-100 p-4">
          <p className="text-base text-slate-700">Mỗi lần một câu. Chọn sai thì phương án đó bị khóa; hãy thử tiếp đến khi đúng để xem lời giải và sang câu sau.</p>
          <fieldset key={question.id} className="rounded-2xl border border-slate-200 p-4">
              <legend className="px-1 text-base font-bold text-slate-900">{questionIndex + 1}. {question.prompt}</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {question.options.map((option, optionIndex) => <label key={`${optionIndex}-${option}`} className={`flex items-start gap-2 rounded-xl border px-3 py-2.5 text-base leading-6 ${triedWrong.includes(optionIndex) ? 'cursor-not-allowed border-rose-400 bg-rose-50 text-rose-800' : isCorrect && optionIndex === correctIndex ? 'border-emerald-400 bg-emerald-50' : isCorrect ? 'cursor-not-allowed border-slate-200 text-slate-500' : 'cursor-pointer border-slate-200 hover:border-sky-300'}`}>
                  <input type="radio" name={`mini-grade-${grade}-unit-${unit}-question-${question.id}`} checked={answers[question.id] === optionIndex} disabled={isCorrect || triedWrong.includes(optionIndex)} onChange={() => chooseAnswer(optionIndex)} className="mt-1 accent-sky-600" />
                  <span><strong>{String.fromCharCode(65 + optionIndex)}.</strong> {option}</span>
                </label>)}
              </div>
              {triedWrong.length > 0 && !isCorrect && <output className="mt-3 block rounded-xl bg-rose-50 p-3 text-base leading-7 text-rose-900">Chưa đúng. Phương án sai đã bị khóa; hãy chọn phương án khác.</output>}
              {isCorrect && <output className="mt-3 block rounded-xl bg-emerald-50 p-3 text-base leading-7 text-emerald-900"><strong>Đúng rồi! Đáp án: {String.fromCharCode(65 + correctIndex)}. {question.options[correctIndex]}.</strong> {question.explanation}</output>}
            </fieldset>
          <div className="flex items-center justify-between gap-3">
            <button type="button" disabled={questionIndex === 0} onClick={() => setQuestionIndex((value) => value - 1)} className="rounded-xl border border-sky-300 px-4 py-2.5 font-semibold text-sky-800 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40">Câu trước</button>
            {questionIndex < lesson.exercises.length - 1 && <button type="button" disabled={!isCorrect} onClick={() => setQuestionIndex((value) => value + 1)} className="rounded-xl bg-sky-600 px-4 py-2.5 font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40">Câu tiếp</button>}
          </div>
          {answered === lesson.exercises.length && <p className="rounded-xl bg-emerald-50 p-3 text-base font-semibold text-emerald-900">Bạn đã hoàn thành cả {lesson.exercises.length} câu!</p>}
          {answered > 0 && <button type="button" onClick={resetExercises} className="rounded-xl border border-sky-300 px-4 py-2.5 font-semibold text-sky-800 hover:bg-sky-50">Làm lại {lesson.exercises.length} câu</button>}
        </div>
      </details>
    </div>
  </details>;
}

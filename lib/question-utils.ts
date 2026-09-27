import type { Question } from './exams';

export type AnswerValue = number | string | string[];

export function normalizeAnswer(value: string): string {
  return value
    .normalize('NFKC')
    .replace(/[‘’]/g, "'")
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.!?]+$/g, '')
    .toLowerCase();
}

export function isAnswerComplete(question: Question, value: AnswerValue | undefined): boolean {
  if (value === undefined) return false;
  if (typeof value === 'number') return true;
  if (typeof value === 'string') return value.trim().length > 0;
  const expected = Array.isArray(question.answer) ? question.answer.length : question.acceptedAnswers?.length ?? 1;
  return value.length === expected && value.every((item) => item.trim().length > 0);
}

export function isQuestionCorrect(question: Question, value: AnswerValue | undefined): boolean {
  if (value === undefined) return false;
  if (typeof question.answer === 'number') return value === question.answer;
  const submitted = Array.isArray(value) ? value : [String(value)];
  const expected = Array.isArray(question.answer) ? question.answer : [question.answer];
  return expected.every((answer, index) => {
    const accepted = question.acceptedAnswers?.[index] ?? [answer];
    return accepted.some((candidate) => normalizeAnswer(candidate) === normalizeAnswer(submitted[index] ?? ''));
  });
}

export function formatAnswer(question: Question, value: AnswerValue | undefined): string {
  if (value === undefined) return 'Chưa trả lời';
  if (typeof value === 'number') return `${String.fromCharCode(65 + value)}. ${question.options[value] ?? ''}`;
  return (Array.isArray(value) ? value : [value]).join(' · ');
}

export function correctAnswer(question: Question): string {
  if (typeof question.answer === 'number') return `${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`;
  return (Array.isArray(question.answer) ? question.answer : [question.answer]).join(' · ');
}

export function questionKey(question: Question): string {
  return normalizeAnswer(`${question.kind ?? 'mcq'} ${question.prompt} ${question.template ?? ''} ${question.options.join(' ')}`)
    .replace(/\b(the|a|an)\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

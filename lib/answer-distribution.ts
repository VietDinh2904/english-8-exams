import type { Exam, Question } from './exams';

function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result = Math.imul(result ^ value.charCodeAt(index), 16777619);
  }
  return result >>> 0;
}

/** Keep the correct answer evenly spread across A–D without changing its text. */
export function distributeAnswers(questions: Question[], seed: string): Question[] {
  const counts = [0, 0, 0, 0];
  let previous = -1;
  return questions.map((question, index) => {
    if (question.options.length !== 4 || question.answer < 0 || question.answer > 3) return question;

    const lowest = Math.min(...counts);
    const leastUsed = [0, 1, 2, 3].filter((position) => counts[position] === lowest);
    const withoutRepeat = leastUsed.filter((position) => position !== previous);
    const candidates = withoutRepeat.length ? withoutRepeat : leastUsed;
    const target = candidates[hash(`${seed}|${index}|${question.prompt}`) % candidates.length];
    const wrongOptions = question.options.filter((_, position) => position !== question.answer);
    const correctOption = question.options[question.answer];
    const options = [...wrongOptions];
    options.splice(target, 0, correctOption);

    let underlines: string[] | undefined;
    if (question.underlines) {
      const wrongUnderlines = question.underlines.filter((_, position) => position !== question.answer);
      underlines = [...wrongUnderlines];
      underlines.splice(target, 0, question.underlines[question.answer] ?? '');
    }

    counts[target] += 1;
    previous = target;
    return { ...question, options, answer: target, underlines };
  });
}

export function distributeExams(exams: Exam[]): Exam[] {
  return exams.map((exam) => ({
    ...exam,
    questions: distributeAnswers(exam.questions, `${exam.title}|${exam.id}`),
  }));
}

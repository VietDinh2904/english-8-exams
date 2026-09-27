import type { Exam, Question } from './exams';

type Grade = 8 | 9 | 10;
type Period = 'midterm2' | 'final2';

const topics: Record<Grade, { midterm2: string[]; final2: string[] }> = {
  8: { midterm2: ['environment', 'shopping', 'natural disasters'], final2: ['communication', 'science', 'life in space'] },
  9: { midterm2: ['natural wonders', 'tourism', 'English in the world'], final2: ['space travel', 'changing roles', 'future careers'] },
  10: { midterm2: ['inventions', 'gender equality', 'Viet Nam and international organisations'], final2: ['ecotourism', 'new ways to learn', 'protecting the environment'] },
};

const names = ['An', 'Mai', 'Linh', 'Nam', 'Minh', 'Lan', 'Vy'];

function mcq(id: number, prompt: string, options: string[], answer: number, explanation: string): Question {
  return { id, section: 'Language Focus', prompt, options, answer, explanation };
}

function typed(id: number, prompt: string, template: string, answers: string[], explanation: string, accepted?: string[][]): Question {
  return { id, section: 'Language Focus', kind: 'typed', prompt, template, options: [], answer: answers, acceptedAnswers: accepted, explanation, hint: 'Look at the time expression, the word in brackets, and the grammar pattern around the blank.' };
}

function createMixedQuestions(grade: Grade, period: Period, set: number): Question[] {
  const theme = topics[grade][period][(set - 1) % 3];
  const person = names[(set - 1) % names.length];
  const questions: Question[] = [];
  const patterns = [
    [`${person} usually ___ useful notes after each lesson about ${theme}.`, ['makes', 'make', 'making', 'made'], 0, 'The subject is singular, so the present-simple verb takes -s.'],
    [`Our class is interested ___ a project about ${theme}.`, ['in', 'on', 'at', 'for'], 0, 'Use the fixed expression “be interested in”.'],
    [`The team worked ___ than it did last month.`, ['more carefully', 'careful', 'most carefully', 'more careful'], 0, 'An adverb is needed after “worked”; “than” signals the comparative form.'],
    [`If students prepare well, they ___ more confident.`, ['will feel', 'felt', 'would feel', 'feelings'], 0, 'The first conditional uses if + present simple, will + base verb.'],
    [`The information ___ by the teacher yesterday.`, ['was checked', 'checked', 'is checking', 'has check'], 0, 'A past passive form is required: was/were + past participle.'],
    [`Choose the best connector: The task was difficult; ___, the group completed it.`, ['however', 'because', 'so that', 'unless'], 0, '“However” introduces a contrast between two complete ideas.'],
    [`Which word is closest in meaning to “helpful” in this context?`, ['useful', 'harmful', 'careless', 'silent'], 0, '“Useful” and “helpful” have similar meanings.'],
    [`The students agreed ___ their results with the class.`, ['to share', 'sharing to', 'share', 'shared'], 0, 'Use agree + to-infinitive.'],
  ] as const;
  for (let index = 0; index < 24; index += 1) {
    const [prompt, options, answer, explanation] = patterns[index % patterns.length];
    const cycle = Math.floor(index / patterns.length) + 1;
    questions.push(mcq(index + 1, `${prompt} (Context ${set}.${cycle})`, [...options], answer, `${explanation} Chủ điểm: ${theme}.`));
  }

  questions.push(
    typed(25, 'Write the correct form of the verb in brackets.', `${person} [[0]] (study) this topic every Friday.`, ['studies'], 'Present simple: a third-person singular subject takes “studies”.'),
    typed(26, 'Write the correct form of the verb in brackets.', `They [[0]] (finish) the project before the teacher arrived.`, ['had finished'], 'Past perfect describes the earlier of two past actions.'),
    typed(27, 'Write the correct form of the verb in brackets.', `Look! The students [[0]] (prepare) their display.`, ['are preparing'], '“Look!” signals an action happening now, so use the present continuous.'),
    typed(28, 'Write the correct form of the verb in brackets.', `The report [[0]] (send) to every group tomorrow.`, ['will be sent'], 'Future passive: will be + past participle.'),
    typed(29, 'Write the correct form of the verb in brackets.', `${person} enjoys [[0]] (learn) more about ${theme}.`, ['learning'], 'Use enjoy + V-ing.'),
    typed(30, 'Write the correct form of the word in brackets.', `The club needs a more [[0]] plan. (PRACTICE)`, ['practical'], 'An adjective is required before the noun “plan”.'),
    typed(31, 'Write the correct form of the word in brackets.', `Everyone listened [[0]] to the instructions. (CARE)`, ['carefully'], 'An adverb modifies the verb “listened”.'),
    typed(32, 'Write the correct form of the word in brackets.', `The activity encourages student [[0]]. (CREATE)`, ['creativity'], 'A noun is required after “student”.'),
    typed(33, 'Write the correct form of the word in brackets.', `The new method is both simple and [[0]]. (EFFECT)`, ['effective'], 'An adjective is needed after “is”.'),
    typed(34, 'Write the correct form of the word in brackets.', `The speaker gave a clear [[0]] of the process. (EXPLAIN)`, ['explanation'], 'A noun follows the article and adjective.'),
    {
      id: 35, section: 'Reading', kind: 'cloze-dropdown',
      prompt: 'Read the whole passage and choose an option at each blank.',
      template: `Our class recently completed a project about ${theme}. First, we [[0]] into small teams. Each team chose a question [[1]] it wanted to investigate. We used reliable websites [[2]] collect information and then compared our notes. The final posters were [[3]] in the school library, where many students stopped to read them. The project was challenging, [[4]] it taught us how to cooperate.`,
      options: [], answer: ['divided', 'that', 'to', 'displayed', 'but'],
      gapOptions: [['divided', 'divide', 'dividing', 'division'], ['that', 'who', 'where', 'whose'], ['to', 'for', 'by', 'at'], ['displayed', 'displaying', 'display', 'displays'], ['but', 'because', 'unless', 'so that']],
      explanation: 'The answers follow the passive form, a relative clause, an infinitive of purpose, another passive form, and a contrast connector.',
      hint: 'Read the whole passage. Check the grammar immediately before and after every blank.',
    },
    typed(36, 'Rearrange the given words to make a complete sentence. Do not change the words.', `students / should / sources / reliable / use / online\n→ [[0]]`, ['Students should use reliable online sources'], 'Order: subject + modal + base verb + adjective + noun.', [['Students should use reliable online sources', 'students should use reliable online sources.']]),
    typed(37, 'Rearrange the given words to make a complete sentence. Do not change the words.', `our / finished / team / project / the / on time\n→ [[0]]`, ['Our team finished the project on time'], 'Use normal English order: subject + verb + object + time phrase.'),
    typed(38, 'Rearrange the given words to make a complete sentence. Do not change the words.', `because / useful / activity / enjoyed / was / it / the / we\n→ [[0]]`, ['We enjoyed the activity because it was useful'], 'Place the main clause before the because-clause.'),
    typed(39, 'Complete the second sentence so that it means the same as the first.', `This is the first time ${person} has joined a school project.\n→ ${person} has [[0]] a school project before.`, ['never joined'], '“This is the first time…” can be rewritten with the present perfect and “never … before”.'),
    typed(40, 'Complete the second sentence using the word in capitals. Do not change the given word.', `The task was difficult, but the students did not give up. (ALTHOUGH)\n→ [[0]], the students did not give up.`, ['Although the task was difficult'], 'Although + clause expresses contrast.', [['Although the task was difficult', 'although the task was difficult']]),
  );
  return questions;
}

function createExam(grade: Grade, period: Period, set: number): Exam {
  const label = period === 'midterm2' ? `Giữa kỳ II · Đề ${set}` : `Cuối kỳ II · Đề ${set}`;
  const theme = topics[grade][period].join(' · ');
  return {
    id: grade * 10000 + (period === 'midterm2' ? 200 : 300) + set,
    menuLabel: label,
    menuGroup: period,
    title: `English ${grade} · ${label}`,
    theme: `${theme} · 40 câu · Không gồm phần nghe`,
    sourceNote: `Đề được biên soạn mới theo phạm vi học kỳ II của English ${grade} Global Success. Giữ đúng dạng MCQ, chia động từ, từ loại, cloze, sắp xếp và viết lại câu; không sao chép nguyên văn nguồn tham khảo.`,
    passageTitle: 'A class project',
    passage: '',
    questions: createMixedQuestions(grade, period, set),
  };
}

export const semester2Exams: Record<Grade, Exam[]> = {
  8: [...Array.from({ length: 7 }, (_, index) => createExam(8, 'midterm2', index + 1)), ...Array.from({ length: 7 }, (_, index) => createExam(8, 'final2', index + 1))],
  9: [...Array.from({ length: 7 }, (_, index) => createExam(9, 'midterm2', index + 1)), ...Array.from({ length: 7 }, (_, index) => createExam(9, 'final2', index + 1))],
  10: [...Array.from({ length: 7 }, (_, index) => createExam(10, 'midterm2', index + 1)), ...Array.from({ length: 7 }, (_, index) => createExam(10, 'final2', index + 1))],
};

/** Preserve the mixed formats shown in the referenced English 10 midterm model. */
export function upgradeEnglish10MidtermSix(exams: Exam[]): Exam[] {
  return exams.map((exam) => exam.menuGroup === 'midterm' && (exam.menuLabel ?? '').endsWith('Đề 6')
    ? { ...exam, theme: 'Units 1–3 · 40 câu · Đúng cấu trúc đề hỗn hợp', questions: createMixedQuestions(10, 'midterm2', 6) }
    : exam);
}

import { distributeAnswers } from './answer-distribution';
import type { Exam, Question } from './exams';
import { unitEnrichment } from './unit-enrichment';
import { unit1NewBookExams } from './unit1-new-book';

type Grade = 8 | 9 | 10;
type SkillArea = NonNullable<Question['skillArea']>;
type GrammarRow = [prompt: string, correct: string, wrong1: string, wrong2: string, wrong3: string, explanation: string];
type WritingTask = { prompt: string; answer: string | string[]; template: string; explanation: string; givenWord?: string; acceptedAnswers?: string[][] };
type UnitSpec = {
  grade: Grade;
  unit: number;
  title: string;
  pronunciationExtra: GrammarRow;
  grammar: GrammarRow[];
  reading: { title: string; passage: string; subject: string; action: string; detail: string; result: string; falseDetail: string };
  writing: WritingTask[];
  lookingBack: GrammarRow;
};

const mcq = (skillArea: SkillArea, section: Question['section'], prompt: string, options: string[], answer: number, explanation: string, underlines?: string[]): Omit<Question, 'id'> => ({ section, skillArea, prompt, options, answer, explanation, underlines });

const typed = (skillArea: SkillArea, section: Question['section'], prompt: string, answer: string | string[], explanation: string, template = '[[0]]', acceptedAnswers?: string[][], givenWord?: string): Omit<Question, 'id'> => ({
  section, skillArea, prompt, options: [], answer, explanation, kind: 'typed', template, acceptedAnswers, givenWord,
  hint: 'Check the target word, grammar pattern and word order. Capital letters and final punctuation are not graded.',
});

function buildUnitExam(spec: UnitSpec): Exam {
  const enrichment = unitEnrichment[spec.grade][spec.unit];
  const vocabulary = enrichment.vocabulary;
  const pronunciation = enrichment.pronunciation;
  const readingWrong = ['A sports team', 'A television presenter', 'A tourist company'];
  const actionWrong = ['avoids every community activity', 'copies a plan without discussion', 'spends the whole day shopping'];
  const resultWrong = ['The project ends immediately.', 'Nobody learns anything new.', 'The group creates more waste.'];
  const items: Omit<Question, 'id'>[] = [
    mcq('Pronunciation', 'Language Focus', pronunciation.prompt ?? 'Choose the word whose underlined part is pronounced differently.', [...pronunciation.options], pronunciation.answer, pronunciation.explanation, pronunciation.underlines ? [...pronunciation.underlines] : undefined),
    mcq('Pronunciation', 'Language Focus', spec.pronunciationExtra[0], spec.pronunciationExtra.slice(1, 5), 0, spec.pronunciationExtra[5]),

    ...vocabulary.map((entry, index) => mcq('Vocabulary', 'Language Focus', `Which Unit ${spec.unit} word means “${entry.meaning}”?`, vocabulary.map((item) => item.word), index, `“${entry.word}” means ${entry.meaning}.`)),
    typed('Vocabulary', 'Language Focus', 'Complete the sentence with the missing Unit word.', vocabulary[0].word, `The context matches “${vocabulary[0].word}”.`, vocabulary[0].example.replace(new RegExp(vocabulary[0].word, 'i'), '[[0]]')),
    typed('Vocabulary', 'Language Focus', 'Complete the sentence with the missing Unit word.', vocabulary[3].word, `The context matches “${vocabulary[3].word}”.`, vocabulary[3].example.replace(new RegExp(vocabulary[3].word, 'i'), '[[0]]')),

    ...spec.grammar.map((row) => mcq('Grammar', 'Language Focus', row[0], row.slice(1, 5), 0, row[5])),

    mcq('Reading', 'Reading', `Who or what is mainly described in “${spec.reading.title}”?`, [spec.reading.subject, ...readingWrong], 0, `The passage focuses on ${spec.reading.subject}.`),
    mcq('Reading', 'Reading', 'What is the main action in the passage?', [spec.reading.action, ...actionWrong], 0, `The central action is that the subject ${spec.reading.action}.`),
    mcq('Reading', 'Reading', 'Which detail is stated in the passage?', [spec.reading.detail, spec.reading.falseDetail, 'Everyone refuses to take part.', 'The activity happens without any planning.'], 0, `The passage states: ${spec.reading.detail}`),
    mcq('Reading', 'Reading', 'What is one result of the activity?', [spec.reading.result, ...resultWrong], 0, spec.reading.result),
    mcq('Reading', 'Reading', 'Which statement is NOT true according to the passage?', [spec.reading.falseDetail, spec.reading.detail, spec.reading.result, spec.reading.action], 0, `The false statement is: ${spec.reading.falseDetail}`),

    ...spec.writing.map((task) => typed('Writing', 'Writing', task.prompt, task.answer, task.explanation, task.template, task.acceptedAnswers, task.givenWord)),

    mcq('Looking Back', 'Language Focus', 'Which pair contains two key words from this unit?', [`${vocabulary[0].word} · ${vocabulary[1].word}`, `${vocabulary[0].word} · airport`, `calculator · ${vocabulary[1].word}`, 'passport · laboratory'], 0, `Both “${vocabulary[0].word}” and “${vocabulary[1].word}” belong to Unit ${spec.unit}.`),
    mcq('Looking Back', 'Language Focus', spec.lookingBack[0], spec.lookingBack.slice(1, 5), 0, spec.lookingBack[5]),
    typed('Looking Back', 'Language Focus', 'Complete the review sentence with the correct Unit word.', vocabulary[2].word, `The missing word is “${vocabulary[2].word}”.`, vocabulary[2].example.replace(new RegExp(vocabulary[2].word, 'i'), '[[0]]')),
    typed('Looking Back', 'Writing', 'Use the cues to write the result sentence from the reading.', spec.reading.result, 'Use a complete sentence with correct word order.', spec.reading.result.split(' ').sort((a, b) => a.length - b.length).join(' / ') + ' → [[0]]'),
  ];

  const questions = distributeAnswers(items.map((item, index) => ({ ...item, id: index + 1 })), `new-book-${spec.grade}-${spec.unit}`);
  return {
    id: spec.grade * 1000 + spec.unit,
    unit: spec.unit,
    bookLabel: 'Bộ mới',
    skipEnrichment: true,
    menuLabel: `Unit ${spec.unit} · ${spec.title} · Bộ mới`,
    menuGroup: 'unit',
    title: `English ${spec.grade} · Unit ${spec.unit}: ${spec.title} · Bộ mới`,
    theme: 'Pronunciation · Vocabulary · Grammar · Reading · Writing · Looking Back',
    sourceNote: 'Bộ bài mới được viết nguyên bản theo mục tiêu và dạng bài của Global Success. Từ vựng trọng tâm được giữ; câu hỏi, ngữ cảnh, bài đọc và bài viết đều được tạo mới.',
    passageTitle: spec.reading.title,
    passage: spec.reading.passage,
    questions,
  };
}

const grade8Specs: UnitSpec[] = [
  {
    grade: 8, unit: 2, title: 'Life in the countryside',
    pronunciationExtra: ['Which word begins with the weak vowel /ə/?', 'about', 'village', 'river', 'field', 'The first sound in “about” is /ə/.'],
    grammar: [
      ['The new machine works ___ than the old one.', 'more efficiently', 'efficientlier', 'most efficiently', 'more efficient', 'Use more + a long adverb in the comparative.'],
      ['Hoa gets up ___ than her cousin during harvest time.', 'earlier', 'more early', 'earlyer', 'earliest', 'Early changes to earlier.'],
      ['A horse can run ___ than a buffalo.', 'faster', 'more fast', 'fastly', 'fastest', 'The comparative form of fast is faster.'],
      ['The villagers completed the work ___ than expected.', 'more quickly', 'quicklier', 'most quick', 'more quick', 'Quickly is a long adverb, so use more quickly.'],
      ['My uncle drives ___ on narrow country roads than in the city.', 'more carefully', 'carefullier', 'more careful', 'most carefully', 'Carefully needs more in the comparative.'],
      ['After more practice, Minh can feed the animals ___.', 'better', 'more well', 'gooder', 'best', 'The comparative form of well is better.'],
    ],
    reading: { title: 'The Shared Water Schedule', passage: 'In An’s village, three orchards use water from the same canal. Last summer, the canal became low, so the farmers created a shared schedule. Each family waters its trees for two hours in the early morning or late afternoon. A student team records the water level every Friday and posts the result at the community house. Because everyone follows the plan, the orchards now use less water while the fruit trees remain healthy.', subject: 'farmers and students in An’s village', action: 'share canal water through an agreed schedule', detail: 'Students record the water level every Friday.', result: 'The orchards use less water and the trees remain healthy.', falseDetail: 'Each family uses the canal whenever it wants.' },
    writing: [
      { prompt: 'Rearrange the words to make a complete sentence.', answer: 'Farmers now work more efficiently than before', template: 'farmers / now / work / efficiently / than / before → [[0]]', explanation: 'Use more efficiently than for the comparison.' },
      { prompt: 'Write the correct comparative form.', answer: 'more carefully', template: 'Lan picks the fruit [[0]] (carefully) than her brother.', explanation: 'Carefully forms the comparative with more.' },
      { prompt: 'Rewrite without changing the meaning.', answer: 'The tractor moves more slowly than the motorbike', template: 'The motorbike moves faster than the tractor. → [[0]]', explanation: 'Reverse the comparison with more slowly than.' },
      { prompt: 'Complete the description from the cues.', answer: 'Life in the village is quieter but more active during harvest time', template: 'life / village / quiet / but / active / during harvest time → [[0]]', explanation: 'Use comparative descriptions naturally in a complete sentence.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'The workers arrived earlier than we did.', 'The workers arrived more early than we did.', 'The workers earlier arrived than we did.', 'The workers arrived earliest than we did.', 'Earlier is the correct comparative of early.'],
  },
  {
    grade: 8, unit: 3, title: 'Teenagers',
    pronunciationExtra: ['Which word contains the /ɔɪ/ sound?', 'choice', 'sure', 'tour', 'poor', '“Choice” contains the diphthong /ɔɪ/.'],
    grammar: [
      ['I felt nervous, ___ my friend stayed beside me.', 'but', 'so', 'or', 'because of', 'But links two contrasting independent clauses.'],
      ['The deadline is close, ___ we should start today.', 'so', 'but', 'or', 'yet', 'The second clause is a result, so use so.'],
      ['You can join the art club, ___ you can try the sports club.', 'or', 'so', 'but', 'therefore', 'Or introduces an alternative.'],
      ['Mai asked for help, ___ her teacher explained the task again.', 'and', 'or', 'yet', 'however', 'And adds the next related action.'],
      ['The forum is useful; ___, users must write politely.', 'however', 'so', 'and', 'or', 'However follows a semicolon and is followed by a comma.'],
      ['Which is a compound sentence?', 'I was tired, but I finished my notes.', 'Feeling tired after class.', 'Because I had too much work.', 'To finish my notes on time.', 'A compound sentence contains two independent clauses.'],
    ],
    reading: { title: 'A Five-Minute Check-In', passage: 'Class 8B begins Monday with a five-minute check-in. Students write one word about how they feel and place it on a private card. The teacher reads the cards after class and speaks quietly with anyone who asks for support. Students may also suggest a helpful class activity. The routine does not solve every problem, but it helps the class notice stress early and makes asking for help feel normal.', subject: 'Class 8B and its teacher', action: 'use a short weekly emotional check-in', detail: 'The teacher reads the private cards after class.', result: 'Students can recognise stress earlier and ask for support more easily.', falseDetail: 'Students must read their feelings aloud to the whole class.' },
    writing: [
      { prompt: 'Rearrange the words to make a compound sentence.', answer: 'I was worried, but my friend listened patiently', template: 'I / worried / but / my friend / listen / patiently → [[0]]', explanation: 'Join the contrasting clauses with but.' },
      { prompt: 'Complete the sentence with a suitable conjunction.', answer: 'so', template: 'The task was difficult, [[0]] we made a study plan.', explanation: 'The plan is the result of the difficult task.' },
      { prompt: 'Rewrite using “however”.', answer: 'The app is useful; however, it can be distracting', template: 'The app is useful, but it can be distracting. → [[0]]', explanation: 'Use a semicolon before however and a comma after it.', givenWord: 'HOWEVER' },
      { prompt: 'Write a complete sentence from the cues.', answer: 'Teenagers need support, and adults should listen without judging', template: 'teenagers / need support / and / adults / listen / without judging → [[0]]', explanation: 'Use and to join two related clauses.' },
    ],
    lookingBack: ['Choose the correct punctuation.', 'I wanted to reply; however, I needed time to think.', 'I wanted to reply, however I needed time to think.', 'I wanted to reply however, I needed time to think.', 'I wanted to reply; however I needed time to think.', 'Use a semicolon before however and a comma after it.'],
  },
  {
    grade: 8, unit: 4, title: 'Ethnic groups of Viet Nam',
    pronunciationExtra: ['Which word begins with the voiced sound /ɡ/?', 'garden', 'costume', 'kite', 'school', '“Garden” begins with /ɡ/.'],
    grammar: [
      ['___ the Ede traditionally live in longhouses?', 'Do', 'Does', 'Are', 'Is', 'Use Do with a plural group name in the present simple.'],
      ['Where ___ this festival take place?', 'does', 'do', 'is', 'did last', 'Use does with the singular subject this festival.'],
      ['___ these costumes made by hand?', 'Are', 'Is', 'Do', 'Does', 'Use Are with the plural subject these costumes.'],
      ['What ___ the guide show the class yesterday?', 'did', 'does', 'was', 'is', 'Yesterday requires did + base verb.'],
      ['Who ___ the traditional drum?', 'plays', 'does play', 'play does', 'is play', 'When who is the subject, do not add do/does.'],
      ['Choose the correct question.', 'How do artisans make this cloth?', 'How artisans make this cloth?', 'How does artisans make this cloth?', 'How do artisans makes this cloth?', 'Use How + do + plural subject + base verb.'],
    ],
    reading: { title: 'Young Guides at the Cultural House', passage: 'A cultural house in the Central Highlands trains local teenagers as weekend guides. Before meeting visitors, the students interview elders, practise the correct names of objects and learn when photographs are appropriate. During a tour, they explain the communal house, musical instruments and weaving patterns. The elders check the information each month. The programme gives visitors accurate knowledge and helps young people value their own heritage.', subject: 'local teenage guides and community elders', action: 'prepare and lead respectful cultural tours', detail: 'Elders check the tour information every month.', result: 'Visitors learn accurately and teenagers value their heritage.', falseDetail: 'The guides invent stories without speaking to elders.' },
    writing: [
      { prompt: 'Rearrange the words to make a question.', answer: 'Where do the Mnong live', template: 'where / the Mnong / live / do → [[0]]', explanation: 'Use Where + do + plural subject + base verb.' },
      { prompt: 'Write the correct auxiliary.', answer: 'Does', template: '[[0]] this group have a harvest festival?', explanation: 'This group is singular, so use Does.' },
      { prompt: 'Rewrite as a Wh-question for the underlined information.', answer: 'What do visitors learn at the cultural house', template: 'Visitors learn traditional weaving at the cultural house. → [[0]]?', explanation: 'Ask about the object with What + do + subject + verb.' },
      { prompt: 'Write a complete sentence from the cues.', answer: 'Students should ask before taking photographs in the village', template: 'students / should / ask / before / take photographs / village → [[0]]', explanation: 'Use should + base verb and before + V-ing.' },
    ],
    lookingBack: ['Choose the correct question.', 'Who teaches the children this folk dance?', 'Who does teaches the children this folk dance?', 'Who teach does the children this folk dance?', 'Who is teach the children this folk dance?', 'Who is the subject, so use Who + verb.'],
  },
  {
    grade: 8, unit: 5, title: 'Our customs and traditions',
    pronunciationExtra: ['Which word ends with the sound /ŋ/?', 'sing', 'sun', 'nine', 'name', '“Sing” ends with /ŋ/.'],
    grammar: [
      ['We usually have ___ dinner at seven.', 'no article', 'a', 'an', 'the', 'Meal names normally take no article when used generally.'],
      ['Grandma prepared ___ special offering for the altar.', 'a', 'an', 'the only', 'no article', 'Offering is singular and first mentioned; special begins with a consonant sound.'],
      ['I saw an old tray. ___ tray belonged to my great-grandmother.', 'The', 'A', 'An', 'No article', 'Use the when referring again to a known object.'],
      ['Children often learn ___ table manners from adults.', 'no article', 'a', 'an', 'the one', 'Plural nouns used generally take no article.'],
      ['They told us ___ interesting story about the custom.', 'an', 'a', 'the', 'no article', 'Interesting begins with a vowel sound.'],
      ['My aunt works at ___ local museum near the river.', 'a', 'an', 'no article', 'the every', 'Local begins with a consonant sound and the museum is first mentioned.'],
    ],
    reading: { title: 'The Welcome Tray', passage: 'When visitors come to Vy’s home during Tet, her grandmother prepares a small welcome tray. It contains tea, candied fruit and roasted seeds. The youngest family member carries the tray carefully, while an older person explains the meaning of each item. Guests may try everything, but they are never pressured to eat. Vy likes the custom because it creates a calm moment for conversation before the larger meal begins.', subject: 'Vy’s family and their Tet visitors', action: 'share a respectful welcome-tray custom', detail: 'An older person explains the meaning of each item.', result: 'The custom creates a calm moment for conversation.', falseDetail: 'Guests are forced to eat every item on the tray.' },
    writing: [
      { prompt: 'Complete the sentence with the correct article.', answer: 'an', template: 'We listened to [[0]] interesting story about Tet.', explanation: 'Interesting begins with a vowel sound.' },
      { prompt: 'Rearrange the words to make a sentence.', answer: 'Children learn family traditions from older relatives', template: 'children / family traditions / learn / older relatives / from → [[0]]', explanation: 'Use the general plural noun without an article.' },
      { prompt: 'Rewrite using “the”.', answer: 'The custom is still important to our family', template: 'We have a custom. This custom is still important to our family. → [[0]]', explanation: 'Use the for the custom already mentioned.', givenWord: 'THE' },
      { prompt: 'Write a complete sentence from the cues.', answer: 'We have breakfast together on the first morning of Tet', template: 'we / have / breakfast / together / first morning / Tet → [[0]]', explanation: 'Breakfast takes no article when used as a meal name.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'We speak Vietnamese and have lunch together.', 'We speak the Vietnamese and have a lunch together.', 'We speak a Vietnamese and have the lunch together always.', 'We speak Vietnamese and have an lunch together.', 'Language and meal names normally take no article here.'],
  },
  {
    grade: 8, unit: 6, title: 'Lifestyles',
    pronunciationExtra: ['Which word begins with /pr/?', 'prize', 'bread', 'bright', 'broom', '“Prize” begins with /pr/.'],
    grammar: [
      ['I think more families ___ bicycles next year.', 'will use', 'use yesterday', 'will to use', 'using', 'Use will + base verb for a prediction.'],
      ['If the weather ___ fine, we will walk to the market.', 'is', 'will be', 'was', 'be', 'Use the present simple in the if-clause.'],
      ['Don’t worry. I ___ you set up the video call.', 'will help', 'helped tomorrow', 'will to help', 'am help', 'A decision or promise at the moment of speaking uses will.'],
      ['Unless we leave now, we ___ the bus.', 'will miss', 'missed', 'will to miss', 'missing', 'Unless introduces the condition; the main clause uses will.'],
      ['If grandparents use messaging apps, they ___ stay in touch more easily.', 'can', 'can to', 'will can', 'are can', 'A modal is followed by the base verb.'],
      ['Choose the correct sentence.', 'If Lan practises, she will improve.', 'If Lan will practise, she improves.', 'If Lan practises, she will to improve.', 'If Lan practise, she will improve.', 'Use present simple after if and will + base verb in the result.'],
    ],
    reading: { title: 'Dinner Without Notifications', passage: 'For one month, Bao’s family placed every phone in a basket during dinner. At first, the room felt unusually quiet, but family members soon began sharing more stories. Bao’s grandfather described games from his childhood, while Bao showed him how to use a map app after the meal. The rule is now flexible: an urgent call is allowed. The family will continue the habit because it gives each generation time to listen.', subject: 'Bao’s multigenerational family', action: 'keep phones away during dinner to improve conversation', detail: 'Urgent calls are still allowed.', result: 'Different generations have more time to listen to one another.', falseDetail: 'The family permanently bans phones for the entire day.' },
    writing: [
      { prompt: 'Rearrange the words to make a conditional sentence.', answer: 'If we eat together, we will talk more', template: 'if / we / eat together / we / talk more / will → [[0]]', explanation: 'Use present simple after if and will in the result clause.' },
      { prompt: 'Write the correct future form.', answer: 'will become', template: 'Family routines [[0]] (become) more flexible in the future.', explanation: 'Use will + base verb for a prediction.' },
      { prompt: 'Rewrite using “unless”.', answer: 'Unless we leave early, we will be late', template: 'If we do not leave early, we will be late. → [[0]]', explanation: 'Unless means if not.', givenWord: 'UNLESS' },
      { prompt: 'Write a complete sentence from the cues.', answer: 'If older people learn new apps, they can communicate more easily', template: 'if / older people / learn / new apps / they / can / communicate / easily → [[0]]', explanation: 'Use present simple in the condition and can + base verb in the result.' },
    ],
    lookingBack: ['Choose the correct future question.', 'Will your family keep this habit next month?', 'Does your family will keep this habit next month?', 'Will your family to keep this habit next month?', 'Your family will keep this habit next month?', 'A future simple question begins with Will + subject + base verb.'],
  },
  {
    grade: 8, unit: 7, title: 'Environmental protection',
    pronunciationExtra: ['Which word begins with /kl/?', 'clean', 'blue', 'black', 'blanket', '“Clean” begins with /kl/.'],
    grammar: [
      ['We will plant the trees when the rain ___.', 'stops', 'will stop', 'stopped tomorrow', 'stopping', 'Use present simple in a future time clause.'],
      ['___ the volunteers leave, they will check the beach again.', 'Before', 'During', 'Despite', 'Because of', 'Before introduces an earlier action.'],
      ['The team will rest after they ___ the rubbish.', 'collect', 'will collect', 'collected tomorrow', 'collecting', 'Use present simple after after in a future clause.'],
      ['We should stay inside until the storm ___.', 'passes', 'will pass', 'passing', 'passed tomorrow', 'Use present simple after until.'],
      ['As soon as Hoa ___, we will start the meeting.', 'arrives', 'will arrive', 'arrive', 'arriving', 'The time clause takes present simple.'],
      ['Choose the correct sentence.', 'When the river is safe, we will begin the survey.', 'When the river will be safe, we begin the survey.', 'When the river safe, we will begin the survey.', 'When the river is safe, we will to begin the survey.', 'Use present simple after when and will in the main clause.'],
    ],
    reading: { title: 'The Dark-Beach Evening', passage: 'During turtle nesting season, a youth group visits the beach every Friday. Before the sun sets, students collect plastic and place low red markers around nests. Nearby cafés switch off bright signs after closing. When baby turtles appear, volunteers keep visitors at a safe distance and record the route to the sea. The project protects the animals while allowing residents to learn about them.', subject: 'student volunteers and nearby cafés', action: 'reduce light and rubbish during turtle season', detail: 'Students place low red markers around nests.', result: 'Young turtles have a safer route to the sea.', falseDetail: 'Volunteers shine bright white lights directly at every nest.' },
    writing: [
      { prompt: 'Rearrange the words to make a time-clause sentence.', answer: 'We will clean the beach before the visitors arrive', template: 'we / clean / beach / before / visitors / arrive → [[0]]', explanation: 'Use will in the main clause and present simple after before.' },
      { prompt: 'Write the correct verb form.', answer: 'ends', template: 'We will check the nests after the rain [[0]] (end).', explanation: 'Use present simple in the time clause.' },
      { prompt: 'Rewrite using “as soon as”.', answer: 'As soon as the tide falls, the team will begin', template: 'The tide will fall. Then the team will begin immediately. → [[0]]', explanation: 'Use present simple after as soon as.', givenWord: 'AS SOON AS' },
      { prompt: 'Complete the sentence from the cues.', answer: 'Volunteers will wait until the young turtles reach the sea', template: 'volunteers / wait / until / young turtles / reach / sea → [[0]]', explanation: 'Use will wait and present simple after until.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'After the event finishes, we will sort the equipment.', 'After the event will finish, we sort the equipment.', 'After the event finish, we will sort the equipment.', 'After the event finishes, we will to sort the equipment.', 'A future time clause uses present simple.'],
  },
  {
    grade: 8, unit: 8, title: 'Shopping',
    pronunciationExtra: ['Which word begins with /st/?', 'store', 'sport', 'speak', 'spend', '“Store” begins with /st/.'],
    grammar: [
      ['Our family ___ checks prices before buying electronics.', 'usually', 'tomorrow', 'last', 'yet', 'Usually is an adverb of frequency.'],
      ['The market is ___ crowded on weekday mornings.', 'rarely', 'next', 'ago', 'soon yesterday', 'Rarely correctly expresses low frequency.'],
      ['Lan ___ pays in cash because she uses a bank card.', 'seldom', 'every tomorrow', 'lastly', 'at now', 'Seldom goes before the main verb.'],
      ['The bookshop ___ at nine tomorrow.', 'opens', 'will opens', 'is open yesterday', 'opening', 'Present simple can express a fixed schedule.'],
      ['The sale ___ on Friday and ends on Sunday.', 'starts', 'will starts', 'start', 'is start', 'A scheduled event uses present simple.'],
      ['Choose the correct sentence.', 'The train leaves at 8:15 tomorrow morning.', 'The train will leaves at 8:15 tomorrow morning.', 'The train leave at 8:15 tomorrow morning.', 'The train leaving at 8:15 tomorrow morning.', 'Use present simple for a timetable.'],
    ],
    reading: { title: 'The Repair Receipt', passage: 'A small electronics shop gives customers two receipts: one for payment and one showing how long spare parts should remain available. If a device breaks, staff first check whether repair is possible. Customers receive a clear price before deciding. The shop rarely replaces an item that can be fixed safely. This policy has reduced waste and helped buyers compare the true cost of cheap products.', subject: 'an electronics shop and its customers', action: 'offer clear repair information before replacement', detail: 'Customers receive a repair price before deciding.', result: 'Buyers make better choices and fewer devices become waste.', falseDetail: 'The shop automatically throws away every broken device.' },
    writing: [
      { prompt: 'Rearrange the words to make a sentence.', answer: 'The shop usually opens at nine', template: 'shop / usually / open / nine → [[0]]', explanation: 'Put usually before the main verb.' },
      { prompt: 'Write the correct scheduled form.', answer: 'starts', template: 'The weekend sale [[0]] (start) at 8 a.m. tomorrow.', explanation: 'Use present simple for a fixed schedule.' },
      { prompt: 'Rewrite using “rarely”.', answer: 'We rarely buy things without comparing prices', template: 'We almost never buy things without comparing prices. → [[0]]', explanation: 'Rarely goes before the main verb.', givenWord: 'RARELY' },
      { prompt: 'Complete the sentence from the cues.', answer: 'The bus to the shopping centre leaves every thirty minutes', template: 'bus / shopping centre / leave / every thirty minutes → [[0]]', explanation: 'Use present simple for a timetable.' },
    ],
    lookingBack: ['Choose the correct adverb position.', 'My parents often compare prices online.', 'My parents compare often prices online.', 'My parents compare prices often online always.', 'Often my parents compare prices online do.', 'An adverb of frequency normally goes before the main verb.'],
  },
  {
    grade: 8, unit: 9, title: 'Natural disasters',
    pronunciationExtra: ['Which word is stressed on the second syllable?', 'delicious', 'natural', 'dangerous', 'musical', '“Delicious” is stressed on the second syllable.'],
    grammar: [
      ['At 7 p.m., the rescue team ___ the road.', 'was checking', 'checks', 'has checked', 'is checking yesterday', 'Use past continuous for an action in progress at a past time.'],
      ['Students ___ under their desks when the alarm sounded.', 'were waiting', 'wait', 'have waited', 'are waiting', 'The longer past action uses past continuous.'],
      ['While we were packing, the electricity ___.', 'went out', 'was go out', 'goes out yesterday', 'has gone out now', 'The shorter interrupting action uses past simple.'],
      ['What ___ you ___ when the warning arrived?', 'were / doing', 'did / doing', 'are / do', 'have / done', 'Form the question with were + subject + V-ing.'],
      ['The wind ___ strongly all night.', 'was blowing', 'is blowing yesterday', 'blows at 9 last night', 'has blow', 'Past continuous describes the ongoing past weather.'],
      ['Choose the correct sentence.', 'They were crossing the bridge when it began to shake.', 'They crossed the bridge when it was begin to shake.', 'They were cross the bridge when it began shaking.', 'They are crossing the bridge yesterday.', 'Use past continuous for the ongoing action and past simple for the interruption.'],
    ],
    reading: { title: 'The Hill-Route Drill', passage: 'A riverside school practises a flood drill twice a year. When the latest drill began, students were studying in their classrooms. Teachers led each group along a marked route to higher ground while two staff members checked every room. Students carried only their emergency cards, not school bags. The whole school reached the safe area calmly in seven minutes.', subject: 'students and staff at a riverside school', action: 'practise moving to higher ground during a flood drill', detail: 'Two staff members checked every room.', result: 'The whole school reaches the safe area calmly in seven minutes.', falseDetail: 'Students stopped to collect all their school bags.' },
    writing: [
      { prompt: 'Rearrange the words to make a past-continuous sentence.', answer: 'We were having dinner when the warning arrived', template: 'we / have dinner / when / warning / arrive → [[0]]', explanation: 'Use were having for the action in progress.' },
      { prompt: 'Write the correct verb form.', answer: 'was raining', template: 'At midnight, it [[0]] (rain) heavily.', explanation: 'Use past continuous at a specific past time.' },
      { prompt: 'Rewrite using “while”.', answer: 'While the students were waiting, the teacher checked the list', template: 'The students were waiting. The teacher checked the list then. → [[0]]', explanation: 'While introduces the longer past action.', givenWord: 'WHILE' },
      { prompt: 'Complete the sentence from the cues.', answer: 'The lights went out while we were listening to the radio', template: 'lights / go out / while / we / listen / radio → [[0]]', explanation: 'Use past simple for the interruption and past continuous after while.' },
    ],
    lookingBack: ['Choose the correct question.', 'What were they doing when the ground shook?', 'What did they doing when the ground shook?', 'What were they do when the ground shook?', 'What are they doing when the ground shook?', 'Past-continuous questions use were + subject + V-ing.'],
  },
  {
    grade: 8, unit: 10, title: 'Communication in the future',
    pronunciationExtra: ['Which word is stressed on the first syllable?', 'cinema', 'Japanese', 'employee', 'volunteer', '“Cinema” is stressed on the first syllable.'],
    grammar: [
      ['The online meeting starts ___ 8 p.m.', 'at', 'on', 'in', 'for', 'Use at with a clock time.'],
      ['We will meet ___ Monday morning.', 'on', 'at', 'in', 'by inside', 'Use on with a day and part of the day.'],
      ['The new app will be released ___ June.', 'in', 'on', 'at', 'from', 'Use in with a month.'],
      ['This headset belongs to me. It is ___.', 'mine', 'my', 'me', 'I', 'Mine is a possessive pronoun.'],
      ['Their screen is larger than ___.', 'ours', 'our', 'us', 'we', 'Ours replaces our screen.'],
      ['Choose the correct sentence.', 'The blue device is hers, and the black one is mine.', 'The blue device is her, and the black one is my.', 'The blue device is hers, and the black one is me.', 'The blue device is she, and the black one is mine.', 'Hers and mine are possessive pronouns.'],
    ],
    reading: { title: 'Captions for Three Classrooms', passage: 'Students in three countries meet online once a month to discuss local projects. Because they have different accents, they use live captions and type key terms on a shared board. Each group sends questions two days before the meeting. The technology is useful, but students still take turns and ask for clarification politely. Teachers say the project improves patience as much as speaking skill.', subject: 'students and teachers in three countries', action: 'communicate online using captions and shared notes', detail: 'Groups send questions two days before each meeting.', result: 'Students improve both patience and communication skills.', falseDetail: 'The technology removes the need to listen or take turns.' },
    writing: [
      { prompt: 'Complete the sentence with the correct preposition.', answer: 'at', template: 'The video conference begins [[0]] 7:30.', explanation: 'Use at with a clock time.' },
      { prompt: 'Write the correct possessive pronoun.', answer: 'yours', template: 'My camera is old, but [[0]] is new.', explanation: 'Yours replaces your camera.' },
      { prompt: 'Rewrite using a possessive pronoun.', answer: 'The tablet on the desk is hers', template: 'The tablet on the desk belongs to Lan. → [[0]]', explanation: 'Hers replaces Lan’s tablet.', givenWord: 'HERS' },
      { prompt: 'Complete the sentence from the cues.', answer: 'Our online class meets on Thursday evening', template: 'our online class / meet / Thursday evening → [[0]]', explanation: 'Use on with a day and part of the day.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'The meeting is in May, but the first session is on Monday.', 'The meeting is on May, but the first session is at Monday.', 'The meeting is at May, but the first session is in Monday.', 'The meeting is May in, but the first session Monday on.', 'Use in with months and on with days.'],
  },
  {
    grade: 8, unit: 11, title: 'Science and technology',
    pronunciationExtra: ['Which word begins with /ʃ/?', 'ship', 'science', 'see', 'sun', '“Ship” begins with /ʃ/.'],
    grammar: [
      ['Lan said, “I can repair the robot.” Lan said that she ___ repair it.', 'could', 'can now', 'will', 'is', 'Can normally changes to could in reported speech.'],
      ['Minh said, “I am testing the sensor.” Minh said that he ___ the sensor.', 'was testing', 'is testing', 'tests tomorrow', 'has test', 'Present continuous normally changes to past continuous.'],
      ['The inventor said, “We will improve the case.” He said they ___ improve it.', 'would', 'will', 'can', 'are', 'Will normally changes to would.'],
      ['Hoa said, “My model works well.” Hoa said that her model ___ well.', 'worked', 'works now only', 'will work', 'is work', 'Present simple normally shifts to past simple.'],
      ['Nam said, “I have finished the experiment.” Nam said he ___ it.', 'had finished', 'has finished', 'finishes', 'is finishing', 'Present perfect normally shifts to past perfect.'],
      ['Choose the correct reported sentence.', 'Mai said that she was using the new app.', 'Mai said that I am using the new app.', 'Mai said she is use the new app.', 'Mai says yesterday that she was use the app.', 'Reported speech requires suitable pronoun and tense changes.'],
    ],
    reading: { title: 'The Thirsty-Plant Sensor', passage: 'Four pupils built a soil sensor for the school garden. It sends a green signal when the soil is wet and an orange one when plants need water. During testing, rain entered the first case and damaged a wire. The pupils redesigned the cover using a reused plastic container. The gardening club now checks the signal before watering, so it uses less water.', subject: 'four pupil inventors and the gardening club', action: 'design and improve a soil-moisture sensor', detail: 'Rain damaged a wire in the first case.', result: 'The gardening club avoids unnecessary watering.', falseDetail: 'The first sensor case remained completely waterproof.' },
    writing: [
      { prompt: 'Change the sentence into reported speech.', answer: 'Lan said that she could fix the device', template: 'Lan said, “I can fix the device.” → [[0]]', explanation: 'Change I to she and can to could.' },
      { prompt: 'Write the correct reported form.', answer: 'was testing', template: 'Minh said that he [[0]] (test) the robot then.', explanation: 'Backshift present continuous to past continuous.' },
      { prompt: 'Rewrite using reported speech.', answer: 'The students said that they would improve the model', template: 'The students said, “We will improve the model.” → [[0]]', explanation: 'Change we to they and will to would.', givenWord: 'WOULD' },
      { prompt: 'Complete the sentence from the cues.', answer: 'The inventor explained that the sensor worked automatically', template: 'inventor / explain / sensor / work / automatically → [[0]]', explanation: 'Use past simple in the reported clause.' },
    ],
    lookingBack: ['Choose the correct backshift.', 'She said that she had completed the experiment.', 'She said that she has completed the experiment yesterday.', 'She said that she complete the experiment.', 'She said that she is completing it before.', 'Present perfect normally backshifts to past perfect.'],
  },
  {
    grade: 8, unit: 12, title: 'Life on other planets',
    pronunciationExtra: ['Which word begins with /θ/?', 'think', 'ten', 'time', 'team', '“Think” begins with /θ/.'],
    grammar: [
      ['He asked, “Is Mars cold?” He asked ___ Mars was cold.', 'whether', 'what', 'that question', 'did', 'Reported yes/no questions use if or whether.'],
      ['Lan asked, “Where does the rover land?” Lan asked where the rover ___.', 'landed', 'did land', 'lands now', 'was land', 'Use statement word order and backshift the verb.'],
      ['The scientist asked, “Can plants grow there?” She asked if plants ___ there.', 'could grow', 'can grew', 'did can grow', 'could grew', 'Change can to could and keep statement order.'],
      ['Nam asked, “When will the mission begin?” Nam asked when the mission ___.', 'would begin', 'will began', 'did begin will', 'would began', 'Change will to would.'],
      ['They asked, “Are you an astronaut?” They asked me if I ___ an astronaut.', 'was', 'am now', 'were be', 'did', 'Use if and statement word order.'],
      ['Choose the correct reported question.', 'She asked how the spacecraft worked.', 'She asked how did the spacecraft work.', 'She asked how the spacecraft did worked.', 'She asked how does the spacecraft work.', 'Reported questions use statement word order.'],
    ],
    reading: { title: 'The Tiny Space Greenhouse', passage: 'A science club built a sealed greenhouse to test how herbs might grow during a space journey. LED lights provide energy, and a small system collects water from the air. Students weigh each plant twice a week and record leaf colour. The project cannot copy every condition in space, but it helps the class understand why water, light and careful measurement are essential.', subject: 'a science club and its greenhouse project', action: 'test plant growth in a closed model space system', detail: 'Students weigh the plants twice a week.', result: 'The class understands the needs of plants in limited conditions.', falseDetail: 'The model perfectly recreates every condition in outer space.' },
    writing: [
      { prompt: 'Change the question into reported speech.', answer: 'He asked whether the planet had water', template: 'He asked, “Does the planet have water?” → [[0]]', explanation: 'Use whether and statement word order.' },
      { prompt: 'Write the correct reported form.', answer: 'could survive', template: 'The student asked if plants [[0]] (can survive) there.', explanation: 'Backshift can to could.' },
      { prompt: 'Rewrite as a reported Wh-question.', answer: 'Lan asked where the rover would land', template: 'Lan asked, “Where will the rover land?” → [[0]]', explanation: 'Keep where, change will to would and use statement order.', givenWord: 'WHERE' },
      { prompt: 'Complete the sentence from the cues.', answer: 'The teacher asked how astronauts reused water', template: 'teacher / ask / how / astronauts / reuse / water → [[0]]', explanation: 'Use statement word order after how.' },
    ],
    lookingBack: ['Choose the correct reported question.', 'They asked whether the spacecraft was ready.', 'They asked whether was the spacecraft ready.', 'They asked did the spacecraft was ready.', 'They asked whether the spacecraft is ready yesterday.', 'Use whether + subject + verb.'],
  },
];

const grade9Specs: UnitSpec[] = [
  {
    grade: 9, unit: 2, title: 'City Life',
    pronunciationExtra: ['Which word contains the /əʊ/ sound?', 'road', 'town', 'crowd', 'house', '“Road” contains /əʊ/.'],
    grammar: [
      ['The more reliable the metro is, the ___ people will drive.', 'fewer', 'less', 'few', 'least', 'Use fewer with the countable plural noun people.'],
      ['The ___ the rent becomes, the harder it is to live downtown.', 'higher', 'more high', 'highest', 'high', 'The comparative form of high is higher.'],
      ['The more crowded the road is, the ___ buses move.', 'more slowly', 'slowlier', 'most slowly', 'more slow', 'Use more slowly to compare how buses move.'],
      ['We usually get ___ the city by bus and metro.', 'around', 'out of', 'down on', 'up with', 'Get around means travel within a place.'],
      ['The neighbourhood has run ___ parking spaces.', 'out of', 'around', 'into', 'up with', 'Run out of means have none left.'],
      ['Residents want the city to cut down ___ traffic noise.', 'on', 'at', 'with', 'for', 'The phrasal verb is cut down on.'],
    ],
    reading: { title: 'The Walking-School Map', passage: 'Students at a crowded city school designed a walking map for nearby families. They marked quiet streets, safe crossings and places with shade. Before publishing it, they walked every route with parents and reported two broken traffic lights to the council. More families now walk at least twice a week. The streets have not become empty, but the school gate is less congested in the morning.', subject: 'students and families at a city school', action: 'create and test safer walking routes to school', detail: 'Students reported two broken traffic lights.', result: 'The school gate is less congested in the morning.', falseDetail: 'The students chose routes without checking them.' },
    writing: [
      { prompt: 'Rearrange the words to make a double comparative.', answer: 'The safer the pavement is, the more people will walk', template: 'safer / pavement / more people / walk / the / the → [[0]]', explanation: 'Use the + comparative, the + comparative.' },
      { prompt: 'Complete the phrasal verb.', answer: 'around', template: 'Visitors can get [[0]] the city easily by metro.', explanation: 'Get around means travel from place to place.' },
      { prompt: 'Rewrite using the given phrase.', answer: 'We have run out of clean water', template: 'We have no clean water left. → [[0]]', explanation: 'Run out of means use all of something.', givenWord: 'RUN OUT OF' },
      { prompt: 'Write a complete sentence from the cues.', answer: 'The more liveable a city is, the more attractive it becomes', template: 'more liveable / city / more attractive / become → [[0]]', explanation: 'Use the double-comparative pattern.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'The less traffic there is, the cleaner the air becomes.', 'The fewer traffic there is, the cleaner the air becomes.', 'Less traffic there is, cleaner the air becomes.', 'The least traffic, the more clean air.', 'Traffic is uncountable, so use less.'],
  },
  {
    grade: 9, unit: 3, title: 'Healthy Living for Teens',
    pronunciationExtra: ['Which word begins with /r/?', 'ready', 'healthy', 'habit', 'homework', '“Ready” begins with /r/.'],
    grammar: [
      ['If you feel overwhelmed, you ___ speak to a trusted adult.', 'should', 'should to', 'will to', 'are', 'Should + base verb gives advice.'],
      ['If Minh ___ enough sleep, he may lose concentration.', 'does not get', 'will not get', 'not gets', 'did not get', 'Use the present simple in the if-clause.'],
      ['You ___ take a short break if the headache continues.', 'can', 'can to', 'will can', 'are can', 'Can is followed by the base verb.'],
      ['If the deadline is today, we ___ finish the essential part first.', 'must', 'must to', 'will must to', 'are must', 'Must expresses necessity and takes a base verb.'],
      ['If Lan makes a realistic plan, she ___ feel calmer.', 'may', 'may to', 'is may', 'has may', 'May + base verb expresses possibility.'],
      ['You might sleep better if you ___ screens before bed.', 'avoid', 'will avoid', 'avoided will', 'are avoid', 'Use present simple after if.'],
    ],
    reading: { title: 'The Twenty-Minute Reset', passage: 'Khoa used to study for three hours without a break and often remembered very little. His school counsellor suggested a twenty-minute reset: after forty minutes of focused work, he drinks water, stretches and looks away from the screen. He also writes only three priorities for each evening. After two weeks, Khoa still has homework, but he feels less overwhelmed and usually finishes the most important tasks first.', subject: 'Khoa and his school counsellor', action: 'use short breaks and clear priorities to study better', detail: 'Khoa writes three priorities for each evening.', result: 'He feels less overwhelmed and completes important work first.', falseDetail: 'Khoa now studies continuously without any break.' },
    writing: [
      { prompt: 'Rearrange the words to make a conditional sentence.', answer: 'If you feel stressed, you should take a short break', template: 'if / feel stressed / you / should / take / short break → [[0]]', explanation: 'Use present simple after if and should + base verb.' },
      { prompt: 'Write the correct verb form.', answer: 'gets', template: 'If Mai [[0]] (get) enough sleep, she can concentrate better.', explanation: 'Mai is singular, so present simple uses gets.' },
      { prompt: 'Rewrite as advice using “should”.', answer: 'You should talk to the school counsellor', template: 'It is a good idea for you to talk to the school counsellor. → [[0]]', explanation: 'Use should + base verb.', givenWord: 'SHOULD' },
      { prompt: 'Complete the sentence from the cues.', answer: 'If teenagers manage their time, they may feel more confident', template: 'if / teenagers / manage time / may / feel / confident → [[0]]', explanation: 'Use the first conditional with may.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'If your friend seems upset, you should listen carefully.', 'If your friend will seem upset, you should listen carefully.', 'If your friend seems upset, you should to listen carefully.', 'If your friend seem upset, you should listens carefully.', 'Use present simple in the if-clause and should + base verb.'],
  },
  {
    grade: 9, unit: 4, title: 'Remembering the Past',
    pronunciationExtra: ['Which word begins with /l/?', 'landscape', 'memory', 'museum', 'moment', '“Landscape” begins with /l/.'],
    grammar: [
      ['At nine last night, Grandma ___ us an old family story.', 'was telling', 'tells', 'has told', 'is telling', 'Use past continuous for an action in progress at a past time.'],
      ['We ___ through the old quarter when it began to rain.', 'were walking', 'walk', 'have walked', 'are walking', 'The longer action uses past continuous.'],
      ['While my parents were cooking, I ___ the photo album.', 'was arranging', 'am arranging', 'have arranged', 'arrange', 'Two simultaneous past actions can use past continuous.'],
      ['I wish our town ___ more traditional houses.', 'had', 'has', 'will have', 'is having', 'Wish about the present uses past simple.'],
      ['Lan wishes she ___ more about her ancestors.', 'knew', 'knows', 'will know', 'has known', 'Use knew after wish for a present unreal situation.'],
      ['We wish the museum ___ closer to the bus station.', 'were', 'is', 'will be', 'has been', 'Were is standard after wish in formal usage.'],
    ],
    reading: { title: 'Voices from the Old Cinema', passage: 'A youth club is collecting memories of a cinema that closed twenty years ago. While older residents are describing weekend shows, students scan tickets and photographs. One woman remembers selling snacks there when she was sixteen. The club will place short audio stories beside the objects in a local exhibition. The building cannot be reopened, but the project preserves the experiences connected with it.', subject: 'a youth club and older residents', action: 'record memories and objects from an old cinema', detail: 'Students scan tickets and photographs.', result: 'The project preserves experiences linked to the old building.', falseDetail: 'The cinema is being reopened as a modern shopping centre.' },
    writing: [
      { prompt: 'Rearrange the words to make a past-continuous sentence.', answer: 'We were visiting the temple when the rain started', template: 'we / visit / temple / when / rain / start → [[0]]', explanation: 'Use were visiting for the longer action.' },
      { prompt: 'Write the correct verb form.', answer: 'was interviewing', template: 'At 10 a.m. yesterday, Hoa [[0]] (interview) her grandmother.', explanation: 'A specific past time calls for past continuous.' },
      { prompt: 'Rewrite using “wish”.', answer: 'I wish our village had an old communal house', template: 'Our village does not have an old communal house. → [[0]]', explanation: 'Use wish + past simple for a present regret.', givenWord: 'WISH' },
      { prompt: 'Complete the sentence from the cues.', answer: 'While students were recording, the elders were looking at old photos', template: 'while / students / record / elders / look at / old photos → [[0]]', explanation: 'Use past continuous for simultaneous past actions.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'I wish people preserved more historic buildings.', 'I wish people preserve more historic buildings.', 'I wish people will preserve more historic buildings.', 'I wish people are preserving more historic buildings.', 'Wish about the present uses past simple.'],
  },
  {
    grade: 9, unit: 5, title: 'Our Experiences',
    pronunciationExtra: ['Which word begins with /w/?', 'water', 'yellow', 'young', 'yes', '“Water” begins with /w/.'],
    grammar: [
      ['Mai ___ an eco-tour twice.', 'has taken', 'took yesterday', 'is taking now', 'takes last year', 'Unspecified life experience uses present perfect.'],
      ['___ you ever ___ in front of a large audience?', 'Have / performed', 'Did / performed', 'Has / perform', 'Are / performed', 'Use Have + subject + ever + past participle.'],
      ['I have never ___ in a tent before.', 'slept', 'sleep', 'sleeping', 'sleeps', 'After have never, use the past participle.'],
      ['Nam has finished the safety course ___.', 'already', 'last Sunday', 'ago', 'in 2022', 'Already commonly appears with present perfect.'],
      ['We have not tried snorkelling ___.', 'yet', 'yesterday', 'ago', 'last week', 'Yet is used at the end of a negative present-perfect sentence.'],
      ['My sister ___ Da Lat in 2024.', 'visited', 'has visited', 'visits ever', 'has visit', 'A finished past time requires past simple.'],
    ],
    reading: { title: 'The First Night Walk', passage: 'During a school camp, Phuong joined a guided night walk for the first time. She had been nervous about the dark, but the guide gave every student a small red torch and explained how to move quietly. The group heard frogs, found animal tracks and watched clouds move across the moon. Phuong has kept a leaf sketch from the trip because it reminds her that unfamiliar experiences can become enjoyable.', subject: 'Phuong and her school camp group', action: 'take part in a carefully guided night walk', detail: 'Each student received a small red torch.', result: 'Phuong becomes more confident about unfamiliar experiences.', falseDetail: 'Phuong walked alone without a guide or equipment.' },
    writing: [
      { prompt: 'Rearrange the words to make a present-perfect sentence.', answer: 'I have never tried snorkelling before', template: 'I / never / try / snorkelling / before → [[0]]', explanation: 'Use have never + past participle.' },
      { prompt: 'Write the past participle.', answer: 'ridden', template: 'Have you ever [[0]] (ride) a horse?', explanation: 'Ride–rode–ridden.' },
      { prompt: 'Rewrite using the present perfect.', answer: 'This is the most exciting trip I have ever taken', template: 'I have never taken a more exciting trip. → [[0]]', explanation: 'A superlative experience commonly uses present perfect.', givenWord: 'EVER' },
      { prompt: 'Complete the sentence from the cues.', answer: 'We have already put up the tent near the lake', template: 'we / already / put up / tent / near lake → [[0]]', explanation: 'Use have already + past participle.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'Lan has not returned from the camp yet.', 'Lan did not returned from the camp yet.', 'Lan has not return from the camp yet.', 'Lan not has returned from the camp yet.', 'Use has not + past participle + yet.'],
  },
  {
    grade: 9, unit: 6, title: 'Vietnamese Lifestyles: Then and Now',
    pronunciationExtra: ['Which word begins with /fr/?', 'fresh', 'flower', 'floor', 'flight', '“Fresh” begins with /fr/.'],
    grammar: [
      ['We decided ___ our grandparents about school in the past.', 'to interview', 'interviewing', 'interviewed', 'interview', 'Decide is followed by to-infinitive.'],
      ['My sister enjoys ___ about traditional recipes.', 'learning', 'to learning', 'learned', 'learn', 'Enjoy is followed by V-ing.'],
      ['Lan promised ___ the old photographs safely.', 'to keep', 'keeping', 'kept', 'keep', 'Promise is followed by to-infinitive.'],
      ['Would you mind ___ your phone during dinner?', 'not using', 'not to use', 'do not use', 'not used', 'Mind is followed by V-ing; put not before the gerund.'],
      ['The class plans ___ a display about changing lifestyles.', 'to create', 'creating', 'created', 'create', 'Plan is followed by to-infinitive.'],
      ['We should avoid ___ every online story.', 'believing', 'to believe', 'believed', 'believe', 'Avoid is followed by V-ing.'],
    ],
    reading: { title: 'A Recipe Across Three Generations', passage: 'For a history project, Ngan recorded her grandmother making a traditional soup. Her mother measured the ingredients, while Ngan wrote the steps in both a notebook and a shared family file. Grandmother preferred explaining the recipe face to face, but she agreed to use the video so relatives abroad could learn it. The family did not replace the old method; they used technology to help pass it on.', subject: 'Ngan, her mother and grandmother', action: 'record and share a traditional family recipe', detail: 'Ngan saved the steps in a notebook and a digital file.', result: 'Technology helps the family pass the recipe to relatives.', falseDetail: 'The family throws away the traditional method completely.' },
    writing: [
      { prompt: 'Rearrange the words to make a complete sentence.', answer: 'We decided to interview our grandparents', template: 'we / decide / interview / grandparents → [[0]]', explanation: 'Decide is followed by to-infinitive.' },
      { prompt: 'Write the correct verb form.', answer: 'sharing', template: 'My grandmother enjoys [[0]] (share) family stories.', explanation: 'Enjoy takes V-ing.' },
      { prompt: 'Rewrite using the given verb.', answer: 'Lan suggested visiting the history museum', template: 'Lan said, “Why don’t we visit the history museum?” → [[0]]', explanation: 'Suggest is followed by V-ing.', givenWord: 'SUGGESTED' },
      { prompt: 'Complete the sentence from the cues.', answer: 'Young people can learn to use technology without forgetting family values', template: 'young people / learn / use technology / without / forget / family values → [[0]]', explanation: 'Use learn to V and without V-ing.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'The students agreed to share their findings.', 'The students agreed sharing their findings.', 'The students agreed share their findings.', 'The students agreed to sharing their findings.', 'Agree is followed by to-infinitive.'],
  },
];

const grade10Specs: UnitSpec[] = [
  {
    grade: 10, unit: 2, title: 'Humans and the Environment',
    pronunciationExtra: ['Which word begins with /pl/?', 'plant', 'clean', 'green', 'protect', '“Plant” begins with /pl/.'],
    grammar: [
      ['Look at the dark smoke. The air ___ worse.', 'is going to get', 'will getting', 'gets yesterday', 'is get', 'Be going to fits a prediction based on visible evidence.'],
      ['I forgot my bottle. I ___ a reusable one now.', 'will buy', 'am going buy', 'bought tomorrow', 'buying', 'Will can express a decision made at the moment.'],
      ['The school ___ solar panels next month; the plan is approved.', 'is going to install', 'will installing', 'installed now', 'install', 'Be going to expresses an existing plan.'],
      ['Plastic bottles ___ in the blue bin.', 'are collected', 'collect', 'is collected', 'are collecting by', 'Use present passive: are + past participle.'],
      ['A new community garden ___ last weekend.', 'was opened', 'opened itself', 'is opening yesterday', 'were opened', 'Use past passive: was + past participle.'],
      ['Choose the correct passive sentence.', 'Trees will be planted beside the road.', 'Trees will planted beside the road.', 'Trees will be plant beside the road.', 'Trees are will be planted beside the road.', 'Future passive is will be + past participle.'],
    ],
    reading: { title: 'The Library Energy Board', passage: 'A town library installed a simple screen that shows how much electricity the building is using. When consumption rises, a yellow symbol appears and staff check lights, fans and computers. Students also compare weekly figures during science club. In three months, electricity use fell by twelve percent. The screen did not save energy by itself; it made daily choices visible and encouraged people to change them.', subject: 'library staff and student science-club members', action: 'monitor electricity use and adjust daily habits', detail: 'A yellow symbol appears when consumption rises.', result: 'The library reduces its electricity use by twelve percent.', falseDetail: 'The screen saves energy without any human action.' },
    writing: [
      { prompt: 'Rearrange the words to make a passive sentence.', answer: 'Paper is collected in every classroom', template: 'paper / collect / every classroom → [[0]]', explanation: 'Use is + past participle.' },
      { prompt: 'Write the correct future form.', answer: 'is going to organise', template: 'Our class [[0]] (organise) a clean-up; the plan is ready.', explanation: 'Use be going to for a prior plan.' },
      { prompt: 'Rewrite in the passive voice.', answer: 'A new recycling point will be opened next week', template: 'The school will open a new recycling point next week. → [[0]]', explanation: 'Use will be + past participle.', givenWord: 'OPENED' },
      { prompt: 'Complete the sentence from the cues.', answer: 'If we reduce waste, our carbon footprint will become smaller', template: 'if / reduce waste / carbon footprint / become / smaller → [[0]]', explanation: 'Use a clear cause-and-result sentence.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'Food waste is turned into compost here.', 'Food waste turns into compost by workers here.', 'Food waste is turn into compost here.', 'Food waste are turned into compost here.', 'The singular subject takes is turned.'],
  },
  {
    grade: 10, unit: 3, title: 'Music',
    pronunciationExtra: ['Which two-syllable word is stressed on the second syllable?', 'perform', 'music', 'singer', 'concert', 'The verb “perform” is stressed on the second syllable.'],
    grammar: [
      ['The melody is simple, ___ it is extremely moving.', 'but', 'so', 'or', 'because of', 'But links contrasting independent clauses.'],
      ['The hall was full, ___ the organisers added another show.', 'so', 'but', 'or', 'yet', 'The second clause is a result.'],
      ['You can stream the concert, ___ you can watch it on television.', 'or', 'so', 'but', 'therefore', 'Or presents alternatives.'],
      ['The singer hopes ___ at the school festival.', 'to perform', 'performing to', 'performed', 'perform', 'Hope is followed by to-infinitive.'],
      ['The rhythm made everyone ___.', 'dance', 'to dance', 'dancing', 'danced', 'Make + object is followed by a bare infinitive.'],
      ['Our teacher let us ___ a song for the final show.', 'choose', 'to choose', 'choosing', 'chose', 'Let + object takes a bare infinitive.'],
    ],
    reading: { title: 'The Corridor Concert', passage: 'A group of music students noticed that many patients at a local clinic waited in silence. With permission, they began giving a fifteen-minute acoustic concert in the wide entrance corridor every second Friday. The musicians choose gentle pieces and keep the volume low. Patients may listen or move to a quieter room. Nurses report that the concerts make the waiting area feel friendlier without interrupting medical work.', subject: 'music students, patients and clinic staff', action: 'hold short, quiet concerts in a clinic corridor', detail: 'Patients can move to a quieter room if they prefer.', result: 'The waiting area feels friendlier without disrupting the clinic.', falseDetail: 'The musicians play loudly inside treatment rooms.' },
    writing: [
      { prompt: 'Rearrange the words to make a compound sentence.', answer: 'The song is quiet, but it has a powerful message', template: 'song / quiet / but / powerful message / have → [[0]]', explanation: 'Use but to show contrast.' },
      { prompt: 'Write the correct verb form.', answer: 'to perform', template: 'The band hopes [[0]] (perform) at the festival.', explanation: 'Hope is followed by to-infinitive.' },
      { prompt: 'Rewrite using the given verb.', answer: 'The rhythm made us dance', template: 'Because of the rhythm, we started dancing. → [[0]]', explanation: 'Make + object + bare infinitive.', givenWord: 'MADE' },
      { prompt: 'Complete the sentence from the cues.', answer: 'We wanted to stay, so we bought tickets for the second show', template: 'we / want / stay / so / buy / tickets / second show → [[0]]', explanation: 'Use so to introduce the result.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'She decided to record the song, and her friend agreed to help.', 'She decided recording the song, and her friend agreed helping.', 'She decided to recording the song, and her friend agreed help.', 'She decide to record the song, and her friend agrees helped.', 'Decide and agree are followed by to-infinitive.'],
  },
  {
    grade: 10, unit: 4, title: 'For a Better Community',
    pronunciationExtra: ['Which word is stressed on the final syllable?', 'volunteer', 'charity', 'helpful', 'benefit', '“Volunteer” is stressed on the final syllable.'],
    grammar: [
      ['The clean-up was tiring but very ___.', 'rewarding', 'rewarded', 'reward', 'rewards', 'An -ing adjective describes the quality of the activity.'],
      ['The children felt ___ by the volunteers’ visit.', 'encouraged', 'encouraging', 'encourage', 'encouragement', 'An -ed adjective describes how people feel.'],
      ['This map is extremely ___ for new volunteers.', 'helpful', 'helpless', 'helping', 'helped', 'Helpful means useful or giving help.'],
      ['The programme supports ___ families.', 'homeless', 'homeful', 'homing', 'homed', 'Homeless means without a home.'],
      ['While we ___ the park, it started to rain.', 'were cleaning', 'cleaned now', 'are cleaning yesterday', 'have cleaned', 'Use past continuous for the ongoing action.'],
      ['The lights went out when the students ___ dinner.', 'were serving', 'serve now', 'have served', 'are served', 'The ongoing past action uses were serving.'],
    ],
    reading: { title: 'The Borrow-a-Uniform Rail', passage: 'A secondary school created a rail of clean uniforms for students who need a temporary replacement. Families donate items that no longer fit, and volunteers check, wash and label them. Students borrow clothes privately through the school office and return them when possible. The project reduces waste and prevents a missing shirt from keeping anyone out of class.', subject: 'school families, volunteers and students', action: 'donate and lend clean school uniforms', detail: 'Volunteers wash and label donated clothes.', result: 'Students can attend class and fewer uniforms become waste.', falseDetail: 'Students must explain their family situation publicly.' },
    writing: [
      { prompt: 'Rearrange the words to make a complete sentence.', answer: 'The volunteers were sorting clothes when we arrived', template: 'volunteers / sort / clothes / when / we / arrive → [[0]]', explanation: 'Use past continuous for the ongoing action.' },
      { prompt: 'Choose and write the correct adjective form.', answer: 'inspired', template: 'We felt [[0]] (inspire) by the community project.', explanation: 'Use the -ed adjective for a feeling.' },
      { prompt: 'Rewrite using “while”.', answer: 'While we were planting trees, it began to rain', template: 'We were planting trees. Then it began to rain. → [[0]]', explanation: 'While introduces the longer action.', givenWord: 'WHILE' },
      { prompt: 'Complete the sentence from the cues.', answer: 'A helpful volunteer showed us how to label the boxes', template: 'helpful volunteer / show / us / how / label / boxes → [[0]]', explanation: 'Use helpful as an adjective before the noun.' },
    ],
    lookingBack: ['Choose the correct adjective.', 'The students were excited about the exciting project.', 'The students were exciting about the excited project.', 'The students were excite about the exciting project.', 'The students excited about the project exciting.', 'People feel excited; a project is exciting.'],
  },
  {
    grade: 10, unit: 5, title: 'Inventions',
    pronunciationExtra: ['Which word is stressed on the second syllable?', 'computer', 'instrument', 'camera', 'battery', '“Computer” is stressed on the second syllable.'],
    grammar: [
      ['She ___ this study app for two years.', 'has used', 'used yesterday', 'is using last year', 'uses ago', 'For two years with a continuing situation uses present perfect.'],
      ['___ you ever ___ a 3D printer?', 'Have / operated', 'Did / operated', 'Has / operate', 'Are / operated', 'Use Have + subject + ever + past participle.'],
      ['The team has not tested the new battery ___.', 'yet', 'last week', 'ago', 'yesterday', 'Yet is common in negative present-perfect sentences.'],
      ['I enjoy ___ how simple machines work.', 'learning', 'to learning', 'learned', 'learn', 'Enjoy is followed by V-ing.'],
      ['The engineers decided ___ the case.', 'to redesign', 'redesigning to', 'redesigned', 'redesign', 'Decide is followed by to-infinitive.'],
      ['Remember ___ the device before cleaning it.', 'to unplug', 'unplugging yesterday', 'unplugged', 'to unplugging', 'Remember to do means not forget a necessary action.'],
    ],
    reading: { title: 'The Quiet Classroom Timer', passage: 'Three students designed a small timer for group activities. Instead of ringing, it changes colour from green to yellow and then red. This helps classes where a loud sound may be distracting. The first model was difficult to see in sunlight, so the team added a brighter recycled display. Two teachers have tested the new version, and the students are collecting suggestions before producing another model.', subject: 'three student inventors and two teachers', action: 'design and improve a silent classroom timer', detail: 'The team added a brighter recycled display.', result: 'The timer gives a visible signal without a distracting sound.', falseDetail: 'The first model worked perfectly in every light condition.' },
    writing: [
      { prompt: 'Rearrange the words to make a present-perfect sentence.', answer: 'The students have already tested the new timer', template: 'students / already / test / new timer → [[0]]', explanation: 'Use have already + past participle.' },
      { prompt: 'Write the correct verb form.', answer: 'using', template: 'I enjoy [[0]] (use) this learning device.', explanation: 'Enjoy is followed by V-ing.' },
      { prompt: 'Rewrite using the present perfect.', answer: 'She has owned the tablet for three years', template: 'She bought the tablet three years ago and still has it. → [[0]]', explanation: 'Use present perfect with for to show duration.', givenWord: 'FOR' },
      { prompt: 'Complete the sentence from the cues.', answer: 'The inventors decided to improve the screen before testing again', template: 'inventors / decide / improve / screen / before / test again → [[0]]', explanation: 'Use decide to V and before V-ing.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'We have not received the results yet.', 'We did not received the results yet.', 'We have not receive the results yet.', 'We not have received the results yet.', 'Use have not + past participle + yet.'],
  },
  {
    grade: 10, unit: 6, title: 'Gender Equality',
    pronunciationExtra: ['Which word has stress on the second syllable?', 'equality', 'equal', 'woman', 'gender', '“Equality” is stressed on the second syllable.'],
    grammar: [
      ['Equal opportunities ___ to every student.', 'should be offered', 'should offer', 'should be offer', 'should offered', 'Modal passive is should be + past participle.'],
      ['Discrimination ___ in the workplace.', 'must be prevented', 'must prevent', 'must be prevent', 'must prevented', 'Use must be + past participle.'],
      ['Leadership training ___ by both girls and boys.', 'can be attended', 'can attend by', 'can be attend', 'can attended', 'Use can be + past participle.'],
      ['The final decision ___ next Monday.', 'will be announced', 'will announce itself', 'will be announce', 'is announce next Monday', 'Future passive is will be + past participle.'],
      ['More childcare support ___ in rural areas.', 'may be provided', 'may provide', 'may be provide', 'may provided', 'Use may be + past participle.'],
      ['Choose the correct sentence.', 'Household duties should be shared fairly.', 'Household duties should share fairly.', 'Household duties should be share fairly.', 'Household duties are should be shared fairly.', 'Modal passive uses should be + past participle.'],
    ],
    reading: { title: 'The Open Workshop Rule', passage: 'A school technology club noticed that girls often watched demonstrations but volunteered less frequently to operate the tools. The club introduced an open-workshop rule: every student chooses a role, receives the same safety training and changes roles during each project. Teachers also display work by students of different genders. After one term, participation has become more balanced and more students apply for team-leader roles.', subject: 'students and teachers in a technology club', action: 'use equal training and rotating roles in projects', detail: 'Every student changes roles during each project.', result: 'Participation and interest in leadership become more balanced.', falseDetail: 'Only boys are allowed to operate the tools.' },
    writing: [
      { prompt: 'Rearrange the words to make a modal-passive sentence.', answer: 'Every student should be given the same opportunity', template: 'every student / should / give / same opportunity → [[0]]', explanation: 'Use should be + past participle.' },
      { prompt: 'Write the correct passive form.', answer: 'must be treated', template: 'All applicants [[0]] (must / treat) fairly.', explanation: 'Modal passive: must be treated.' },
      { prompt: 'Rewrite in the passive voice.', answer: 'Leadership roles can be filled by people of any gender', template: 'People of any gender can fill leadership roles. → [[0]]', explanation: 'Use can be + past participle.', givenWord: 'FILLED' },
      { prompt: 'Complete the sentence from the cues.', answer: 'Household duties should be shared according to ability and time', template: 'household duties / should / share / according to / ability / time → [[0]]', explanation: 'Use modal passive and the phrase according to.' },
    ],
    lookingBack: ['Choose the correct sentence.', 'The results will be announced after the meeting.', 'The results will announce after the meeting.', 'The results will be announce after the meeting.', 'The results are will announced after the meeting.', 'Future passive is will be + past participle.'],
  },
];

const generated = [...grade8Specs, ...grade9Specs, ...grade10Specs].map(buildUnitExam);

export const newBookUnitExams: Record<Grade, Exam[]> = {
  8: [unit1NewBookExams[8], ...generated.filter((exam) => exam.id >= 8000 && exam.id < 9000)],
  9: [unit1NewBookExams[9], ...generated.filter((exam) => exam.id >= 9000 && exam.id < 10000)],
  10: [unit1NewBookExams[10], ...generated.filter((exam) => exam.id >= 10000 && exam.id < 11000)],
};

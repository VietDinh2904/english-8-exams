import type { Exam, Question } from './exams';

type Grade = 8 | 9 | 10;
type SkillArea = NonNullable<Question['skillArea']>;

const mcq = (
  skillArea: SkillArea,
  section: Question['section'],
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  underlines?: string[],
): Omit<Question, 'id'> => ({ section, skillArea, prompt, options, answer, explanation, underlines });

const typed = (
  skillArea: SkillArea,
  section: Question['section'],
  prompt: string,
  answer: string | string[],
  explanation: string,
  template = '[[0]]',
  acceptedAnswers?: string[][],
  givenWord?: string,
): Omit<Question, 'id'> => ({
  section,
  skillArea,
  prompt,
  options: [],
  answer,
  explanation,
  kind: 'typed',
  template,
  acceptedAnswers,
  givenWord,
  hint: 'Check the target vocabulary, grammar pattern and word order. Capital letters and final punctuation are not graded.',
});

const buildExam = (
  id: number,
  grade: Grade,
  title: string,
  theme: string,
  passageTitle: string,
  passage: string,
  items: Omit<Question, 'id'>[],
): Exam => ({
  id,
  unit: 1,
  bookLabel: 'Bộ mới',
  skipEnrichment: true,
  menuLabel: `Unit 1 · ${title} · Bộ mới`,
  menuGroup: 'unit',
  title: `English ${grade} · Unit 1: ${title} · Bộ mới`,
  theme,
  sourceNote: 'Bộ bài mới được viết nguyên bản theo mục tiêu và dạng bài của Unit 1 Global Success. Từ vựng trọng tâm được giữ; câu hỏi, ngữ cảnh, bài đọc và bài viết đều được tạo mới.',
  passageTitle,
  passage,
  questions: items.map((item, index) => ({ ...item, id: index + 1 })),
});

const grade8Passage = `Every second Saturday, Linh and three classmates meet in a quiet room at the neighbourhood library. Each person brings one screen-free activity. Linh usually carries a craft kit, while Minh prefers a strategy board game. They spend the first hour making or playing something together. After that, they exchange skills: one student may teach a paper-folding technique, and another may explain a game rule. The group still uses technology, but only to photograph finished projects and arrange the next meeting. Linh says the club helps her unwind because nobody needs to reply to messages while an activity is in progress. The librarian has noticed that the students now borrow more hobby books than before.`;

const grade8 = buildExam(801, 8, 'Leisure time', 'Pronunciation · Vocabulary · Grammar · Reading · Writing · Looking Back', 'The Saturday Hobby Table', grade8Passage, [
  mcq('Pronunciation', 'Language Focus', 'Choose the word whose underlined part has the /uː/ sound.', ['book', 'wood', 'group', 'cook'], 2, '“Group” contains the long vowel /uː/. The underlined “oo” in book, wood and cook is /ʊ/.', ['oo', 'oo', 'ou', 'oo']),
  mcq('Pronunciation', 'Language Focus', 'Which word contains the short vowel /ʊ/?', ['school', 'room', 'could', 'food'], 2, '“Could” is pronounced /kʊd/. The other words contain /uː/.'),
  mcq('Pronunciation', 'Language Focus', 'Choose the word with a different underlined sound.', ['look', 'foot', 'spoon', 'good'], 2, '“Spoon” has /uː/; look, foot and good have /ʊ/.', ['oo', 'oo', 'oo', 'oo']),

  mcq('Vocabulary', 'Language Focus', 'A box containing paper, glue and coloured pens is a ___.', ['craft kit', 'screen break', 'message board', 'sports hall'], 0, 'A “craft kit” is a set of materials and tools used for making things.'),
  mcq('Vocabulary', 'Language Focus', 'After a busy school day, Mai walks by the lake to ___.', ['upload', 'unwind', 'compete', 'collect'], 1, '“Unwind” means relax after effort or stress.'),
  mcq('Vocabulary', 'Language Focus', 'Which activity is normally played with pieces on a table?', ['a board game', 'a video call', 'jogging', 'gardening'], 0, 'A board game is played on a board or table with pieces, cards or dice.'),
  mcq('Vocabulary', 'Language Focus', 'Tuan ___ waiting for a slow game to load; he strongly dislikes it.', ['admires', 'detests', 'suggests', 'practises'], 1, '“Detest” means dislike something very strongly.'),
  typed('Vocabulary', 'Language Focus', 'Complete the sentence with a Unit 1 phrase.', 'hang out', '“Hang out” means spend relaxed time with friends.', 'My cousins often [[0]] at the youth centre after class.'),

  mcq('Grammar', 'Language Focus', 'Nga enjoys ___ miniature houses at weekends.', ['make', 'making', 'to making', 'made'], 1, 'Enjoy is followed by a gerund: enjoy + V-ing.'),
  mcq('Grammar', 'Language Focus', 'My brother dislikes ___ during online matches.', ['to lose', 'losing', 'lose', 'lost'], 1, 'Dislike can be followed by V-ing; “losing” fits this sentence.'),
  mcq('Grammar', 'Language Focus', 'Which sentence is correct?', ['She prefers read alone.', 'She prefers reading alone.', 'She prefer to reading alone.', 'She prefers reads alone.'], 1, 'Prefer can be followed by V-ing: prefers reading.'),
  mcq('Grammar', 'Language Focus', 'We love ___ new card games together.', ['try', 'trying', 'tried', 'to trying'], 1, 'Love can be followed by V-ing in this context.'),
  typed('Grammar', 'Language Focus', 'Write the correct form of the verb in brackets.', 'doing', 'Detest is followed by V-ing.', 'He detests [[0]] (do) the same activity every day.'),
  typed('Grammar', 'Language Focus', 'Write the correct form of the verb in brackets.', 'to join', 'Like can be followed by to-infinitive when expressing a preference.', 'I like [[0]] (join) the chess club after school.', [['to join', 'joining']]),

  mcq('Reading', 'Reading', 'Why does each student bring one screen-free activity?', ['To sell it at the library', 'To share an offline hobby with the group', 'To complete school homework', 'To avoid meeting other students'], 1, 'The group meets to make or play something together without using screens.'),
  mcq('Reading', 'Reading', 'What do the students do after the first hour?', ['They go home immediately.', 'They exchange skills.', 'They watch a film.', 'They clean the whole library.'], 1, 'The passage states that they exchange skills after the first hour.'),
  mcq('Reading', 'Reading', 'The word “arrange” is closest in meaning to ___.', ['cancel', 'plan', 'forget', 'record'], 1, 'They use technology to plan the next meeting.'),
  mcq('Reading', 'Reading', 'Linh feels relaxed because students do not have to answer messages during an activity.', ['True', 'False'], 0, 'This is stated directly in the passage.'),
  mcq('Reading', 'Reading', 'The group never uses technology for any purpose.', ['True', 'False'], 1, 'They use it to photograph projects and organise the next meeting.'),

  typed('Writing', 'Writing', 'Rearrange the words to make a complete sentence.', 'We usually play board games after lunch', 'The adverb “usually” goes before the main verb “play”.', 'usually / we / play / board games / after lunch → [[0]]'),
  typed('Writing', 'Writing', 'Rewrite the sentence using the given word. Do not change the meaning.', 'Mai enjoys making paper models', 'Like + V-ing can be rewritten with enjoy + V-ing.', 'Mai likes making paper models. → [[0]]', undefined, 'ENJOYS'),
  typed('Writing', 'Writing', 'Complete the opening of an email about free-time activities.', ['usually meet', 'play badminton'], 'Use the present simple for regular free-time routines.', 'Hi Alex,\nMy friends and I [[0]] at the park on Saturday. We often [[1]] there.'),
  typed('Writing', 'Writing', 'Write the closing sentence from the cues.', 'These activities help us relax and stay close', 'The sentence needs a plural subject, a bare infinitive after help, and parallel verbs.', 'these activities / help / us / relax / and / stay close → [[0]]'),

  mcq('Looking Back', 'Language Focus', 'Choose the best word: A quiet hobby can help you ___.', ['unwind', 'upload', 'interrupt', 'remove'], 0, 'Unwind means relax.'),
  mcq('Looking Back', 'Language Focus', 'My friends fancy ___ a new board game tonight.', ['try', 'trying', 'to trying', 'tried'], 1, 'Fancy is followed by V-ing.'),
  typed('Looking Back', 'Language Focus', 'Complete the sentence with the correct verb form.', 'folding', 'Enjoy is followed by V-ing.', 'Lan enjoys [[0]] (fold) paper animals.'),
  typed('Looking Back', 'Writing', 'Make a complete sentence from the cues.', 'I prefer reading comics to watching short videos', 'Use prefer A to B; both activities are expressed with V-ing.', 'I / prefer / read comics / to / watch short videos → [[0]]'),
]);

const grade9Passage = `The Riverside Workshop began as a small repair room beside the local market. Today it brings together retired artisans, teenagers and shop owners. On weekday afternoons, young volunteers help residents repair simple household objects instead of throwing them away. At weekends, artisans demonstrate pottery, basket weaving and wood carving. Visitors do not only watch: they try a short task and record the story behind each craft. The workshop also carries out a monthly survey to learn which skills local people want to study. Money from the small café pays for tools and free classes. According to its coordinator, the project succeeds because every group contributes something different: experience, energy, space or materials.`;

const grade9 = buildExam(901, 9, 'Local community', 'Pronunciation · Vocabulary · Grammar · Reading · Writing · Looking Back', 'The Riverside Workshop', grade9Passage, [
  mcq('Pronunciation', 'Language Focus', 'Choose the word whose underlined part has the /ɑː/ sound.', ['map', 'craft', 'hand', 'stamp'], 1, '“Craft” contains /ɑː/; the other underlined “a” sounds are /æ/.', ['a', 'a', 'a', 'a']),
  mcq('Pronunciation', 'Language Focus', 'Which word contains the /e/ sound?', ['market', 'helper', 'artisan', 'class'], 1, 'The first vowel in “helper” is /e/.'),
  mcq('Pronunciation', 'Language Focus', 'Choose the word with a different underlined sound.', ['carry', 'handicraft', 'neighbourhood', 'family'], 2, 'The underlined “a” sounds in carry, handicraft and family are /æ/; “neighbourhood” does not contain that sound.', ['a', 'a', 'ei', 'a']),

  mcq('Vocabulary', 'Language Focus', 'A skilled person who makes objects by hand is an ___.', ['artisan', 'assistant', 'architect', 'audience'], 0, 'An artisan is a skilled craft worker.'),
  mcq('Vocabulary', 'Language Focus', 'The town wants to ___ its traditional weaving method.', ['preserve', 'replace', 'pollute', 'refuse'], 0, 'Preserve means protect something so that it continues to exist.'),
  mcq('Vocabulary', 'Language Focus', 'Families often ___ craft knowledge to younger generations.', ['break down', 'pass down', 'turn down', 'look down'], 1, 'Pass down means transmit knowledge or traditions to younger people.'),
  mcq('Vocabulary', 'Language Focus', 'The youth club will ___ a survey about neighbourhood services.', ['carry out', 'take off', 'give away', 'run into'], 0, 'Carry out a survey means conduct it.'),
  typed('Vocabulary', 'Language Focus', 'Complete the sentence with a Unit 1 noun.', 'speciality', 'A speciality is a food or product for which a place is well known.', 'Sesame rice crackers are the village’s best-known [[0]].'),

  mcq('Grammar', 'Language Focus', 'Lan cannot decide ___ to ask for information about the craft fair.', ['who', 'what', 'where', 'when'], 0, 'The verb “ask” needs a person here: who to ask.'),
  mcq('Grammar', 'Language Focus', 'Do you know ___ to get to the community centre?', ['how', 'who', 'what', 'which person'], 0, 'How to get there asks about the method or route.'),
  typed('Grammar', 'Language Focus', 'Rewrite using a question word + to-infinitive.', 'where to display the products', 'Use where + to display after “did not know”.', 'The students did not know where they should display the products. → The students did not know [[0]].'),
  mcq('Grammar', 'Language Focus', 'The council plans to ___ a free weekend market for local makers.', ['set up', 'look after', 'find out', 'get over'], 0, 'Set up means establish or start an organisation or event.'),
  mcq('Grammar', 'Language Focus', 'We need to ___ why fewer people visit the old market.', ['find out', 'pass down', 'turn off', 'bring back'], 0, 'Find out means discover information.'),
  typed('Grammar', 'Language Focus', 'Use the correct form of the phrasal verb in brackets.', 'carried out', 'The completed survey happened last month, so use the past form “carried out”.', 'Students [[0]] (carry out) a neighbourhood survey last month.'),

  mcq('Reading', 'Reading', 'What was the Riverside Workshop at first?', ['A large shopping centre', 'A small repair room', 'A public library', 'A pottery factory'], 1, 'The first sentence identifies it as a small repair room.'),
  mcq('Reading', 'Reading', 'Why does the workshop conduct a monthly survey?', ['To choose café music', 'To discover which skills residents want to learn', 'To recruit tourists', 'To sell household objects'], 1, 'The survey asks what skills local people want to study.'),
  mcq('Reading', 'Reading', 'The word “contributes” is closest in meaning to ___.', ['gives or provides', 'borrows secretly', 'throws away', 'competes for'], 0, 'Each group gives something useful to the project.'),
  mcq('Reading', 'Reading', 'Young volunteers help residents repair useful objects.', ['True', 'False'], 0, 'This activity is described in the passage.'),
  mcq('Reading', 'Reading', 'All free classes are paid for by expensive entrance tickets.', ['True', 'False'], 1, 'The small café provides money for tools and free classes.'),

  typed('Writing', 'Writing', 'Rearrange the words to make a complete sentence.', 'Our neighbourhood nurse is patient and reliable', 'Use adjective order after the linking verb “is”.', 'our neighbourhood nurse / patient / and / reliable / is → [[0]]'),
  typed('Writing', 'Writing', 'Rewrite the sentence using the given phrasal verb.', 'The club carried out a survey about local services', 'Carry out means conduct; use the past form “carried out”.', 'The club conducted a survey about local services. → [[0]]', undefined, 'CARRIED OUT'),
  typed('Writing', 'Writing', 'Complete the topic and support sentences for a paragraph.', ['My favourite community helper is the librarian', 'helps students find reliable information'], 'A clear paragraph begins with a topic sentence and adds a specific supporting detail.', '[[0]]. She [[1]].'),
  typed('Writing', 'Writing', 'Write the concluding sentence from the cues.', 'For these reasons, she makes our community a better place', 'Use “For these reasons” to link the conclusion to the supporting ideas.', 'for these reasons / she / make / our community / a better place → [[0]]'),

  mcq('Looking Back', 'Language Focus', 'A product made by hand using a traditional skill is a ___.', ['handicraft', 'crossing', 'facility', 'service'], 0, 'A handicraft is an object produced by hand.'),
  mcq('Looking Back', 'Language Focus', 'We have not decided ___ to invite to demonstrate pottery.', ['who', 'where', 'when place', 'how person'], 0, 'Who to invite refers to a person.'),
  typed('Looking Back', 'Language Focus', 'Rewrite using the phrasal verb in brackets.', 'The team found out why the event was unpopular', 'Find out means discover information; use found out in the past.', 'The team discovered why the event was unpopular. → [[0]]', undefined, 'FOUND OUT'),
  typed('Looking Back', 'Writing', 'Make a complete sentence from the cues.', 'Local artisans pass down valuable skills to young people', 'Use the present simple for a general community practice.', 'local artisans / pass down / valuable skills / young people → [[0]]'),
]);

const grade10Passage = `Every Sunday evening, the Tran family spends ten minutes planning the week. They list meals, school events and household jobs on a shared board. Mr Tran normally cooks on weekdays, but this month he is attending an evening course, so his daughter Mai is preparing two dinners each week. Her younger brother checks the recycling and waters the balcony plants. Nobody receives money for ordinary chores. Instead, each person chooses one enjoyable family activity after all essential jobs are complete. The parents say the system is not about making every task exactly equal. It is about noticing when one person has too much to do and adjusting the plan. Since the meetings began, arguments about unfinished chores have become less frequent.`;

const grade10 = buildExam(1001, 10, 'Family Life', 'Pronunciation · Vocabulary · Grammar · Reading · Writing · Looking Back', 'The Ten-Minute Family Meeting', grade10Passage, [
  mcq('Pronunciation', 'Language Focus', 'Which word begins with the /br/ consonant blend?', ['cradle', 'brother', 'traffic', 'cleaner'], 1, '“Brother” begins with /br/.'),
  mcq('Pronunciation', 'Language Focus', 'Choose the word whose underlined blend is pronounced differently.', ['cream', 'create', 'crowd', 'bread'], 3, 'Cream, create and crowd begin with /kr/; bread begins with /br/.', ['cr', 'cr', 'cr', 'br']),
  mcq('Pronunciation', 'Language Focus', 'Which word begins with /tr/?', ['routine', 'train', 'groceries', 'bread'], 1, '“Train” begins with the /tr/ consonant blend.'),

  mcq('Vocabulary', 'Language Focus', 'A person who earns most of the family income is a ___.', ['breadwinner', 'homemaker', 'neighbour', 'teenager'], 0, 'Breadwinner means the main income earner.'),
  mcq('Vocabulary', 'Language Focus', 'Sharing tasks prevents one person from carrying the whole ___.', ['routine', 'burden', 'grocery', 'bond'], 1, 'Burden means a heavy duty or responsibility.'),
  mcq('Vocabulary', 'Language Focus', 'Food and everyday household items bought from a shop are ___.', ['benefits', 'groceries', 'values', 'chores'], 1, 'Groceries are food and common household supplies.'),
  mcq('Vocabulary', 'Language Focus', 'Eating together regularly can strengthen the family ___.', ['bond', 'board', 'course', 'income'], 0, 'Family bond means the close relationship among family members.'),
  typed('Vocabulary', 'Language Focus', 'Complete the sentence with a Unit 1 noun.', 'routine', 'A routine is an activity done regularly in a usual order.', 'Packing school bags after dinner is part of our evening [[0]].'),

  mcq('Grammar', 'Language Focus', 'My father usually ___ the shopping list on Friday.', ['writes', 'is writing', 'write', 'writing'], 0, 'Usually signals the present simple; father is singular, so use writes.'),
  mcq('Grammar', 'Language Focus', 'Be quiet! The baby ___.', ['sleeps every day', 'is sleeping', 'sleep', 'slept now'], 1, 'The action is happening now, so use the present continuous.'),
  mcq('Grammar', 'Language Focus', 'This week, we ___ meals at my aunt’s house while our kitchen is repaired.', ['eat usually', 'are eating', 'eats', 'ate every week'], 1, 'This is a temporary situation, so use are eating.'),
  mcq('Grammar', 'Language Focus', 'Mai ___ that shared chores are important.', ['understands', 'is understanding', 'understand', 'understanding'], 0, 'Understand is normally a stative verb, so use the present simple.'),
  typed('Grammar', 'Language Focus', 'Write the correct form of the verb in brackets.', 'is preparing', 'At the moment signals the present continuous.', 'Mum [[0]] (prepare) dinner at the moment.'),
  typed('Grammar', 'Language Focus', 'Complete both blanks with the correct verb forms.', ['takes', 'is doing'], 'Use present simple for the routine and present continuous for today’s temporary change.', 'Dad usually [[0]] (take) out the rubbish, but Lan [[1]] (do) it today.'),

  mcq('Reading', 'Reading', 'What does the family do at the Sunday meeting?', ['They plan meals, events and chores.', 'They decide everyone’s salary.', 'They invite their neighbours.', 'They complete all chores together.'], 0, 'They use a shared board to plan the coming week.'),
  mcq('Reading', 'Reading', 'Why is Mai cooking twice a week this month?', ['She is opening a restaurant.', 'Her father is taking an evening course.', 'Her brother refuses to help.', 'Her mother is travelling.'], 1, 'The change is temporary because Mr Tran is attending a course.'),
  mcq('Reading', 'Reading', 'The word “adjusting” is closest in meaning to ___.', ['changing slightly to fit a need', 'ignoring completely', 'writing down', 'paying for'], 0, 'The family changes the plan when one person has too much work.'),
  mcq('Reading', 'Reading', 'Children receive money for every ordinary household task.', ['True', 'False'], 1, 'The passage says nobody receives money for ordinary chores.'),
  mcq('Reading', 'Reading', 'Arguments about unfinished chores have decreased.', ['True', 'False'], 0, 'They have become less frequent since the meetings began.'),

  typed('Writing', 'Writing', 'Rearrange the words to make a complete sentence.', 'My sister is preparing dinner at the moment', 'Use is + V-ing for an action happening now.', 'my sister / prepare / dinner / at the moment → [[0]]'),
  typed('Writing', 'Writing', 'Rewrite the sentence without changing its meaning.', 'Both parents share the role of breadwinner', 'The plural subject “both parents” takes the base verb “share”.', 'The mother and father both earn money for the family. → [[0]]'),
  typed('Writing', 'Writing', 'Complete two sentences in an email about family routines.', ['usually clean', 'is helping'], 'Use present simple for the routine and present continuous for a temporary situation.', 'We [[0]] the flat on Saturday. This week, my cousin [[1]] us.'),
  typed('Writing', 'Writing', 'Write the concluding sentence from the cues.', 'Sharing chores gives us more time to enjoy together', 'Use a gerund phrase as the subject and to-infinitive after time.', 'share chores / give / us / more time / enjoy together → [[0]]'),

  mcq('Looking Back', 'Language Focus', 'Which phrase means work that must be done at home?', ['household chore', 'family value', 'life skill', 'evening course'], 0, 'A household chore is a regular domestic task.'),
  mcq('Looking Back', 'Language Focus', 'Normally my brother washes the dishes, but tonight I ___ them.', ['wash usually', 'am washing', 'washes', 'washing'], 1, 'Tonight contrasts a temporary action with a normal routine.'),
  typed('Looking Back', 'Language Focus', 'Find and correct the verb form.', 'is setting', 'Right now requires the present continuous.', 'Right now, Dad sets the table. → Right now, Dad [[0]] the table.'),
  typed('Looking Back', 'Writing', 'Make a complete sentence from the cues.', 'A fair plan reduces the burden on every family member', 'Use the singular verb “reduces” with “a fair plan”.', 'a fair plan / reduce / burden / every family member → [[0]]'),
]);

export const unit1NewBookExams: Record<Grade, Exam> = { 8: grade8, 9: grade9, 10: grade10 };

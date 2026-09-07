export type Question = {
  id: number;
  section: 'Language Focus' | 'Reading';
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Exam = {
  id: number;
  title: string;
  theme: string;
  passageTitle: string;
  passage: string;
  questions: Question[];
};

const q = (id: number, section: Question['section'], prompt: string, options: string[], answer: number, explanation: string): Question => ({ id, section, prompt, options, answer, explanation });

export const exams: Exam[] = [
  {
    id: 1,
    title: 'Đề giữa học kỳ I · Đề số 1',
    theme: 'Leisure & social media',
    passageTitle: 'Facebook and students',
    passage: 'With approximately 2.96 billion users as of 2022, Facebook is one of the world’s popular social networks. Students use it for entertainment and academic learning. It is a relaxing channel where they can share memories, watch funny clips and connect with people who have the same interests through Facebook pages. It also gives learners access to free learning materials and specialized knowledge. Students can create group chats to share lectures, prepare presentations and do assignments together. In short, Facebook can contribute to academic achievement when it is used appropriately.',
    questions: [
      q(1,'Language Focus','Which word has a different underlined sound?',['upload','cruel','puzzle','muscle'],1,'“cruel” contains /uː/; the others use the short /ʌ/ sound.'),
      q(2,'Language Focus','Choose the word with a different stress pattern.',['leisure','diving','origami','movie'],2,'“origami” has stress on the third syllable; the others are stressed on the first.'),
      q(3,'Language Focus','Most students detest ___ homework at weekends.',['have','having','to have','had'],1,'“detest” is followed by a gerund: detest doing something.'),
      q(4,'Language Focus','After the course, Nam speaks English ___ than before.',['good','best','better','more well'],2,'The comparative form of “well” is “better”.'),
      q(5,'Language Focus','Posting photos is fun; ___, it can sometimes cause problems.',['although','but','however','so'],2,'“However” links two contrasting independent ideas and is followed by a comma.'),
      q(6,'Reading','What is the passage mainly about?',['Problems caused by Facebook','Benefits of Facebook for students','The history of Facebook'],1,'The passage focuses on how Facebook can support students’ relaxation and learning.'),
      q(7,'Reading','In “it is a relaxing channel”, what does “it” refer to?',['Facebook','Entertainment','School life'],0,'The pronoun “it” refers back to Facebook.'),
      q(8,'Reading','Where can students meet people with similar interests?',['Messenger calls','Facebook comments only','Facebook pages'],2,'The passage explicitly mentions Facebook pages.'),
      q(9,'Reading','Why is Facebook useful as a knowledge platform?',['It provides free learning materials','It has many English films','It replaces every teacher'],0,'Learners can access free materials and ask for specialized knowledge.'),
      q(10,'Reading','Which is NOT a stated purpose of a learning group chat?',['Preparing presentations','Venting about school life','Doing assignments together'],1,'Venting is described as a general social use, not a purpose of a learning group chat.'),
    ],
  },
  {
    id: 2,
    title: 'Đề giữa học kỳ I · Đề số 2',
    theme: 'Countryside & traditions',
    passageTitle: 'The Khmer',
    passage: 'The Khmer Krom live in southern Viet Nam and are the Mekong Delta’s second biggest ethnic group after the Kinh. It is not typical to see Khmer people wearing traditional clothing in daily life. Only women over 50 still wear it to the temple and shave their hair as a sign of respect for the Buddha. Khmer silk clothing is a work of art. The Khmer used to create their own silk, but today they buy it from the Kinh. They still dye yarn with colourful powders imported from Thailand.',
    questions: [
      q(1,'Language Focus','An enjoys ___ in his free time and hopes to become a chef.',['cook','cooking','to cooking','cooked'],1,'“enjoy” is followed by a gerund.'),
      q(2,'Language Focus','My mother spoke ___ than my sister.',['loud','louder','more loudly','most loudly'],2,'We need a comparative adverb: “more loudly”.'),
      q(3,'Language Focus','Farmers often ___ rice and fruit in nearby fields.',['feed','hold','catch','cultivate'],3,'“Cultivate” means to grow crops.'),
      q(4,'Language Focus','Tom showed us how to ___ the paper into a frog.',['log','fold','upload','connect'],1,'Paper is “folded” to make origami.'),
      q(5,'Language Focus','We crossed the river by ___.',['bus','car','ferry','plane'],2,'A ferry carries people across water.'),
      q(6,'Reading','The Khmer are the Mekong Delta’s second largest ethnic group after the Kinh.',['True','False'],0,'This matches the first sentence of the passage.'),
      q(7,'Reading','Khmer people commonly wear traditional clothes every day.',['True','False'],1,'The passage says this is not typical in daily life.'),
      q(8,'Reading','Some women over 50 wear traditional clothes to the temple.',['True','False'],0,'The passage describes this continuing tradition.'),
      q(9,'Reading','The Khmer still make all of their own silk today.',['True','False'],1,'Today they buy silk from the Kinh.'),
      q(10,'Reading','The powders used to dye yarn are imported from Thailand.',['True','False'],0,'This fact is stated directly in the passage.'),
    ],
  },
  {
    id: 3,
    title: 'Đề giữa học kỳ I · Đề số 3',
    theme: 'School life & bullying',
    passageTitle: 'Bullying',
    passage: 'Bullying is a serious problem that can involve mean words, physical actions, or exclusion from a group. A study in British primary schools found that about a quarter of students said they were bullied. In secondary schools, persistent bullying occurred less frequently but was harder to deal with. Today, schools recognise how serious it is and are creating rules to stop it. Studies in different countries show that when schools take action, bullying goes down a lot.',
    questions: [
      q(1,'Language Focus','When you are bullied, you should ___ to a trusted teacher.',['talk','talking','to talking','talked'],0,'A modal verb is followed by the base form: should talk.'),
      q(2,'Language Focus','___ in green spaces can help people relieve stress.',['Walk','Walking','Walked','To walked'],1,'A gerund can act as the subject of a sentence.'),
      q(3,'Language Focus','The local people treated their guests ___.',['hospitable','hospitality','hospitably','hospitablely'],2,'An adverb is needed to modify “treated”.'),
      q(4,'Language Focus','Study harder; ___, you may not pass the test.',['otherwise','moreover','therefore','however'],0,'“Otherwise” means “if not”.'),
      q(5,'Language Focus','My uncle is ___ the goods from the truck.',['loading','unloading','herding','catching'],1,'Taking goods off a truck is “unloading”.'),
      q(6,'Reading','Which forms of bullying are mentioned?',['Mean words, physical actions and exclusion','Only physical actions','Poor school results'],0,'All three forms appear in the opening sentence.'),
      q(7,'Reading','How many primary pupils reported being bullied?',['About half','About a quarter','One in twenty-five'],1,'The study reported about a quarter.'),
      q(8,'Reading','Did bullying occur more frequently in secondary schools?',['Yes, much more often','No, it occurred less frequently','The passage does not say'],1,'The passage says persistent cases were less frequent.'),
      q(9,'Reading','What are schools doing to stop bullying?',['Closing playgrounds','Creating rules','Giving more homework'],1,'Schools are creating rules to stop bullying.'),
      q(10,'Reading','What happens when schools take action?',['Bullying increases','Nothing changes','Bullying goes down a lot'],2,'International studies found a clear reduction.'),
    ],
  },
  {
    id: 4,
    title: 'Đề giữa học kỳ I · Đề số 4',
    theme: 'Village life & family',
    passageTitle: 'Life in a southern village',
    passage: 'I feel fortunate to live in a peaceful village in southern Viet Nam. Vast fields, green trees, lakes, ponds and canals make the scenery picturesque. The air is fresh and life moves more slowly than in cities. People work hard: they grow vegetables, cultivate rice, raise cattle, grow fruit trees and fish. Children play traditional games and sometimes help their parents. Villagers know each other well and often meet in the evening to eat fruit, play chess, sing folk songs and chat.',
    questions: [
      q(1,'Language Focus','A balance between human and animal needs can prevent habitat ___.',['destroy','destroyed','destruction','destructive'],2,'The noun “destruction” follows “habitat”.'),
      q(2,'Language Focus','My sister is keen on ___ and wants to be a chef.',['cook','cooking','to cook','cooked'],1,'“keen on” is followed by a gerund.'),
      q(3,'Language Focus','At harvest time, ___ are busy collecting crops.',['farm','farms','farmers','farming'],2,'The sentence needs the plural noun for people.'),
      q(4,'Language Focus','We ___ to nearby villages to enjoy the fresh air.',['cycle','cycles','cycling','cycled always'],0,'With subject “we”, use the base present form.'),
      q(5,'Language Focus','My mother teaches me ___ my own doll clothes.',['make','making','to make','made'],2,'“teach someone to do something” is the correct pattern.'),
      q(6,'Reading','Life in the author’s village is peaceful.',['True','False'],0,'The author calls the village peaceful.'),
      q(7,'Reading','People in the village work hard.',['True','False'],0,'This is stated directly.'),
      q(8,'Reading','Villagers live only by fishing.',['True','False'],1,'They also grow crops, fruit trees and raise cattle.'),
      q(9,'Reading','Children are always busy helping their parents.',['True','False'],1,'They only help sometimes.'),
      q(10,'Reading','The villagers get along well.',['True','False'],0,'They know each other well and spend evenings together.'),
    ],
  },
  {
    id: 5,
    title: 'Đề giữa học kỳ I · Đề số 5',
    theme: 'Nature & the British countryside',
    passageTitle: 'The countryside in Britain',
    passage: 'The British countryside is known for contrasts: bare mountains and moorland, lakes, rivers, woods and a long, often wild coastline. National parks have especially beautiful scenery. British people also associate the countryside with farmland, fields and animals. Most farmland is owned by individuals or independent companies, while the government maintains public footpaths. Many people enjoy walking, cycling, picnics and the peace of country life. Today few rural people work on farms; many commute to towns.',
    questions: [
      q(1,'Language Focus','A new factory could be ___ disastrous for the area.',['environment','environmental','environmentally','environmentalist'],2,'An adverb modifies the adjective “disastrous”.'),
      q(2,'Language Focus','Earth Day raises ___ of environmental issues.',['aware','awareness','awarely','unaware'],1,'“Awareness” is the required noun.'),
      q(3,'Language Focus','Local people are friendly to ___.',['visit','visiting','visitors','visited'],2,'The sentence needs a plural noun for people who visit.'),
      q(4,'Language Focus','Climbing can ___ your strength.',['decrease','reduce','increase','lower'],2,'Regular climbing can increase strength.'),
      q(5,'Language Focus','People learn to use climbing equipment ___.',['effective','effect','effectively','effectiveness'],2,'An adverb modifies the verb “use”.'),
      q(6,'Reading','Which feature is NOT listed in the opening description?',['Farmland','Moorland','Bare mountains','Lakes and woods'],0,'Farmland appears later; the opening list describes natural contrasts.'),
      q(7,'Reading','Who owns most farmland in Britain?',['Only the government','Individuals or independent companies','Tourists','National parks'],1,'The passage names individuals and independent companies.'),
      q(8,'Reading','What do many British people associate with the countryside?',['Work in towns','Heavy traffic','Peace and relaxation','Public offices'],2,'The passage highlights peace and country recreation.'),
      q(9,'Reading','What does “commute” most nearly mean?',['Travel regularly to work','Walk for fun','Move permanently','Work on a farm'],0,'To commute is to travel regularly between home and work.'),
      q(10,'Reading','Where do many rural residents work today?',['On farms','In towns','In national parks','On the coastline'],1,'Many commute to jobs in towns.'),
    ],
  },
  {
    id: 6,
    title: 'Đề giữa học kỳ I · Đề số 6',
    theme: 'Hobbies & growing up',
    passageTitle: 'Knitting with Grandma',
    passage: 'My grandma and I share a pastime: knitting. She taught me when I was ten. In the evenings, we sit in front of the TV and knit. Last year I wanted a birthday present for Dad, so I found an online pattern and a YouTube video for a sweater. It took me a week to finish. Dad said it was his favourite sweater. Knitting makes you more careful and patient, although you need to practise when stitches drop or wool is held too tightly. Grandma says knitting is magical.',
    questions: [
      q(1,'Language Focus','My brother volunteers for an animal protection ___.',['organise','organised','organisation','organising'],2,'The sentence needs a noun: “organisation”.'),
      q(2,'Language Focus','Scientists can predict many natural ___.',['disastrous','disasters','disaster','disastrously'],1,'A plural count noun follows “many”.'),
      q(3,'Language Focus','The Internet ___ at home is weak.',['connect','connection','connected','connecting'],1,'“Connection” is the required noun.'),
      q(4,'Language Focus','Our factory needs more ___ workers.',['train','training','trained','trainer'],2,'“Trained” describes skilled workers.'),
      q(5,'Language Focus','People in my village are always willing ___ each other.',['help','to help','helping','helped'],1,'“willing” is followed by “to + verb”.'),
      q(6,'Reading','The writer started knitting in Grade 10.',['True','False'],1,'She started when she was ten years old, not in Grade 10.'),
      q(7,'Reading','She found the sweater pattern online.',['True','False'],0,'She searched online and found a pattern with a video.'),
      q(8,'Reading','She spent more than a week making the sweater.',['True','False'],1,'It took exactly one week.'),
      q(9,'Reading','Knitting can make people more careful and patient.',['True','False'],0,'The passage states both benefits.'),
      q(10,'Reading','The writer’s dad says knitting is magical.',['True','False'],1,'Her grandma, not her dad, says it is magical.'),
    ],
  },
];

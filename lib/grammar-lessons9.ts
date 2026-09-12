import type { Question } from './exams';
import { distributeAnswers } from './answer-distribution';

export type GrammarTopic = {
  title: string;
  meaning: string;
  structure: string[];
  use: string;
  examples: { english: string; vietnamese: string }[];
  note: string;
};

export type GrammarLesson = {
  unit: number;
  topics: GrammarTopic[];
  exercises: Question[];
};

type Mini = [prompt: string, options: string[], answer: number, explanation: string];

const mini = (items: Mini[], unit: number): Question[] => distributeAnswers(items.map(([prompt, options, answer, explanation], index) => ({
  id: index + 1,
  section: 'Language Focus' as const,
  prompt,
  options,
  answer,
  explanation,
})), `grammar-mini-unit-${unit}`);

export const grammarLessons9: Record<number, GrammarLesson> = {
  1: {
    unit: 1,
    topics: [
      {
        title: 'Wh-word + to-infinitive',
        meaning: 'Diễn đạt một cách ngắn gọn “ai/cái gì/ở đâu/khi nào/bằng cách nào nên làm” trong câu hỏi gián tiếp.',
        structure: ['S + know/ask/decide/wonder + who/what/where/when/how + to V', 'S + tell/show + người + who/what/where/when/how + to V'],
        use: 'Dùng khi chủ ngữ cần biết cách làm, nơi làm hoặc người cần liên hệ. Không đảo trợ động từ như trong câu hỏi trực tiếp. Không dùng “why + to V” theo mẫu này.',
        examples: [
          { english: 'I do not know where to buy handmade lanterns.', vietnamese: 'Tôi không biết mua đèn lồng thủ công ở đâu.' },
          { english: 'The guide showed us how to make a clay cup.', vietnamese: 'Hướng dẫn viên chỉ chúng tôi cách làm một chiếc cốc đất sét.' },
        ],
        note: 'Sai: I do not know where can I buy it. Đúng: I do not know where to buy it.',
      },
      {
        title: 'Phrasal verbs – cụm động từ',
        meaning: 'Một động từ kết hợp với một hoặc hai tiểu từ tạo ra nghĩa mới; không nên dịch từng từ riêng lẻ.',
        structure: ['verb + particle: find out, set up, pass down', 'verb + particle + preposition: get on with', 'Cụm tách được + đại từ: pass it down (không nói pass down it)'],
        use: 'Unit 1 thường gặp pass down (truyền lại), carry out (thực hiện), find out (tìm hiểu), set up (thành lập) và get on with (hòa thuận với).',
        examples: [
          { english: 'The family passed the craft down to their children.', vietnamese: 'Gia đình truyền nghề lại cho con cháu.' },
          { english: 'Our class will carry out a community project.', vietnamese: 'Lớp chúng tôi sẽ thực hiện một dự án cộng đồng.' },
        ],
        note: 'Với cụm tách được, đại từ thay cho tân ngữ đứng giữa: pass it down.',
      },
    ],
    exercises: mini([
      ['I wonder ___ to meet the village artisan.', ['who', 'how', 'where', 'why'], 0, '“Who to meet” = gặp ai; meet cần tân ngữ chỉ người.'],
      ['Please tell me ___ to get to the pottery workshop.', ['what', 'how', 'who', 'why'], 1, '“How to get to” diễn tả cách đi đến một địa điểm.'],
      ['The children are learning ___ to weave baskets.', ['when', 'how', 'who', 'where'], 1, '“How to weave” là học cách đan giỏ.'],
      ['We have not chosen ___ to hold the craft fair.', ['who', 'why', 'where', 'whose'], 2, '“Where to hold” diễn tả địa điểm tổ chức.'],
      ['Our teacher asked us to find ___ who made these bowls.', ['down', 'out', 'off', 'up'], 1, '“Find out” nghĩa là tìm hiểu thông tin.'],
      ['The family passed the secret recipe ___ to Mai.', ['out', 'off', 'down', 'away'], 2, '“Pass down” nghĩa là truyền lại qua thế hệ.'],
      ['The volunteers will carry ___ the plan next week.', ['up', 'out', 'on', 'over'], 1, '“Carry out a plan” là thực hiện kế hoạch.'],
      ['A new community centre was set ___ last year.', ['up', 'down', 'off', 'away'], 0, '“Set up” nghĩa là thành lập.'],
      ['Hoa gets ___ well with her neighbours.', ['up', 'on', 'out', 'off'], 1, '“Get on well with” = hòa thuận với.'],
      ['Choose the correct sentence.', ['I do not know who to ask.', 'I do not know who do I ask.', 'I do not know why to ask.', 'I do not know who asking.'], 0, 'Sau know dùng “who to ask”; không đảo trợ động từ trong câu gián tiếp.'],
    ], 1),
  },
  2: {
    unit: 2,
    topics: [
      {
        title: 'Double comparatives – so sánh kép',
        meaning: 'Diễn đạt “càng… càng…”: một sự thay đổi đi kèm hoặc kéo theo sự thay đổi khác.',
        structure: ['The + comparative + S + V, the + comparative + S + V', 'Tính từ ngắn: the quieter… the safer…', 'Tính từ dài/trạng từ dài: the more convenient… the more quickly…'],
        use: 'Dùng more/less với danh từ không đếm được; more/fewer với danh từ đếm được số nhiều. Sau “the” là dạng so sánh hơn, không dùng dạng nguyên hoặc so sánh nhất.',
        examples: [
          { english: 'The wider the pavements are, the safer pedestrians feel.', vietnamese: 'Vỉa hè càng rộng, người đi bộ càng cảm thấy an toàn.' },
          { english: 'The more buses we have, the fewer cars people need.', vietnamese: 'Càng có nhiều xe buýt, mọi người càng cần ít ô tô hơn.' },
        ],
        note: 'Sai: The more crowded, more noisy. Đúng: The more crowded it is, the noisier it becomes.',
      },
      {
        title: 'Phrasal verbs về đời sống đô thị',
        meaning: 'Những cụm động từ thường dùng khi nói về đi lại và vấn đề trong thành phố.',
        structure: ['get around + nơi chốn: di chuyển quanh', 'run out of + danh từ: hết', 'cut down on + danh từ/V-ing: cắt giảm', 'put up with + danh từ/V-ing: chịu đựng'],
        use: 'Chọn cụm theo nghĩa toàn câu, đồng thời chú ý giới từ cuối. “Run out of” phải có of trước danh từ.',
        examples: [
          { english: 'We get around the city by tram.', vietnamese: 'Chúng tôi đi lại trong thành phố bằng xe điện.' },
          { english: 'The city should cut down on traffic noise.', vietnamese: 'Thành phố nên giảm tiếng ồn giao thông.' },
        ],
        note: 'Sai: We ran out water. Đúng: We ran out of water.',
      },
    ],
    exercises: mini([
      ['The ___ the buses are, the more people use them.', ['reliable', 'more reliable', 'most reliable', 'reliably'], 1, 'Tính từ dài reliable có dạng so sánh hơn “more reliable”.'],
      ['The more parks a city has, the ___ it becomes.', ['liveable', 'more liveable', 'most liveable', 'more liveably'], 1, 'So sánh kép cần “the more liveable”.'],
      ['The heavier the traffic is, the ___ we move.', ['slowly', 'more slowly', 'most slowly', 'slowerly'], 1, 'Bổ nghĩa cho move cần trạng từ so sánh hơn “more slowly”.'],
      ['The more trains there are, the ___ cars are needed.', ['fewer', 'less', 'few', 'least'], 0, 'Cars đếm được số nhiều nên dùng fewer.'],
      ['The closer the flat is to school, the ___ time I spend travelling.', ['few', 'fewer', 'less', 'least'], 2, 'Time không đếm được nên dùng less.'],
      ['The road is becoming ___ crowded.', ['more and more', 'most and most', 'much and much', 'more and most'], 0, '“More and more + adjective” = ngày càng.'],
      ['We get ___ the city by metro.', ['around', 'out of', 'down on', 'up with'], 0, '“Get around” nghĩa là di chuyển trong thành phố.'],
      ['The bus has run ___ fuel.', ['of', 'out of', 'away', 'down'], 1, '“Run out of fuel” = hết nhiên liệu.'],
      ['Could the council cut down ___ noise at night?', ['on', 'with', 'in', 'at'], 0, '“Cut down on” = cắt giảm.'],
      ['I cannot put up ___ the construction noise.', ['of', 'on', 'with', 'for'], 2, '“Put up with” = chịu đựng.'],
    ], 2),
  },
  3: {
    unit: 3,
    topics: [
      {
        title: 'First conditional with modal verbs',
        meaning: 'Nói về một điều kiện có khả năng xảy ra ở hiện tại/tương lai và kết quả, lời khuyên hoặc nghĩa vụ đi kèm.',
        structure: ['If + S + present simple, S + will/can/may/might/must/should + V', 'S + modal + V + if + S + present simple'],
        use: 'Will dự đoán; can khả năng; may/might khả năng chưa chắc; must sự cần thiết; should lời khuyên. Mệnh đề if không dùng will trong mẫu cơ bản.',
        examples: [
          { english: 'If you feel anxious, you should speak to a trusted adult.', vietnamese: 'Nếu lo lắng, bạn nên nói chuyện với người lớn đáng tin cậy.' },
          { english: 'You can concentrate better if you get enough sleep.', vietnamese: 'Bạn có thể tập trung tốt hơn nếu ngủ đủ giấc.' },
        ],
        note: 'Sai: If you will feel tired, you should to rest. Đúng: If you feel tired, you should rest.',
      },
    ],
    exercises: mini([
      ['If you ___ breakfast, you may feel tired at school.', ['skip', 'will skip', 'skipping', 'skipped'], 0, 'Mệnh đề if của điều kiện loại 1 dùng hiện tại đơn.'],
      ['If the homework is difficult, you ___ ask your teacher.', ['can', 'can to', 'will can', 'are can'], 0, '“Can + V” diễn tả một lựa chọn có thể làm.'],
      ['You ___ stay up too late if you have an early class.', ['should not', 'should not to', 'do not should', 'not should'], 0, 'Lời khuyên phủ định là should not + V.'],
      ['If Minh exercises regularly, he ___ sleep better.', ['might', 'might to', 'will might', 'is might'], 0, '“Might + V” diễn tả khả năng chưa chắc chắn.'],
      ['If you have a fever, you ___ tell an adult.', ['must', 'must to', 'will must', 'are must'], 0, '“Must + V” diễn tả điều cần thiết.'],
      ['If Lan ___ her time well, she can finish early.', ['manages', 'will manage', 'manage', 'managed'], 0, 'Lan là ngôi thứ ba số ít; mệnh đề if dùng manages.'],
      ['They can relax if they ___ regular breaks.', ['take', 'will take', 'took', 'taking'], 0, 'Mệnh đề if dùng hiện tại đơn “take”.'],
      ['If you feel overwhelmed, you ___ talk to a counsellor.', ['should', 'should to', 'are should', 'will should'], 0, 'Should + V đưa ra lời khuyên.'],
      ['If we work together, we ___ complete the project on time.', ['may', 'may to', 'will may', 'are may'], 0, 'May + V diễn tả kết quả có thể xảy ra.'],
      ['Choose the correct sentence.', ['If you feel stressed, you can rest.', 'If you will feel stressed, you can rest.', 'If you feel stressed, you can to rest.', 'If you felt stressed, you will rest.'], 0, 'Mẫu cơ bản: If + hiện tại đơn, can + V.'],
    ], 3),
  },
  4: {
    unit: 4,
    topics: [
      {
        title: 'Past continuous – quá khứ tiếp diễn',
        meaning: 'Một hành động đang diễn ra tại thời điểm xác định trong quá khứ, hoặc là bối cảnh cho hành động ngắn xen vào.',
        structure: ['Khẳng định: S + was/were + V-ing', 'Phủ định: S + was/were + not + V-ing', 'Câu hỏi: Was/Were + S + V-ing?', 'Hành động dài + when + hành động ngắn: was/were V-ing + when + past simple'],
        use: 'I/he/she/it đi với was; you/we/they đi với were. Dùng while cho hai hành động đang diễn ra song song.',
        examples: [
          { english: 'At seven last night, we were watching an old family video.', vietnamese: 'Lúc 7 giờ tối qua, chúng tôi đang xem video gia đình cũ.' },
          { english: 'I was visiting the temple when it began to rain.', vietnamese: 'Tôi đang thăm ngôi đền thì trời bắt đầu mưa.' },
        ],
        note: 'Sai: They was playing. Đúng: They were playing.',
      },
      {
        title: 'Wish + past simple',
        meaning: 'Bày tỏ mong muốn hiện tại khác với sự thật hoặc mong muốn điều khó xảy ra.',
        structure: ['S + wish(es) + S + V2/ed', 'S + wish(es) + S + did not + V', 'Với be: were có thể dùng cho mọi ngôi'],
        use: 'Động từ mang dạng quá khứ nhưng ý nghĩa hướng về hiện tại/tương lai, không phải kể một sự việc đã qua.',
        examples: [
          { english: 'I wish I knew more about my ancestors.', vietnamese: 'Tôi ước mình biết nhiều hơn về tổ tiên.' },
          { english: 'She wishes the museum were closer.', vietnamese: 'Cô ấy ước bảo tàng ở gần hơn.' },
        ],
        note: 'Sai: I wish I know. Đúng: I wish I knew.',
      },
    ],
    exercises: mini([
      ['At nine yesterday evening, Dad ___ old photographs.', ['was sorting', 'sorted tomorrow', 'is sorting', 'has sorted'], 0, 'Tại một thời điểm trong quá khứ dùng was/were + V-ing.'],
      ['The children ___ folk songs when we arrived.', ['were singing', 'sang now', 'are singing', 'have sung'], 0, 'Hành động đang diễn ra khi we arrived xen vào.'],
      ['While she was cooking, her brother ___ the table.', ['was setting', 'sets', 'has set', 'is setting'], 0, 'Hai hành động cùng diễn ra trong quá khứ: was/were + V-ing.'],
      ['What ___ you ___ at 8 p.m. last night?', ['were / doing', 'did / doing', 'are / do', 'have / done'], 0, 'Câu hỏi quá khứ tiếp diễn: Were + you + V-ing?'],
      ['We ___ in the yard all afternoon.', ['were playing', 'are playing', 'have played', 'play'], 0, 'All afternoon trong bối cảnh quá khứ nhấn mạnh hành động kéo dài.'],
      ['I wish I ___ my great-grandfather’s stories.', ['remembered', 'remember', 'will remember', 'am remembering'], 0, 'Wish về điều trái hiện tại dùng quá khứ đơn.'],
      ['Lan wishes the old bridge ___ still there.', ['were', 'is', 'will be', 'has been'], 0, 'Sau wish có thể dùng were cho mọi ngôi.'],
      ['We wish we ___ more time to visit the museum.', ['had', 'have', 'will have', 'are having'], 0, 'Wish + quá khứ đơn: had.'],
      ['He wishes he ___ so far from his grandparents.', ['did not live', 'does not live', 'will not live', 'not lived'], 0, 'Mong muốn khác hiện tại dùng did not + V.'],
      ['Choose the correct sentence.', ['I wish our town had more trees.', 'I wish our town has more trees.', 'I wish our town will have more trees.', 'I wish our town having more trees.'], 0, 'Wish + past simple diễn tả điều mong muốn hiện tại.'],
    ], 4),
  },
  5: {
    unit: 5,
    topics: [
      {
        title: 'Present perfect – hiện tại hoàn thành',
        meaning: 'Nói về trải nghiệm hoặc hành động đã xảy ra nhưng không nêu thời điểm quá khứ cụ thể; kết quả còn liên quan đến hiện tại.',
        structure: ['Khẳng định: S + have/has + V3/ed', 'Phủ định: S + have/has not + V3/ed', 'Câu hỏi: Have/Has + S + V3/ed?'],
        use: 'Ever thường trong câu hỏi; never = chưa từng; already = đã rồi; yet thường cuối câu hỏi/phủ định. Nếu có yesterday, last year, in 2024… thì dùng quá khứ đơn.',
        examples: [
          { english: 'Have you ever stayed in a tent?', vietnamese: 'Bạn đã từng ở trong lều chưa?' },
          { english: 'We have already visited the eco-park.', vietnamese: 'Chúng tôi đã tham quan công viên sinh thái rồi.' },
        ],
        note: 'Sai: I have visited it yesterday. Đúng: I visited it yesterday.',
      },
    ],
    exercises: mini([
      ['Hoa ___ an eco-tour before.', ['has taken', 'took yesterday', 'is taking now', 'take'], 0, 'Không nêu thời điểm cụ thể; trải nghiệm dùng has + V3.'],
      ['___ you ever ___ snorkelling?', ['Have / tried', 'Did / tried', 'Has / try', 'Are / trying'], 0, 'Câu hỏi trải nghiệm: Have + you + ever + V3.'],
      ['I have never ___ a horse.', ['ridden', 'rode', 'ride', 'riding'], 0, 'V3 của ride là ridden.'],
      ['They have ___ returned from the camp.', ['already', 'yesterday', 'last week', 'in 2024'], 0, 'Already phù hợp với thì hiện tại hoàn thành.'],
      ['Minh has not finished his travel diary ___.', ['yet', 'already', 'ever', 'ago'], 0, 'Yet thường đứng cuối câu phủ định.'],
      ['We ___ the old town last summer.', ['visited', 'have visited', 'has visited', 'visit now'], 0, 'Có mốc “last summer” nên dùng quá khứ đơn.'],
      ['My friends ___ three museums so far.', ['have visited', 'has visited', 'visited yesterday', 'are visit'], 0, 'So far đi với hiện tại hoàn thành; friends là số nhiều.'],
      ['Has your sister ever ___ abroad?', ['travelled', 'travel', 'travelling', 'travels'], 0, 'Sau has phải dùng V3/ed: travelled.'],
      ['This is the best trip I ___.', ['have ever had', 'ever had yesterday', 'am having last year', 'has ever had'], 0, 'Nói trải nghiệm đến hiện tại sau so sánh nhất dùng have ever had.'],
      ['Choose the correct sentence.', ['She has never tried kayaking.', 'She have never tried kayaking.', 'She has never try kayaking.', 'She has never trying kayaking.'], 0, 'She đi với has + V3; never đặt giữa has và V3.'],
    ], 5),
  },
  6: {
    unit: 6,
    topics: [
      {
        title: 'Verbs + to-infinitive',
        meaning: 'Một số động từ chỉ ý định, quyết định, lời hứa hoặc kế hoạch được theo sau bởi “to + động từ nguyên thể”.',
        structure: ['want/decide/promise/agree/plan/learn + to V', 'Phủ định: promise/decide + not to V'],
        use: 'Nhớ theo nhóm từ, không suy đoán rằng mọi động từ đều đi với to V.',
        examples: [
          { english: 'Our class plans to interview older residents.', vietnamese: 'Lớp chúng tôi dự định phỏng vấn những người lớn tuổi.' },
          { english: 'She promised not to be late.', vietnamese: 'Cô ấy hứa sẽ không đến muộn.' },
        ],
        note: 'Sai: We decided visiting. Đúng: We decided to visit.',
      },
      {
        title: 'Verbs + V-ing',
        meaning: 'Một số động từ chỉ sở thích, kết thúc, tránh hoặc đề xuất được theo sau bởi động từ thêm -ing.',
        structure: ['enjoy/fancy/finish/mind/avoid/suggest + V-ing', 'Phủ định sau mind: mind + not + V-ing'],
        use: 'Sau giới từ cũng thường dùng V-ing. Với suggest, cấu trúc thông dụng là suggest doing something.',
        examples: [
          { english: 'My grandparents enjoy telling stories about the past.', vietnamese: 'Ông bà tôi thích kể chuyện về ngày xưa.' },
          { english: 'We suggested visiting the history museum.', vietnamese: 'Chúng tôi đề nghị đi thăm bảo tàng lịch sử.' },
        ],
        note: 'Sai: She suggested to visit. Đúng: She suggested visiting.',
      },
    ],
    exercises: mini([
      ['Mai decided ___ her grandmother about childhood games.', ['to ask', 'asking', 'asked', 'ask'], 0, 'Decide + to V.'],
      ['The students enjoy ___ about family traditions.', ['learning', 'to learn', 'learned', 'learn'], 0, 'Enjoy + V-ing.'],
      ['Dad promised ___ more old photos.', ['to show', 'showing', 'showed', 'show'], 0, 'Promise + to V.'],
      ['Would you mind ___ the window?', ['closing', 'to close', 'closed', 'close'], 0, 'Mind + V-ing.'],
      ['We plan ___ a small exhibition next month.', ['to organise', 'organising', 'organised', 'organise'], 0, 'Plan + to V.'],
      ['The children avoid ___ on busy roads.', ['playing', 'to play', 'played', 'play'], 0, 'Avoid + V-ing.'],
      ['She suggested ___ the elder residents.', ['interviewing', 'to interview', 'interviewed', 'interview'], 0, 'Suggest + V-ing.'],
      ['My grandfather learned ___ a smartphone.', ['to use', 'using', 'used', 'use'], 0, 'Learn + to V.'],
      ['Have you finished ___ the family tree?', ['drawing', 'to draw', 'drew', 'draw'], 0, 'Finish + V-ing.'],
      ['They agreed ___ the village archive together.', ['to visit', 'visiting', 'visited', 'visit'], 0, 'Agree + to V.'],
    ], 6),
  },
};

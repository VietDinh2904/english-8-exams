import type { Exam, Question } from './exams';

const q = (id: number, prompt: string, options: string[], answer: number, explanation: string, underlines?: string[]): Question => ({
  id,
  section: 'Language Focus',
  prompt,
  options,
  answer,
  explanation,
  underlines,
});

export const exams10: Exam[] = [
  {
    id: 1,
    menuLabel: 'Unit 1 · Family Life',
    menuGroup: 'unit',
    title: 'Unit 1 · Family Life',
    theme: 'Vocabulary · Present tenses · /br/, /kr/, /tr/',
    sourceNote: 'Bài mẫu được biên soạn mới theo ba chủ điểm công khai của Unit 1 trên Loigiaihay: Family Life, thì hiện tại đơn–hiện tại tiếp diễn và các cụm phụ âm /br/, /kr/, /tr/.',
    passageTitle: '',
    passage: '',
    reviewNotes: [
      { title: 'Hiện tại đơn', rule: 'Dùng cho thói quen, lịch trình và sự thật. Với he/she/it, động từ thường thêm -s/-es.', example: 'My father cooks dinner every Friday.' },
      { title: 'Hiện tại tiếp diễn', rule: 'Dùng am/is/are + V-ing cho hành động đang xảy ra hoặc tình huống tạm thời. Các dấu hiệu thường gặp: now, right now, at the moment.', example: 'My sister is washing the dishes now.' },
      { title: 'Động từ trạng thái', rule: 'Các động từ như know, understand, believe, love, need thường không dùng ở thì tiếp diễn.', example: 'I understand the problem.' },
      { title: 'Cụm phụ âm', rule: '/br/, /kr/ và /tr/ được phát âm liền mạch, không chèn thêm nguyên âm ở giữa hai phụ âm.', example: 'bread /bred/ · cream /kriːm/ · tree /triː/' },
    ],
    questions: [
      q(1, 'Parents should divide household ___ fairly.', ['chores', 'benefits', 'opinions', 'systems'], 0, '“Household chores” là cụm cố định, nghĩa là các công việc nhà như nấu ăn, lau dọn và giặt quần áo.'),
      q(2, 'My father is the main ___, but everyone shares the housework.', ['breadwinner', 'homemaker', 'relative', 'teenager'], 0, '“Breadwinner” là người kiếm phần lớn thu nhập để nuôi gia đình. “Homemaker” là người chủ yếu chăm sóc nhà cửa.'),
      q(3, 'Doing chores teaches children to take ___.', ['responsible', 'responsibility', 'responsibly', 'response'], 1, 'Cụm “take responsibility” nghĩa là nhận hoặc có trách nhiệm. Sau “take” cần danh từ “responsibility”.'),
      q(4, 'Lan usually ___ the washing-up after dinner.', ['does', 'makes', 'takes', 'works'], 0, 'Cụm đúng là “do the washing-up” = rửa bát. Chủ ngữ Lan là ngôi thứ ba số ít nên “do” đổi thành “does”.'),
      q(5, 'Parents can strengthen family ___ by spending time together.', ['bonds', 'duties', 'routines', 'laundry'], 0, '“Family bonds” là mối quan hệ gắn bó giữa các thành viên. “Strengthen family bonds” nghĩa là tăng sự gắn kết gia đình.'),
      q(6, 'A person who manages the home and cares for the family is a ___.', ['breadwinner', 'homemaker', 'household', 'provider'], 1, '“Homemaker” chỉ người quản lý việc nhà và chăm sóc gia đình, không nhất thiết là người tạo thu nhập chính.'),
      q(7, 'Sharing chores reduces the ___ on one family member.', ['burden', 'value', 'support', 'benefit'], 0, '“Burden” nghĩa là gánh nặng. Khi mọi người chia việc, gánh nặng đặt lên một người sẽ giảm.'),
      q(8, 'My brother takes out the ___ every evening.', ['rubbish', 'furniture', 'groceries', 'washing-up'], 0, 'Cụm “take out the rubbish” nghĩa là mang rác ra ngoài. Đây là một công việc nhà thông dụng.'),
      q(9, 'Children learn useful life ___ when they help at home.', ['skills', 'chores', 'benefits', 'roles'], 0, '“Life skills” là các kỹ năng cần thiết trong cuộc sống. Làm việc nhà giúp trẻ học tính tự lập và tổ chức.'),
      q(10, 'We bought food and household items at the supermarket. “Household” is closest in meaning to ___.', ['related to a home', 'related to a school', 'expensive', 'traditional'], 0, 'Trong “household items”, household có nghĩa là thuộc hoặc dùng trong gia đình/nhà ở.'),

      q(11, 'My mother usually ___ breakfast at 6:30.', ['prepares', 'is preparing', 'prepare', 'preparing'], 0, '“Usually” diễn tả thói quen nên dùng hiện tại đơn. Chủ ngữ số ít “my mother” đi với “prepares”.'),
      q(12, 'Listen! Someone ___ at the front door.', ['knocks', 'is knocking', 'knock', 'knocked'], 1, '“Listen!” cho thấy hành động đang xảy ra ngay lúc nói, nên dùng hiện tại tiếp diễn: is knocking.'),
      q(13, 'We ___ the living room every Saturday.', ['clean', 'are cleaning', 'cleans', 'cleaning'], 0, '“Every Saturday” là lịch lặp lại, vì vậy dùng hiện tại đơn. Chủ ngữ “we” đi với động từ nguyên mẫu “clean”.'),
      q(14, 'Dad cannot answer the phone because he ___ dinner now.', ['cooks', 'is cooking', 'cook', 'cooked'], 1, 'Có “now” và hành động đang diễn ra, nên dùng “is cooking”.'),
      q(15, 'My grandparents ___ with us this month while their house is repaired.', ['stay', 'are staying', 'stays', 'stayed'], 1, '“This month” cùng ngữ cảnh tạm thời cho thấy cần hiện tại tiếp diễn: are staying.'),
      q(16, 'Hoa ___ why sharing chores is important.', ['understands', 'is understanding', 'understand', 'understanding'], 0, '“Understand” là động từ trạng thái, thường không dùng ở thì tiếp diễn. Hoa là số ít nên dùng “understands”.'),
      q(17, 'What ___ your sister usually ___ after school?', ['does / do', 'is / doing', 'do / does', 'does / doing'], 0, 'Câu hỏi về thói quen dùng “does + chủ ngữ số ít + V nguyên mẫu”: does your sister do.'),
      q(18, 'Why ___ you ___ the floor at the moment?', ['do / sweep', 'are / sweeping', 'does / sweep', 'are / sweep'], 1, '“At the moment” yêu cầu hiện tại tiếp diễn. Với “you”, cấu trúc là “are + V-ing”.'),
      q(19, 'Normally Minh cooks, but today his sister ___ dinner.', ['makes', 'is making', 'make', 'made'], 1, '“Today” diễn tả sự thay đổi tạm thời so với thói quen “normally”, nên dùng hiện tại tiếp diễn.'),
      q(20, 'Our school bus ___ at 6:45 every morning.', ['is leaving', 'leave', 'leaves', 'leaving'], 2, 'Lịch trình cố định dùng hiện tại đơn. Chủ ngữ “bus” là số ít nên dùng “leaves”.'),

      q(21, 'Choose the word whose underlined part is pronounced differently.', ['bread', 'breakfast', 'brown', 'climb'], 3, 'Bread, breakfast và brown bắt đầu bằng cụm /br/. “Climb” bắt đầu bằng /kl/, nên chọn D.', ['br', 'br', 'br', 'cl']),
      q(22, 'Choose the word whose underlined part is pronounced differently.', ['cream', 'crane', 'create', 'brush'], 3, 'Cream, crane và create bắt đầu bằng /kr/. “Brush” bắt đầu bằng /br/.', ['cr', 'cr', 'cr', 'br']),
      q(23, 'Choose the word whose underlined part is pronounced differently.', ['tree', 'train', 'treat', 'cream'], 3, 'Tree, train và treat bắt đầu bằng /tr/. “Cream” bắt đầu bằng /kr/.', ['tr', 'tr', 'tr', 'cr']),
      q(24, 'Which word begins with the /br/ sound?', ['crowd', 'brother', 'train', 'clean'], 1, '“Brother” /ˈbrʌðə/ bắt đầu bằng cụm phụ âm /br/. Các từ còn lại lần lượt bắt đầu bằng /kr/, /tr/ và /kl/.', ['cr', 'br', 'tr', 'cl']),
      q(25, 'Which word begins with the /kr/ sound?', ['breadwinner', 'traffic', 'creative', 'practice'], 2, '“Creative” /kriˈeɪtɪv/ bắt đầu bằng /kr/. Breadwinner bắt đầu /br/, traffic bắt đầu /tr/, practice bắt đầu /pr/.', ['br', 'tr', 'cr', 'pr']),
    ],
  },
];

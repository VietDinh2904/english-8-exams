import type { Exam, Question } from './exams';
import { exam9LanguageBank } from './exams9-midterm';

type Template = Omit<Question, 'id'>;

type ReadingSpec = {
  title: string;
  passage: string;
  subject: string;
  activity: string;
  detail: string;
  benefit: string;
  falseDetail: string;
};

const readings: ReadingSpec[] = [
  { title: 'Revision that really works', passage: 'Before the semester exam, An made a six-week revision plan. She grouped vocabulary by topic, explained grammar rules to a friend and completed short reading tasks. Every Sunday, she checked her mistakes and adjusted the next week’s plan. She still made time for exercise and sleep, so she entered the exam calmly.', subject: 'An', activity: 'followed and adjusted a six-week revision plan', detail: 'She checked her mistakes every Sunday.', benefit: 'She felt calm before the exam.', falseDetail: 'She stopped sleeping in order to study more.' },
  { title: 'The craft map', passage: 'Students in Minh’s town created an online map of local craft workshops. They interviewed artisans, photographed products with permission and added opening hours. Visitors can now plan a walking route between the workshops. The project has attracted more customers while helping young residents understand their town’s traditions.', subject: 'students in Minh’s town', activity: 'created an online map of craft workshops', detail: 'They asked permission before photographing products.', benefit: 'The project supports artisans and local traditions.', falseDetail: 'The map hides the workshops’ opening hours.' },
  { title: 'A quieter journey', passage: 'Trang used to travel to school on a crowded bus. Since a new metro station opened near her home, her journey has become shorter and more reliable. She reads on the train instead of worrying about traffic jams. However, she still walks the final ten minutes to school, which gives her some daily exercise.', subject: 'Trang', activity: 'uses the new metro for most of her school journey', detail: 'She walks for ten minutes after leaving the train.', benefit: 'Her journey is shorter and more reliable.', falseDetail: 'She now travels the whole way by car.' },
  { title: 'The phone-free table', passage: 'The Pham family noticed that everyone was checking messages during dinner. They agreed to put their phones in a small box for thirty minutes each evening. At first, the children found the rule inconvenient, but they soon began sharing more stories about school. The parents say that family conversations have become warmer.', subject: 'the Pham family', activity: 'keeps phones away during dinner', detail: 'The phones stay in a box for thirty minutes.', benefit: 'Family conversations have improved.', falseDetail: 'The children enjoyed the rule immediately.' },
  { title: 'Learning from an old diary', passage: 'Hoa found her grandmother’s school diary while cleaning a cupboard. It described lessons without computers, long bicycle journeys and games played with handmade toys. Hoa and her grandmother read it together and recorded a short interview. The recording is now part of a school exhibition about life in the past.', subject: 'Hoa and her grandmother', activity: 'used an old diary to document past school life', detail: 'They recorded an interview together.', benefit: 'Other students can learn about life in the past.', falseDetail: 'The diary describes classrooms full of computers.' },
  { title: 'My first camping night', passage: 'Last summer, Bao joined a two-day camping trip in a national park. While his group was putting up a tent, heavy rain began. They worked together, moved their bags to a dry shelter and cooked a simple meal there. Bao was nervous at first, but the experience taught him to stay calm and cooperate.', subject: 'Bao and his camping group', activity: 'managed an unexpected problem during a camping trip', detail: 'Heavy rain started while they were putting up a tent.', benefit: 'Bao learned to remain calm and work with others.', falseDetail: 'Bao camped alone for an entire week.' },
  { title: 'A healthier school canteen', passage: 'Students asked their school canteen to offer healthier choices. The manager added fruit, reduced sugar in drinks and displayed information about calories. After three months, more students were choosing balanced lunches. The canteen still sells occasional treats, but smaller portions are now available.', subject: 'students and the school canteen manager', activity: 'improved the range of healthy food at school', detail: 'The manager displayed calorie information.', benefit: 'More students choose balanced lunches.', falseDetail: 'All treats were completely banned.' },
  { title: 'A lane brought back to life', passage: 'A narrow lane near the market had become dark and untidy. Local residents cleaned the walls, repaired lamps and invited young artists to paint scenes of traditional festivals. Shop owners contributed materials. The lane is now safer in the evening and has become a popular stop for visitors.', subject: 'local residents, artists and shop owners', activity: 'restored a neglected lane near the market', detail: 'Young artists painted traditional festival scenes.', benefit: 'The lane is safer and attracts visitors.', falseDetail: 'The residents removed every street lamp.' },
  { title: 'Then and now in one kitchen', passage: 'For a class project, Vy compared her great-grandmother’s kitchen with her family’s modern one. In the past, meals were cooked over a wood fire and water was carried from a well. Today, appliances save time and running water is available. Vy concluded that life is more convenient, although family recipes still connect the generations.', subject: 'Vy', activity: 'compared kitchens and family life in two periods', detail: 'Water once had to be carried from a well.', benefit: 'She understood both lifestyle change and family continuity.', falseDetail: 'Traditional family recipes have disappeared completely.' },
];

const readingQuestions = (spec: ReadingSpec): Template[] => [
  { section: 'Reading', prompt: `What is “${spec.title}” mainly about?`, options: [spec.activity, spec.falseDetail, 'A product advertisement', 'A trip with no useful result'], answer: 0, explanation: `Ý chính bao quát toàn bài là việc ${spec.activity.toLowerCase()}. Các phương án khác trái với bài hoặc chỉ là suy diễn.` },
  { section: 'Reading', prompt: `Who is the main subject of “${spec.title}”?`, options: [spec.subject, 'foreign reporters', 'professional athletes', 'factory managers'], answer: 0, explanation: `Chủ thể được giới thiệu và theo dõi xuyên suốt bài là ${spec.subject}.` },
  { section: 'Reading', prompt: 'Which detail is stated in the passage?', options: [spec.detail, spec.falseDetail, 'The activity was cancelled immediately.', 'Nobody learned anything from the experience.'], answer: 0, explanation: `Bài đọc nêu trực tiếp: “${spec.detail}” Ba lựa chọn còn lại không được xác nhận hoặc trái với nội dung.` },
  { section: 'Reading', prompt: spec.benefit, options: ['True', 'False'], answer: 0, explanation: `TRUE. Đây là kết quả hoặc lợi ích được bài đọc xác nhận: ${spec.benefit}` },
  { section: 'Reading', prompt: spec.falseDetail, options: ['True', 'False'], answer: 1, explanation: 'FALSE. Nhận định này trái với chi tiết trong bài. Khi làm True/False, cần tìm câu chứa cùng từ khóa rồi kiểm tra xem ý nghĩa có bị đảo ngược hay không.' },
];

const selectLanguage = (offset: number): Template[] => {
  const selected: Template[] = [];
  let cursor = offset % exam9LanguageBank.length;
  while (selected.length < 20) {
    const question = exam9LanguageBank[cursor];
    if (!selected.includes(question)) selected.push(question);
    cursor = (cursor + 7) % exam9LanguageBank.length;
  }
  return selected;
};

const makeExam = (
  id: number,
  menuLabel: string,
  menuGroup: 'review' | 'final',
  title: string,
  readingIndex: number,
  offset: number,
): Exam => {
  const reading = readings[readingIndex];
  const templates = [...selectLanguage(offset), ...readingQuestions(reading)];
  return {
    id,
    menuLabel,
    menuGroup,
    title,
    theme: menuGroup === 'review' ? 'Tổng ôn Units 1–6 · 25 câu' : 'Units 1–6 · Không gồm phần nghe',
    sourceNote: 'Bộ câu hỏi được biên soạn lại theo phạm vi kiến thức và cấu trúc học kỳ I Tiếng Anh 9 Global Success trên Loigiaihay; không sao chép nguyên văn và đã loại bỏ phần nghe.',
    passageTitle: reading.title,
    passage: reading.passage,
    reviewNotes: menuGroup === 'review' ? [
      { title: 'Từ vựng Units 1–6', rule: 'Ôn theo cụm từ thuộc sáu chủ đề: cộng đồng địa phương, thành phố, sức khỏe tuổi teen, cuộc sống quá khứ, trải nghiệm và lối sống Việt Nam xưa–nay.', example: 'local speciality · congested street · balanced diet · preserve traditions' },
      { title: 'Wh-word + to V và cụm động từ', rule: 'Dùng who/what/where/when/how + to V sau know, decide, ask…; học cụm động từ theo cả cụm như pass down, carry out, cut down on.', example: 'Do you know where to buy it? This skill was passed down.' },
      { title: 'So sánh kép và điều kiện loại 1', rule: 'The + so sánh hơn, the + so sánh hơn diễn tả hai thay đổi liên hệ. Câu điều kiện loại 1 dùng If + hiện tại đơn, modal/will + V.', example: 'The more you practise, the better you become. If you feel tired, you should rest.' },
      { title: 'Quá khứ tiếp diễn và wish', rule: 'Was/were + V-ing diễn tả hành động đang xảy ra tại một thời điểm quá khứ. Wish + quá khứ đơn diễn tả mong muốn trái với hiện tại.', example: 'I was studying when Lan called. I wish I had more free time.' },
      { title: 'Hiện tại hoàn thành và dạng động từ', rule: 'Have/has + V3 đi với since, for, already, yet và trải nghiệm không nêu thời điểm. Ghi nhớ động từ theo sau bởi V-ing hoặc to V.', example: 'I have lived here for five years. She enjoys making pottery.' },
      { title: 'Ngữ âm', rule: 'So sánh đúng phần gạch chân: /æ/, /ɑː/, /e/; /aʊ/, /əʊ/, /eə/; các phụ âm /h/, /r/, /m/, /l/, /j/, /w/ và cụm /fl/, /fr/.', example: 'flower /fl/ · from /fr/' },
    ] : undefined,
    questions: templates.map((question, index) => ({ ...question, id: index + 1 })),
  };
};

export const finalExams9: Exam[] = [
  makeExam(10, 'Ôn tập cuối kỳ I', 'review', 'English 9 · Ôn tập cuối kỳ I', 0, 5),
  ...Array.from({ length: 8 }, (_, index) => makeExam(index + 11, `Cuối kỳ I · Đề ${index + 1}`, 'final', `English 9 · Đề cuối kỳ I số ${index + 1}`, index + 1, index * 9 + 2)),
];

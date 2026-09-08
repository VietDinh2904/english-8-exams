import type { Exam, Question } from './exams';

type Template = Omit<Question, 'id'>;

const l = (prompt: string, options: string[], answer: number, explanation: string, underlines?: string[]): Template => ({ section: 'Language Focus', prompt, options, answer, explanation, underlines });
const r = (prompt: string, options: string[], answer: number, explanation: string): Template => ({ section: 'Reading', prompt, options, answer, explanation });

export const exam9LanguageBank: Template[] = [
  l('Choose the word whose underlined part is pronounced differently.', ['pottery', 'control', 'fold', 'local'], 0, '“Pottery” /ˈpɒtəri/ có chữ o mang âm /ɒ/; control, fold và local có âm /əʊ/. Vì vậy chọn A.', ['o', 'o', 'o', 'o']),
  l('Choose the word whose underlined ending is pronounced differently.', ['handicrafts', 'collections', 'artisans', 'skills'], 0, 'Đuôi -s trong “handicrafts” đọc /s/ sau âm /t/; ba từ còn lại đọc /z/.', ['s', 's', 's', 's']),
  l('Choose the word whose underlined part is pronounced differently.', ['capsule', 'advent', 'damage', 'rare'], 3, 'Chữ a trong “rare” đọc /eə/; trong capsule, advent và damage đọc /æ/.', ['a', 'a', 'a', 'a']),
  l('Choose the word whose underlined part is pronounced differently.', ['bother', 'worth', 'without', 'together'], 1, '“Worth” có th vô thanh /θ/; bother, without và together dùng âm hữu thanh /ð/ trong cách đọc của bài.', ['th', 'th', 'th', 'th']),
  l('Choose the word whose underlined part is pronounced differently.', ['listen', 'return', 'attend', 'pretend'], 0, 'Chữ t trong “listen” là âm câm; ở return, attend và pretend, t được phát âm /t/.', ['t', 't', 't', 't']),
  l('Choose the word whose underlined ending is pronounced differently.', ['costumes', 'messages', 'smartphones', 'uncles'], 1, 'Đuôi -s của “messages” đọc /ɪz/; ba từ còn lại đọc /z/.', ['s', 's', 's', 's']),
  l('Choose the word whose underlined ending is pronounced differently.', ['extended', 'updated', 'edited', 'finished'], 3, 'Đuôi -ed của “finished” đọc /t/; extended, updated và edited đọc /ɪd/.', ['ed', 'ed', 'ed', 'ed']),
  l('Choose the word with a different stress pattern.', ['suburb', 'delight', 'helpline', 'workshop'], 1, '“Delight” nhấn âm hai; suburb, helpline và workshop nhấn âm đầu.'),
  l('Choose the word with a different stress pattern.', ['handicraft', 'collector', 'department', 'opinion'], 0, '“Handicraft” nhấn âm đầu; collector, department và opinion nhấn âm hai.'),
  l('Choose the word with a different stress pattern.', ['career', 'option', 'nomad', 'modern'], 0, '“Career” nhấn âm hai; option, nomad và modern nhấn âm đầu.'),
  l('Choose the word with a different stress pattern.', ['identity', 'infrastructure', 'variety', 'convenience'], 1, '“Infrastructure” nhấn âm đầu; identity, variety và convenience có trọng âm chính ở âm tiết sau.'),
  l('Choose the word with a different stress pattern.', ['pigeon', 'machine', 'market', 'vlogger'], 1, '“Machine” nhấn âm hai; pigeon, market và vlogger nhấn âm đầu.'),
  l('Choose the word with a different stress pattern.', ['media', 'telegraph', 'diary', 'computer'], 3, '“Computer” nhấn âm hai; media, telegraph và diary nhấn âm đầu.'),
  l('Choose the word with a different stress pattern.', ['cottage', 'foreign', 'career', 'method'], 2, '“Career” nhấn âm hai; cottage, foreign và method nhấn âm đầu.'),
  l('Choose the word with a different stress pattern.', ['relative', 'importance', 'subtitle', 'breadwinner'], 1, '“Importance” nhấn âm hai; relative, subtitle và breadwinner nhấn âm đầu.'),
  l('This vase is a beautiful piece of ___. It is made of clay.', ['pottery', 'drum', 'basket', 'painting'], 0, '“Pottery” là đồ gốm làm từ đất sét. Các lựa chọn còn lại không phù hợp với chất liệu và loại đồ vật.'),
  l('Skilled ___ preserve traditional techniques in their craft.', ['police officers', 'electricians', 'workers', 'artisans'], 3, '“Artisans” là nghệ nhân — người có kỹ năng thủ công chuyên môn và gìn giữ nghề truyền thống.'),
  l('The downtown area is ___ with shops and entertainment venues.', ['peaceful', 'bustling', 'empty', 'silent'], 1, '“Bustling” nghĩa là nhộn nhịp, phù hợp với khu trung tâm có nhiều cửa hàng và nơi giải trí.'),
  l('If a deadline is approaching, students ___ manage their time wisely.', ['need to', 'can', 'musted', 'will to'], 0, '“Need to + V” diễn tả điều cần thiết. Sau “to” dùng động từ nguyên mẫu “manage”.'),
  l('Do you know ___ to find local artisans?', ['when', 'where', 'what', 'who'], 1, 'Cấu trúc “wh-word + to V”; “where to find” hỏi nơi có thể tìm nghệ nhân.'),
  l('We are ___ a project on teen pressure at the moment.', ['carrying out', 'taking up', 'cutting down on', 'getting around'], 0, '“Carry out a project” = thực hiện dự án. “At the moment” yêu cầu hiện tại tiếp diễn: are carrying out.'),
  l('This weaving skill has been passed ___ for generations.', ['up', 'on', 'down', 'in'], 2, '“Pass down” nghĩa là truyền lại kiến thức hoặc truyền thống từ thế hệ trước cho thế hệ sau.'),
  l('Many tourists wonder ___ local speciality food.', ['where eating', 'where did they eat', 'can they eat', 'where to eat'], 3, 'Sau “wonder” dùng “where to + V” để diễn đạt “ăn ở đâu”; không đảo trợ động từ trong mệnh đề gián tiếp.'),
  l('Ha Noi is a ___ metropolis with constant activity.', ['rush', 'bustling', 'congest', 'concrete'], 1, 'Cần tính từ bổ nghĩa cho “metropolis”. “Bustling” nghĩa là sôi động, nhộn nhịp.'),
  l('Teenagers need a ___ diet for healthy development.', ['physical', 'mental', 'well-balanced', 'unhealthy'], 2, 'Cụm “a well-balanced diet” nghĩa là chế độ ăn cân bằng và đầy đủ dưỡng chất.'),
  l('The visitors asked ___ a conical hat.', ['where to be made', 'how to make', 'to making', 'what making'], 1, 'Mẫu “ask + how to V” dùng khi hỏi cách làm điều gì: asked how to make.'),
  l('If you stay up late, you ___ feel tired tomorrow.', ['may', 'should', 'shall', 'could to'], 0, 'Câu điều kiện loại 1 có thể dùng “may + V” ở mệnh đề chính để chỉ kết quả có khả năng xảy ra.'),
  l('You can watch English films ___ your listening skills.', ['improve', 'improves', 'improving', 'to improve'], 3, '“To improve” là động từ nguyên mẫu chỉ mục đích: xem phim tiếng Anh để cải thiện kỹ năng nghe.'),
  l('When I was a child, I would ___ fishing with my grandfather.', ['go', 'goes', 'to go', 'going'], 0, '“Would + V” diễn tả hành động lặp lại trong quá khứ; sau would dùng nguyên mẫu “go”.'),
  l('When Emily ___ young, she ___ an art competition.', ['was / wins', 'was / win', 'was / won', 'was / used to win'], 2, 'Hai sự việc đã hoàn tất trong quá khứ dùng quá khứ đơn: was và won.'),
  l('The meeting ___ by the time we arrived.', ['just began', 'has just begun', 'would just begin', 'had just begun'], 3, 'Hành động cuộc họp bắt đầu xảy ra trước thời điểm chúng tôi đến, nên dùng quá khứ hoàn thành “had begun”.'),
  l('Electricity ___ a luxury, but now it is a necessity.', ['used to be', 'would be', 'was being', 'had been'], 0, '“Used to + V” diễn tả trạng thái đúng trong quá khứ nhưng không còn đúng ở hiện tại.'),
  l('Nancy usually ___ healthy tips, and she ___ a photo now.', ['shares / uploads', 'shares / is uploading', 'is sharing / uploads', 'is sharing / upload'], 1, '“Usually” dùng hiện tại đơn: shares; “now” dùng hiện tại tiếp diễn: is uploading.'),
  l('I ___ Tom while I ___ food from a street vendor.', ['saw / bought', 'was seeing / bought', 'saw / was buying', 'saw / were buying'], 2, 'Hành động đang diễn ra dùng quá khứ tiếp diễn “was buying”; sự việc xen vào dùng quá khứ đơn “saw”.'),
  l('I wish my parents ___ to my favourite music with me.', ['listen', 'listened', 'will listen', 'are listening'], 1, 'Wish về điều không đúng ở hiện tại dùng quá khứ đơn: wish + S + V2/ed.'),
  l('The teacher wondered ___ students about healthy eating.', ['how teaching', 'how to teach', 'how did she teach', 'how teach'], 1, 'Cấu trúc rút gọn: wonder + how to + V. “How to teach” vừa đúng ngữ pháp vừa đúng nghĩa.'),
];

const makeQuestions = (languageIndexes: number[], reading: Template[]): Question[] =>
  [...languageIndexes.map((index) => exam9LanguageBank[index]), ...reading].map((item, index) => ({ ...item, id: index + 1 }));

const picks = (start: number) => Array.from({ length: 20 }, (_, index) => (start + index) % exam9LanguageBank.length);

export const midtermExams9: Exam[] = [
  {
    id: 3, menuLabel: 'Đề giữa kỳ 1', menuGroup: 'midterm', title: 'Đề giữa học kỳ I · Đề số 1', theme: 'Local community · Teen health',
    passageTitle: 'Why sleep matters to teenagers',
    passage: 'Sleep supports teenagers’ growth, memory, concentration and emotional health. Most teens need about eight to ten hours each night, yet homework, activities and electronic devices often shorten their sleep. Too little sleep may reduce attention, weaken the immune system and increase cravings for unhealthy food. A regular bedtime, a quiet room, less caffeine and limited screen use before bed can improve sleep quality.',
    questions: makeQuestions(picks(0), [
      r('What is the passage mainly about?', ['How sleep affects teenagers', 'How to use a smartphone', 'School timetables', 'Outdoor sports'], 0, 'Các câu đều tập trung vào vai trò, tác hại của thiếu ngủ và cách ngủ tốt hơn ở tuổi thiếu niên.'),
      r('How much sleep do most teenagers need?', ['4–6 hours', '6–7 hours', '8–10 hours', '11–13 hours'], 2, 'Bài đọc nêu trực tiếp “eight to ten hours each night”.'),
      r('Which cause of short sleep is mentioned?', ['Electronic devices', 'Cold weather', 'Housework only', 'Morning exercise'], 0, 'Thiết bị điện tử được liệt kê cùng bài tập và các hoạt động là nguyên nhân làm giảm thời gian ngủ.'),
      r('What may too little sleep do?', ['Improve attention', 'Strengthen immunity', 'Increase unhealthy cravings', 'Replace exercise'], 2, 'Bài nêu thiếu ngủ có thể làm tăng cảm giác thèm thức ăn không lành mạnh.'),
      r('Which habit can improve sleep?', ['Drinking coffee late', 'Using screens in bed', 'Changing bedtime daily', 'Keeping a regular bedtime'], 3, 'Lịch ngủ đều đặn là một trong những biện pháp được khuyên trong câu cuối.'),
    ]),
  },
  {
    id: 4, menuLabel: 'Đề giữa kỳ 2', menuGroup: 'midterm', title: 'Đề giữa học kỳ I · Đề số 2', theme: 'Traditional crafts · Liveable cities',
    passageTitle: 'Carpet weaving in Etrim',
    passage: 'Etrim, a village near Bodrum in Turkey, is known for carpet weaving. Each spring, villagers shear sheep, clean the wool, spin it into yarn and colour it with natural dyes. Weavers tie knots on traditional looms without following a fixed pattern; they rely on memory, so each carpet is unique. A carpet may take about two months to finish. The artisans are proud that their work keeps an old tradition alive.',
    questions: makeQuestions(picks(5), [
      r('What is the best title?', ['Modern factories in Turkey', 'Carpet weaving in Etrim', 'Sheep farming worldwide', 'A two-day village tour'], 1, 'Tiêu đề B bao quát địa điểm, nghề thủ công và toàn bộ nội dung bài.'),
      r('What happens after villagers clean the wool?', ['They sell it immediately', 'They spin it into yarn', 'They make a fixed pattern', 'They import a carpet'], 1, 'Trình tự trong bài: shear → clean → spin into yarn → dye.'),
      r('Why is each carpet unique?', ['It is made in a factory', 'It uses plastic thread', 'Weavers rely on memory', 'Visitors design it'], 2, 'Người thợ không theo mẫu cố định mà dựa vào trí nhớ, vì thế mỗi tấm thảm khác nhau.'),
      r('How long may a carpet take to complete?', ['About two days', 'About two weeks', 'About two months', 'About two years'], 2, 'Chi tiết thời gian được nêu trực tiếp là khoảng hai tháng.'),
      r('How do the artisans feel about their work?', ['Proud', 'Bored', 'Ashamed', 'Uncertain'], 0, 'Câu cuối cho biết họ tự hào vì công việc duy trì truyền thống lâu đời.'),
    ]),
  },
  {
    id: 5, menuLabel: 'Đề giữa kỳ 3', menuGroup: 'midterm', title: 'Đề giữa học kỳ I · Đề số 3', theme: 'Technology · Time management',
    passageTitle: 'Technology in daily life',
    passage: 'Technology has changed work, communication and transport. Automated tools handle routine jobs, while video meetings let colleagues cooperate across long distances. Social networks help people keep in touch and share information. In large cities, ride-hailing apps show fares and driver locations before a trip. These services are convenient, although users still need to protect personal information and use technology responsibly.',
    questions: makeQuestions(picks(10), [
      r('Technology helps people work efficiently.', ['True', 'False'], 0, 'TRUE. Bài nói công cụ tự động xử lý công việc lặp lại và hỗ trợ cộng tác.'),
      r('Video meetings require colleagues to be in the same city.', ['True', 'False'], 1, 'FALSE. Video meetings cho phép hợp tác qua khoảng cách xa.'),
      r('Social networks can help people stay connected.', ['True', 'False'], 0, 'TRUE. Bài nêu mạng xã hội giúp giữ liên lạc và chia sẻ thông tin.'),
      r('Ride-hailing apps hide the fare until the trip ends.', ['True', 'False'], 1, 'FALSE. Ứng dụng cho xem giá cước trước chuyến đi.'),
      r('Users should use technology responsibly.', ['True', 'False'], 0, 'TRUE. Đây là lời khuyên ở câu cuối của bài.'),
    ]),
  },
  {
    id: 6, menuLabel: 'Đề giữa kỳ 4', menuGroup: 'midterm', title: 'Đề giữa học kỳ I · Đề số 4', theme: 'Family life · Learning English',
    passageTitle: 'Living in an extended family',
    passage: 'An extended family includes more than two generations. Living together can create closeness and provide support with childcare, caring for older relatives and housework. However, sharing one home may reduce privacy, and decisions can take longer because family members have different opinions. A successful extended family respects personal space and shares responsibilities fairly.',
    questions: makeQuestions(picks(15), [
      r('What does the passage mainly discuss?', ['Only family problems', 'Advantages and challenges of extended families', 'How to buy a larger house', 'School relationships'], 1, 'Bài trình bày cả lợi ích lẫn khó khăn khi nhiều thế hệ sống cùng nhau.'),
      r('Which shared responsibility is mentioned?', ['Building a school', 'Childcare', 'Running a company', 'Teaching every subject'], 1, 'Childcare được nêu cùng chăm sóc người lớn tuổi và việc nhà.'),
      r('Why can decisions take longer?', ['The house is small', 'Everyone is absent', 'People have different opinions', 'There are no responsibilities'], 2, 'Các quan điểm khác nhau làm việc đi đến quyết định chung mất nhiều thời gian hơn.'),
      r('What does “privacy” most nearly mean?', ['Public attention', 'Personal space', 'Family income', 'Housework'], 1, 'Trong ngữ cảnh sống chung, “privacy” là sự riêng tư hay không gian cá nhân.'),
      r('What helps an extended family succeed?', ['Ignoring older people', 'Avoiding all decisions', 'Sharing duties fairly', 'Keeping every opinion secret'], 2, 'Câu cuối nhấn mạnh tôn trọng không gian riêng và chia trách nhiệm công bằng.'),
    ]),
  },
  {
    id: 7, menuLabel: 'Đề giữa kỳ 5', menuGroup: 'midterm', title: 'Đề giữa học kỳ I · Đề số 5', theme: 'Life in the past · Family roles',
    passageTitle: 'Stay-at-home dads',
    passage: 'In the past, many people expected women to manage the home while men earned the family income. Today, responsibilities are more often shared. Some fathers stay home, care for children and do housework while their partners work outside the home. This arrangement can support a mother’s career and give fathers more time with their children. Activities such as sports and crafts can also strengthen the bond between them.',
    questions: makeQuestions(picks(0).reverse(), [
      r('In the past, people expected men to stay home and raise children.', ['True', 'False'], 1, 'FALSE. Theo bài, vai trò ở nhà trước đây thường được gán cho phụ nữ.'),
      r('Family responsibilities are more often shared today.', ['True', 'False'], 0, 'TRUE. Câu thứ hai nêu trực tiếp sự thay đổi này.'),
      r('A stay-at-home father may do housework.', ['True', 'False'], 0, 'TRUE. Làm việc nhà và chăm con là hai nhiệm vụ được nêu trong bài.'),
      r('This arrangement always prevents mothers from working.', ['True', 'False'], 1, 'FALSE. Trái lại, việc này có thể hỗ trợ sự nghiệp của người mẹ.'),
      r('Shared activities can strengthen the father–child bond.', ['True', 'False'], 0, 'TRUE. Câu cuối nói thể thao và thủ công có thể làm mối quan hệ thêm gắn bó.'),
    ]),
  },
  {
    id: 8, menuLabel: 'Đề giữa kỳ 6', menuGroup: 'midterm', title: 'Đề giữa học kỳ I · Đề số 6', theme: 'City problems · Healthy living',
    passageTitle: 'Challenges of urban living',
    passage: 'Busy cities offer jobs and entertainment, but they also face waste, crowded public spaces and air pollution. Clear waste rules and regular cleaning help keep streets tidy. In crowded areas, washing hands and keeping homes clean can limit illness. Trees, public transport, masks and air purifiers may reduce the effects of polluted air. Residents can enjoy city life while taking practical steps to make it healthier.',
    questions: makeQuestions(picks(8), [
      r('Which urban problem is mentioned?', ['Too many farms', 'Waste on streets', 'No job opportunities', 'Too much personal space'], 1, 'Rác trên đường phố được nêu là một thách thức của thành phố đông đúc.'),
      r('How can officials help keep streets tidy?', ['Remove all trees', 'Close public spaces', 'Use waste rules and cleaning', 'Encourage private cars'], 2, 'Bài đưa ra hai biện pháp: quy định xử lý rác rõ ràng và vệ sinh thường xuyên.'),
      r('Why is handwashing important in crowded places?', ['It limits illness', 'It creates pollution', 'It increases traffic', 'It attracts pests'], 0, 'Giữ vệ sinh cá nhân giúp hạn chế sự lây lan của bệnh.'),
      r('Which action can reduce air-pollution effects?', ['Burning more waste', 'Using air purifiers', 'Cutting down every tree', 'Driving more often'], 1, 'Máy lọc không khí được nêu là một giải pháp giảm ảnh hưởng của không khí ô nhiễm.'),
      r('What is the main idea?', ['Cities have only disadvantages', 'Practical ways to face urban challenges', 'How to leave every city', 'The history of public transport'], 1, 'Bài vừa nêu vấn đề đô thị vừa đưa ra các cách xử lý thực tế.'),
    ]),
  },
  {
    id: 9, menuLabel: 'Đề giữa kỳ 7', menuGroup: 'midterm', title: 'Đề giữa học kỳ I · Đề số 7', theme: 'Healthy habits · Environment',
    passageTitle: 'Earth Day in our city',
    passage: 'Earth Day began after environmental campaigners realised that many people did not understand the damage to air and water. It is now marked around April 22. In one city, residents ride bicycles, talk to drivers about car use and collect plastic bags for recycling. Music events can attract young people while short messages between performances explain how to protect the planet. The key is to involve people of different ages.',
    questions: makeQuestions(picks(16), [
      r('What is the best title?', ['Earth Day activities', 'A music competition', 'Modern car design', 'Water sports'], 0, 'Bài nói về nguồn gốc và các hoạt động hưởng ứng Ngày Trái Đất.'),
      r('When is Earth Day usually marked?', ['Around April 22', 'At the end of December', 'Every weekend', 'Only in the 1960s'], 0, 'Mốc thời gian “around April 22” được nêu trực tiếp.'),
      r('Why do some events include music?', ['To sell cars', 'To attract young people', 'To avoid environmental messages', 'To close the city'], 1, 'Âm nhạc giúp thu hút người trẻ; thông điệp môi trường được xen giữa các tiết mục.'),
      r('Which activity is NOT mentioned?', ['Cycling', 'Collecting plastic bags', 'Talking about car use', 'Planting rice'], 3, 'Bài không nhắc việc trồng lúa; ba hoạt động còn lại đều xuất hiện.'),
      r('What is most important for an Earth Day event?', ['It must last all day', 'Only adults may join', 'People should become involved', 'It must be expensive'], 2, 'Câu cuối nhấn mạnh việc lôi cuốn người ở nhiều lứa tuổi cùng tham gia.'),
    ]),
  },
];

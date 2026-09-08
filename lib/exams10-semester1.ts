import type { Exam, Question } from './exams';

type Template = Omit<Question, 'id'>;

const language = (
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  underlines?: string[],
): Template => ({ section: 'Language Focus', prompt, options, answer, explanation, underlines });

const bank: Template[] = [
  language('Which word has a different underlined sound?', ['bread', 'head', 'ready', 'break'], 3, 'Cụm “ea” trong “break” phát âm /eɪ/; trong bread, head và ready, “ea” phát âm /e/. Khi làm dạng này, cần so sánh đúng phần được gạch chân.', ['ea', 'ea', 'ea', 'ea']),
  language('Which word has a different underlined sound?', ['clean', 'class', 'club', 'cream'], 3, 'Ba từ clean, class và club bắt đầu bằng cụm phụ âm /kl/; “cream” bắt đầu bằng /kr/. Phần được gạch chân cho thấy chính xác cụm âm cần so sánh.', ['cl', 'cl', 'cl', 'cr']),
  language('Choose the word with a different stress pattern.', ['household', 'concert', 'adopt', 'programme'], 2, '“Adopt” nhấn âm hai /əˈdɒpt/; household, concert và programme thường nhấn âm đầu.'),
  language('Choose the word with stress on the second syllable.', ['family', 'volunteer', 'benefit', 'musical'], 1, '“Volunteer” nhấn vào âm tiết cuối trong cách phát âm thông dụng /ˌvɒlənˈtɪə(r)/; trong bốn lựa chọn, đây là từ không nhấn âm đầu.'),
  language('Every member should share the household ___.', ['chores', 'concerts', 'devices', 'audiences'], 0, '“Household chores” là cụm cố định, nghĩa là công việc nhà như nấu ăn, dọn dẹp và giặt giũ.'),
  language('My father usually ___ dinner, but today my mother is cooking.', ['cooks', 'is cooking', 'cook', 'cooked'], 0, '“Usually” diễn tả thói quen nên dùng hiện tại đơn. Chủ ngữ số ít “my father” đi với “cooks”. Vế sau có “today” nêu tình huống tạm thời.'),
  language('Look! The students ___ trees in the school garden.', ['plant', 'planted', 'are planting', 'have planted'], 2, '“Look!” báo hiệu hành động đang diễn ra. Công thức hiện tại tiếp diễn: am/is/are + V-ing.'),
  language('Lan ___ the answer, so she does not need any help.', ['knows', 'is knowing', 'know', 'has knowing'], 0, '“Know” là động từ trạng thái, thường không dùng ở thì tiếp diễn. Chủ ngữ Lan nên dùng “knows”.'),
  language('We should turn off lights to save ___.', ['energy', 'audience', 'instrument', 'income'], 0, '“Save energy” nghĩa là tiết kiệm năng lượng; các lựa chọn còn lại không phù hợp ngữ nghĩa.'),
  language('This bottle can be ___ instead of being thrown away.', ['reused', 'performed', 'uploaded', 'invented'], 0, '“Reuse” là sử dụng lại. Sau “can be” cần quá khứ phân từ “reused” để tạo câu bị động.'),
  language('The club collected rubbish, ___ it planted flowers along the road.', ['and', 'but', 'or', 'because'], 0, 'Hai hành động bổ sung cho nhau nên nối bằng “and”. “But” chỉ tương phản, “or” chỉ lựa chọn, “because” chỉ nguyên nhân.'),
  language('We took cloth bags ___ we wanted to reduce plastic waste.', ['because', 'but', 'or', 'so'], 0, 'Vế sau nêu lý do mang túi vải nên dùng “because”. Nếu dùng “so”, trật tự nguyên nhân–kết quả phải đảo lại.'),
  language('The song was written ___ a young Vietnamese musician.', ['by', 'with', 'from', 'at'], 0, 'Trong câu bị động, “by + người thực hiện” giới thiệu tác giả của hành động.'),
  language('Many charity concerts ___ every year.', ['are organised', 'organise', 'is organised', 'organised'], 0, 'Chủ ngữ số nhiều “concerts” nhận hành động nên dùng hiện tại đơn bị động: are + V3.'),
  language('The singer hopes ___ at the school festival.', ['to perform', 'performing', 'perform', 'performed'], 0, 'Sau “hope” dùng động từ nguyên mẫu có “to”: hope to do something.'),
  language('Her parents let her ___ the music course.', ['join', 'to join', 'joining', 'joined'], 0, 'Cấu trúc “let + tân ngữ + động từ nguyên mẫu không to”: let her join.'),
  language('The performance attracted a large ___.', ['audience', 'volunteer', 'device', 'routine'], 0, '“Audience” là khán giả của một buổi biểu diễn. “A large audience” là cụm kết hợp tự nhiên.'),
  language('A song that becomes extremely popular is a ___.', ['hit', 'stage', 'choir', 'band'], 0, '“A hit” là một bài hát hoặc sản phẩm rất thành công và phổ biến.'),
  language('Our class raised money ___ children in a remote area.', ['for', 'on', 'at', 'with'], 0, 'Cụm “raise money for somebody/a cause” nghĩa là gây quỹ cho ai hoặc mục đích nào.'),
  language('The volunteers decided ___ free meals at the shelter.', ['to serve', 'serve', 'serving', 'served'], 0, 'Sau “decide” dùng “to-infinitive”: decide to do something.'),
  language('While we ___ the community centre, it started to rain.', ['were painting', 'painted', 'paint', 'have painted'], 0, 'Hành động đang kéo dài trong quá khứ dùng quá khứ tiếp diễn; hành động xen vào “started” dùng quá khứ đơn.'),
  language('They ___ twenty trees last Saturday.', ['planted', 'have planted', 'plant', 'were plant'], 0, '“Last Saturday” là thời điểm quá khứ đã kết thúc nên dùng quá khứ đơn “planted”.'),
  language('Mai ___ in three volunteer campaigns so far.', ['has taken part', 'took part', 'takes part', 'is taking part'], 0, '“So far” là dấu hiệu hiện tại hoàn thành: has/have + V3. Chủ ngữ Mai đi với “has”.'),
  language('This app ___ by two university students in 2024.', ['was developed', 'developed', 'is developing', 'has develop'], 0, 'Ứng dụng nhận hành động và có mốc quá khứ 2024, nên dùng quá khứ đơn bị động: was + V3.'),
  language('The invention helps people ___ their time more effectively.', ['manage', 'to managing', 'managed', 'management'], 0, 'Sau “help + tân ngữ” có thể dùng động từ nguyên mẫu không “to”: helps people manage.'),
  language('A laptop is more ___ than a desktop computer when you travel.', ['portable', 'generous', 'musical', 'equal'], 0, '“Portable” nghĩa là dễ mang theo, phù hợp khi so sánh laptop với máy tính để bàn.'),
  language('You can ___ the file to the cloud and open it later.', ['upload', 'perform', 'donate', 'adopt'], 0, '“Upload a file” là tải tệp từ thiết bị lên một dịch vụ trực tuyến.'),
  language('The new washing machine is easy ___.', ['to use', 'using', 'use', 'used'], 0, 'Cấu trúc “be + adjective + to-infinitive”: is easy to use.'),
  language('The screen is cracked; ___, the phone still works.', ['however', 'therefore', 'because', 'and'], 0, '“However” nối hai ý tương phản: màn hình nứt nhưng điện thoại vẫn hoạt động.'),
  language('Equal opportunities should ___ to all students.', ['be given', 'give', 'be giving', 'given'], 0, 'Bị động với động từ khuyết thiếu: should + be + V3. Vì “opportunities” được trao nên dùng “be given”.'),
  language('Nobody should ___ because of their gender.', ['be judged', 'judge', 'be judging', 'judged'], 0, '“Nobody” là người nhận sự đánh giá, vì vậy dùng bị động “should be judged”; câu phủ định nằm trong “nobody”.'),
  language('Both boys and girls can hold ___ positions.', ['leadership', 'pollution', 'household', 'musician'], 0, '“Leadership positions” nghĩa là các vị trí lãnh đạo; đây là cụm danh từ đúng về nghĩa.'),
  language('If we use less plastic, we ___ the environment.', ['will protect', 'protected', 'protecting', 'have protect'], 0, 'Câu điều kiện loại 1: If + hiện tại đơn, mệnh đề chính dùng will + động từ nguyên mẫu.'),
  language('We have not finished the project ___.', ['yet', 'already', 'last week', 'ago'], 0, '“Yet” thường đứng cuối câu phủ định hoặc nghi vấn ở hiện tại hoàn thành, chỉ việc chưa xảy ra tính đến hiện tại.'),
  language('The teacher asked us ___ our phones during the test.', ['not to use', 'do not use', 'not using', 'not use'], 0, 'Cấu trúc yêu cầu gián tiếp: ask + tân ngữ + (not) to-infinitive.'),
  language('The device is useful, ___ it is rather expensive.', ['but', 'so', 'because', 'and'], 0, 'Hai đặc điểm trái ngược nhau nên dùng liên từ “but”.'),
  language('Choose the closest meaning of “donate”.', ['give to help', 'buy at a low price', 'borrow temporarily', 'throw away'], 0, '“Donate” nghĩa là tặng tiền, đồ vật hoặc thời gian để giúp người khác hay một tổ chức.'),
  language('Choose the opposite of “harmful”.', ['beneficial', 'dangerous', 'polluted', 'wasteful'], 0, '“Harmful” là có hại; từ trái nghĩa “beneficial” là có lợi.'),
  language('Which word has a different underlined sound?', ['washed', 'helped', 'wanted', 'worked'], 2, 'Đuôi -ed trong “wanted” phát âm /ɪd/ vì động từ kết thúc bằng /t/; ba từ còn lại có -ed phát âm /t/.', ['ed', 'ed', 'ed', 'ed']),
  language('Which word has a different underlined sound?', ['plays', 'cleans', 'helps', 'runs'], 2, 'Đuôi -s trong “helps” phát âm /s/ sau âm vô thanh /p/; trong plays, cleans và runs, đuôi -s phát âm /z/.', ['s', 's', 's', 's']),
  language('Choose the word with a different stress pattern.', ['invention', 'community', 'environment', 'volunteer'], 3, 'Volunteer nhấn âm cuối; invention, community và environment đều có trọng âm chính ở âm tiết gần giữa từ.'),
  language('By the time we arrived, the concert ___.', ['had started', 'starts', 'has started', 'was start'], 0, 'Một hành động xảy ra trước một hành động quá khứ khác dùng quá khứ hoàn thành: had + V3.'),
  language('I prefer reusable bottles ___ single-use ones.', ['to', 'than', 'from', 'with'], 0, 'Cấu trúc “prefer A to B” diễn tả thích A hơn B.'),
  language('The charity needs more ___ to deliver food packages.', ['volunteers', 'audiences', 'inventors', 'breadwinners'], 0, 'Người tự nguyện tham gia công việc cộng đồng là “volunteers”.'),
  language('She sings ___ than she did last year.', ['more confidently', 'more confident', 'most confidently', 'confident'], 0, 'Động từ “sings” cần trạng từ “confidently”; so sánh hơn của trạng từ dài là “more confidently”.'),
  language('Recycling paper prevents many trees from ___.', ['being cut down', 'cut down', 'to cut down', 'cutting down'], 0, 'Sau “prevent ... from” dùng V-ing. Vì trees nhận hành động chặt nên dùng dạng bị động “being cut down”.'),
  language('The team is looking forward to ___ the results.', ['seeing', 'see', 'to see', 'saw'], 0, 'Trong “look forward to”, “to” là giới từ nên theo sau bởi V-ing: seeing.'),
  language('Students are encouraged to come up ___ creative solutions.', ['with', 'to', 'for', 'at'], 0, 'Cụm động từ “come up with” nghĩa là nghĩ ra một ý tưởng hoặc giải pháp.'),
  language('There is ___ water in the bottle, so we need to refill it.', ['little', 'few', 'many', 'several'], 0, '“Water” là danh từ không đếm được. “Little” mang nghĩa gần như không đủ, phù hợp với kết quả phải châm thêm.'),
  language('Not only the teacher but also the students ___ excited.', ['are', 'is', 'was', 'be'], 0, 'Với “not only ... but also”, động từ thường hòa hợp với chủ ngữ gần nhất. “Students” số nhiều nên dùng “are”.'),
];

type ReadingSpec = {
  title: string;
  passage: string;
  subject: string;
  action: string;
  place: string;
  benefit: string;
  falseDetail: string;
};

const readings: ReadingSpec[] = [
  { title: 'A fair family routine', passage: 'The Nguyen family uses a weekly board to share housework. Minh cooks with his father on Mondays, while his sister waters the plants. At weekends, everyone cleans one room. The routine gives the parents more rest and teaches the children to manage time.', subject: 'the Nguyen family', action: 'uses a weekly board to divide household tasks', place: 'at home', benefit: 'the children learn to manage time', falseDetail: 'Only the mother does the housework' },
  { title: 'A greener school day', passage: 'Students at Hoa Binh School held a green day in the school yard. They exchanged old books, collected cans and planted herbs in reused containers. The science club then showed how to sort waste. By the end of the day, the school had sent much less rubbish to the landfill.', subject: 'students at Hoa Binh School', action: 'exchanged books and collected recyclable items', place: 'in the school yard', benefit: 'the school produced less landfill waste', falseDetail: 'The students bought new plastic containers' },
  { title: 'Music for the library', passage: 'Mai and her friends organised a small concert at their community library. Local musicians performed without payment, and parents sold homemade cakes. The event raised enough money to buy eighty new English books. It also encouraged several teenagers to join the library club.', subject: 'Mai and her friends', action: 'organised a fundraising concert', place: 'at the community library', benefit: 'eighty new English books were purchased', falseDetail: 'The musicians demanded a high fee' },
  { title: 'Saturday volunteers', passage: 'Every second Saturday, Nam’s class visits a centre for older people. The students read newspapers, help with smartphones and listen to life stories. Nam first felt shy, but he soon understood that careful listening can be as valuable as practical help.', subject: 'Nam’s class', action: 'visits and supports older people', place: 'at a centre for older people', benefit: 'students learn the value of careful listening', falseDetail: 'Nam felt confident from the first visit' },
  { title: 'A useful water alarm', passage: 'Two students designed a small alarm for household water tanks. A sensor sends a message when a tank is nearly empty or overflowing. Their first model was made from inexpensive parts. Several families tested it and reported that they wasted less water.', subject: 'two students', action: 'designed an alarm for water tanks', place: 'in several family homes', benefit: 'families wasted less water', falseDetail: 'The first model used costly imported parts' },
  { title: 'Equal chances in robotics', passage: 'A robotics club noticed that very few girls joined its workshops. The members invited a female engineer to talk about her career and offered beginner sessions for everyone. Within two months, the number of girls doubled, and mixed teams created the club’s best projects.', subject: 'a robotics club', action: 'made its workshops more welcoming', place: 'at the robotics club', benefit: 'more girls joined and teams improved', falseDetail: 'The club limited beginner sessions to boys' },
  { title: 'The rooftop garden', passage: 'Class 10A turned an unused rooftop corner into a vegetable garden. They collected rainwater and made compost from fruit peel. The vegetables are given to the school kitchen. Students now understand that small practical choices can reduce waste.', subject: 'Class 10A', action: 'created a rooftop vegetable garden', place: 'on an unused school rooftop', benefit: 'students reduce waste and supply vegetables', falseDetail: 'The class uses chemical waste as compost' },
  { title: 'A family podcast', passage: 'Linh records a short podcast with her grandfather every Sunday. He tells stories about family life in the past, and she edits the sound on a laptop. Relatives living far away listen online. The project has brought three generations closer together.', subject: 'Linh and her grandfather', action: 'make a weekly family podcast', place: 'at home and online', benefit: 'three generations feel more connected', falseDetail: 'The podcast is recorded once a year' },
  { title: 'Repair before replacing', passage: 'The school technology club runs a repair desk after class. Students clean slow laptops, replace simple parts and show owners how to protect batteries. They cannot fix every device, but they have prevented dozens of phones and computers from becoming electronic waste.', subject: 'the school technology club', action: 'repairs and maintains electronic devices', place: 'at an after-school repair desk', benefit: 'less electronic waste is produced', falseDetail: 'Every broken device is immediately replaced' },
  { title: 'A concert without plastic', passage: 'For the spring concert, organisers asked visitors to bring refillable bottles. Food stalls used paper trays, and clearly marked bins were placed beside every exit. Volunteers later sorted the waste. The event was enjoyable and produced half as much plastic rubbish as the previous concert.', subject: 'the spring concert organisers', action: 'reduced single-use plastic at an event', place: 'at the spring concert', benefit: 'plastic waste was cut by half', falseDetail: 'No waste bins were available' },
  { title: 'Books on wheels', passage: 'A group of volunteers converted an old bus into a mobile library. Twice a month, it travels to villages where children have few books. Visitors can borrow stories, join reading games and use two tablets. The service has helped many children read more regularly.', subject: 'a volunteer group', action: 'created a mobile library in an old bus', place: 'in villages with limited books', benefit: 'children read more regularly', falseDetail: 'Children must pay to borrow every book' },
  { title: 'The solar study lamp', passage: 'An invented study lamp stores solar energy during the day and provides light for up to six hours at night. It was tested by students in an area with occasional power cuts. They could complete homework safely without using smoky oil lamps.', subject: 'students in an area with power cuts', action: 'tested a solar-powered study lamp', place: 'in homes affected by power cuts', benefit: 'homework can be done with safe clean light', falseDetail: 'The lamp can work only when connected to the electricity grid' },
  { title: 'Sharing careers fairly', passage: 'At a school career day, speakers included male nurses, female engineers and parents who shared childcare equally. Students discussed how stereotypes can influence choices. Afterward, more learners said they would choose a career based on ability and interest rather than gender.', subject: 'students at a career day', action: 'discussed careers beyond gender stereotypes', place: 'at school', benefit: 'learners focused more on ability and interest', falseDetail: 'Speakers promoted fixed jobs for each gender' },
  { title: 'From leftovers to lunches', passage: 'A community kitchen collects safe unused food from restaurants each evening. Volunteers check, store and turn it into lunches for people in need. Clear safety rules are followed throughout the process. The project reduces food waste while supporting local residents.', subject: 'a community kitchen', action: 'turns safe restaurant leftovers into lunches', place: 'in the local community', benefit: 'food waste falls and residents receive support', falseDetail: 'Volunteers accept food without checking it' },
  { title: 'An app for bus users', passage: 'A student team created an app showing the expected arrival time of local buses. Users can report delays, but the reports are checked before appearing publicly. Older residents helped test the large-text mode. The app has made daily travel easier for different age groups.', subject: 'a student development team', action: 'created and tested a local bus app', place: 'on the local bus network', benefit: 'daily travel is easier for several age groups', falseDetail: 'All delay reports appear without being checked' },
  { title: 'One hour for the river', passage: 'Residents meet beside the river on the first Sunday of each month. For one hour, they collect litter and record the types of waste they find. The data is sent to local shops, which have begun reducing unnecessary packaging. The project combines direct action with long-term change.', subject: 'local residents', action: 'clean and monitor waste beside the river', place: 'along the local river', benefit: 'shops are reducing unnecessary packaging', falseDetail: 'The group meets every morning' },
  { title: 'A balanced end-of-term plan', passage: 'Before the final exam, Phuong divided her revision into short daily sessions. She reviewed vocabulary with cards, explained grammar rules aloud and completed one reading task each evening. She also kept time for sleep and exercise. After two weeks, she felt calmer and made fewer careless mistakes.', subject: 'Phuong', action: 'followed a balanced daily revision plan', place: 'at home before the final exam', benefit: 'she felt calmer and made fewer mistakes', falseDetail: 'She studied all night and stopped exercising' },
];

const readingQuestions = (spec: ReadingSpec): Template[] => [
  { section: 'Reading', prompt: `What is the passage “${spec.title}” mainly about?`, options: [spec.action, spec.falseDetail, 'A commercial advertisement', 'A holiday with no learning purpose'], answer: 0, explanation: `Bài đọc tập trung vào việc ${spec.action.toLowerCase()}. Các lựa chọn còn lại trái với thông tin hoặc không phải ý chính.` },
  { section: 'Reading', prompt: `Who is the main subject of “${spec.title}”?`, options: [spec.subject, 'international tourists', 'professional athletes', 'online shop owners'], answer: 0, explanation: `Ngay phần mở đầu, bài đọc xác định chủ thể chính là ${spec.subject}.` },
  { section: 'Reading', prompt: 'Where does the main activity take place?', options: [spec.place, 'at an international airport', 'inside a large factory', 'on a foreign holiday'], answer: 0, explanation: `Chi tiết địa điểm trong bài là ${spec.place}; ba phương án còn lại không xuất hiện.` },
  { section: 'Reading', prompt: `The activity brings this benefit: ${spec.benefit}.`, options: ['True', 'False'], answer: 0, explanation: `Đúng. Bài đọc nêu rõ kết quả/lợi ích là ${spec.benefit}.` },
  { section: 'Reading', prompt: `${spec.falseDetail}.`, options: ['True', 'False'], answer: 1, explanation: `Sai. Chi tiết này trái với bài đọc; cần dựa vào thông tin được nêu trực tiếp thay vì suy đoán.` },
];

type ExamSpec = { id: number; menuLabel: string; menuGroup: 'midterm' | 'review' | 'final'; title: string; theme: string; reading: number; offset: number };

const specs: ExamSpec[] = [
  ...Array.from({ length: 6 }, (_, index) => ({ id: index + 7, menuLabel: `Giữa kỳ I · Đề ${index + 1}`, menuGroup: 'midterm' as const, title: `English 10 · Đề giữa kỳ I số ${index + 1}`, theme: 'Units 1–3 · Không gồm phần nghe', reading: index, offset: index * 7 })),
  { id: 13, menuLabel: 'Ôn tập cuối kỳ I', menuGroup: 'review', title: 'English 10 · Ôn tập cuối kỳ I', theme: 'Tổng ôn Units 1–6 · 25 câu', reading: 16, offset: 19 },
  ...Array.from({ length: 10 }, (_, index) => ({ id: index + 14, menuLabel: `Cuối kỳ I · Đề ${index + 1}`, menuGroup: 'final' as const, title: `English 10 · Đề cuối kỳ I số ${index + 1}`, theme: 'Units 1–6 · Không gồm phần nghe', reading: index + 6, offset: index * 9 + 3 })),
];

const selectLanguage = (offset: number): Template[] => {
  const chosen: Template[] = [];
  let cursor = offset % bank.length;
  while (chosen.length < 20) {
    const candidate = bank[cursor];
    if (!chosen.includes(candidate)) chosen.push(candidate);
    cursor = (cursor + 7) % bank.length;
  }
  return chosen;
};

export const semesterOneExams10: Exam[] = specs.map((spec) => {
  const reading = readings[spec.reading];
  const templates = [...selectLanguage(spec.offset), ...readingQuestions(reading)];
  return {
    id: spec.id,
    menuLabel: spec.menuLabel,
    menuGroup: spec.menuGroup,
    title: spec.title,
    theme: spec.theme,
    sourceNote: 'Bộ câu hỏi được biên soạn lại theo phạm vi kiến thức và cấu trúc đề Tiếng Anh 10 Global Success trên Loigiaihay; không sao chép nguyên văn và đã loại bỏ phần nghe.',
    passageTitle: reading.title,
    passage: reading.passage,
    reviewNotes: spec.menuGroup === 'review' ? [
      { title: 'Các thì trọng tâm', rule: 'Hiện tại đơn diễn tả thói quen; hiện tại tiếp diễn diễn tả việc đang xảy ra; quá khứ đơn đi với thời điểm đã kết thúc; hiện tại hoàn thành nối quá khứ với hiện tại.', example: 'She usually studies at seven, but she is resting now.' },
      { title: 'Bị động', rule: 'Dùng be + V3 khi chủ ngữ nhận hành động. Với động từ khuyết thiếu: modal + be + V3.', example: 'The app was developed by students. Equal chances should be given to everyone.' },
      { title: 'Động từ nguyên mẫu và V-ing', rule: 'Hope/decide + to V; let + O + V; giới từ và look forward to + V-ing.', example: 'We decided to volunteer and look forward to meeting the children.' },
      { title: 'Đọc hiểu', rule: 'Đọc câu hỏi trước, gạch chân từ khóa, tìm câu chứa thông tin tương ứng rồi loại phương án suy diễn hoặc trái nghĩa.', example: 'Với True/False, chỉ chọn True khi thông tin được bài đọc xác nhận.' },
    ] : undefined,
    questions: templates.map((item, index) => ({ ...item, id: index + 1 })),
  };
});

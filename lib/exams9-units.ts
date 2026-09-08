import type { Exam, Question } from './exams';

type ReviewNote = NonNullable<Exam['reviewNotes']>[number];
type VocabItem = { word: string; meaning: string };
type GrammarItem = { prompt: string; options: string[]; answer: number; explanation: string };
type UnitSpec = {
  id: number;
  title: string;
  topic: string;
  vocabulary: VocabItem[];
  notes: ReviewNote[];
  grammar: GrammarItem[];
};

const unitSpecs: UnitSpec[] = [
  {
    id: 1,
    title: 'Local Community',
    topic: 'Community helpers · Local products · Wh-word + to V · Phrasal verbs',
    vocabulary: [
      { word: 'artisan', meaning: 'thợ thủ công lành nghề' },
      { word: 'craft village', meaning: 'làng nghề thủ công' },
      { word: 'community centre', meaning: 'trung tâm sinh hoạt cộng đồng' },
      { word: 'local speciality', meaning: 'đặc sản địa phương' },
      { word: 'handicraft', meaning: 'đồ thủ công' },
      { word: 'preserve', meaning: 'bảo tồn, gìn giữ' },
      { word: 'firefighter', meaning: 'lính cứu hỏa' },
      { word: 'pottery', meaning: 'đồ gốm, nghề làm gốm' },
      { word: 'pass down', meaning: 'truyền lại cho thế hệ sau' },
      { word: 'get on with', meaning: 'có quan hệ hòa thuận với' },
    ],
    notes: [
      { title: 'Wh-word + to-infinitive', rule: 'Dùng who, what, where, when hoặc how + to V sau know, decide, ask, tell, show… để diễn đạt câu hỏi gián tiếp. Không dùng why + to V.', example: 'We do not know where to buy the local pottery.' },
      { title: 'Phrasal verbs', rule: 'Cụm động từ có nghĩa như một đơn vị. Với cụm có thể tách, đại từ thường đứng giữa động từ và tiểu từ.', example: 'My grandmother passed the recipe down to me.' },
    ],
    grammar: [
      { prompt: 'Lan cannot decide ___ to interview for the community project.', options: ['who', 'why', 'which does she', 'who does'], answer: 0, explanation: 'Sau “decide” có thể dùng “who + to V”. “Who to interview” nghĩa là phỏng vấn ai; câu gián tiếp không dùng trợ động từ “does”.' },
      { prompt: 'Could you show me ___ to make this clay bowl?', options: ['how', 'what', 'who', 'why'], answer: 0, explanation: '“How to make” diễn tả cách làm. Mẫu đúng là show somebody how to + động từ nguyên thể.' },
      { prompt: 'We have not decided ___ to hold the village fair.', options: ['where', 'whose', 'why to', 'where do we'], answer: 0, explanation: '“Where to hold” nghĩa là tổ chức ở đâu. Không đảo trợ động từ trong cấu trúc wh-word + to V.' },
      { prompt: 'The artisan taught us ___ to use the traditional tool.', options: ['how', 'when did', 'why to', 'what did'], answer: 0, explanation: 'Dùng “how to use” để nói cách sử dụng công cụ. Các phương án có đảo ngữ không phù hợp với câu gián tiếp.' },
      { prompt: 'Do you know ___ to contact in an emergency?', options: ['who', 'why', 'when does', 'what is'], answer: 0, explanation: 'Động từ “contact” cần tân ngữ chỉ người, vì vậy dùng “who to contact”.' },
      { prompt: 'This skill was passed ___ from generation to generation.', options: ['down', 'away', 'off', 'out'], answer: 0, explanation: '“Pass down” nghĩa là truyền lại kiến thức, kỹ năng hoặc truyền thống cho thế hệ sau.' },
      { prompt: 'The volunteers are carrying ___ a clean-up campaign.', options: ['out', 'on', 'down', 'away'], answer: 0, explanation: '“Carry out” nghĩa là thực hiện. “Carry out a campaign” là thực hiện một chiến dịch.' },
      { prompt: 'Mai gets ___ well with the people in her neighbourhood.', options: ['on', 'over', 'up', 'away'], answer: 0, explanation: '“Get on well with somebody” nghĩa là có mối quan hệ hòa thuận với ai.' },
      { prompt: 'Please find ___ when the community centre opens.', options: ['out', 'down', 'up with', 'over'], answer: 0, explanation: '“Find out” nghĩa là tìm hiểu hoặc phát hiện thông tin.' },
      { prompt: 'The town plans to set ___ a weekend market for local products.', options: ['up', 'off', 'down', 'out of'], answer: 0, explanation: '“Set up” nghĩa là thành lập hoặc tổ chức một hoạt động/cơ sở mới.' },
    ],
  },
  {
    id: 2,
    title: 'City Life',
    topic: 'Urban life · Double comparatives · Phrasal verbs',
    vocabulary: [
      { word: 'bustling', meaning: 'nhộn nhịp, đầy hoạt động' },
      { word: 'congested', meaning: 'ùn tắc, đông nghịt' },
      { word: 'downtown', meaning: 'khu trung tâm thành phố' },
      { word: 'rush hour', meaning: 'giờ cao điểm' },
      { word: 'public transport', meaning: 'giao thông công cộng' },
      { word: 'pedestrian', meaning: 'người đi bộ' },
      { word: 'liveable', meaning: 'đáng sống' },
      { word: 'affordable', meaning: 'có giá phải chăng' },
      { word: 'amenity', meaning: 'tiện ích, dịch vụ phục vụ đời sống' },
      { word: 'skyscraper', meaning: 'nhà chọc trời' },
    ],
    notes: [
      { title: 'So sánh kép', rule: 'The + comparative + S + V, the + comparative + S + V diễn tả hai sự thay đổi phụ thuộc lẫn nhau. Dùng more/less với tính từ dài và fewer với danh từ đếm được.', example: 'The safer the streets are, the more people walk.' },
      { title: 'Phrasal verbs về thành phố', rule: 'Học cả cụm theo ngữ cảnh: get around (di chuyển), run out of (hết), put up with (chịu đựng), cut down on (cắt giảm).', example: 'We get around the city by metro.' },
    ],
    grammar: [
      { prompt: 'The more reliable the metro is, the ___ people will drive.', options: ['fewer', 'few', 'less', 'least'], answer: 0, explanation: 'People là danh từ đếm được số nhiều nên dùng “fewer”. Đây là mẫu so sánh kép “the more…, the fewer…”.' },
      { prompt: 'The ___ the rent becomes, the harder it is for students to live downtown.', options: ['higher', 'high', 'highest', 'more high'], answer: 0, explanation: 'Tính từ ngắn “high” có dạng so sánh hơn “higher”. Cấu trúc đúng: The higher…, the harder…' },
      { prompt: 'The more crowded the road is, the ___ the buses move.', options: ['more slowly', 'most slowly', 'slow', 'slowerly'], answer: 0, explanation: 'Bổ nghĩa cho động từ “move” cần trạng từ “slowly”; dạng so sánh hơn là “more slowly”.' },
      { prompt: 'The nearer we live to school, the ___ time we spend travelling.', options: ['less', 'fewer', 'least', 'little'], answer: 0, explanation: 'Time là danh từ không đếm được nên dùng “less time”.' },
      { prompt: 'The city becomes ___ attractive as its parks improve.', options: ['more and more', 'most and most', 'much and much', 'more and most'], answer: 0, explanation: '“More and more + adjective” diễn tả mức độ tăng dần: ngày càng hấp dẫn.' },
      { prompt: 'Visitors can get ___ the city easily by metro.', options: ['around', 'over', 'down', 'away'], answer: 0, explanation: '“Get around” nghĩa là di chuyển từ nơi này sang nơi khác trong một khu vực.' },
      { prompt: 'We ran ___ petrol during the evening rush hour.', options: ['out of', 'away from', 'down on', 'up with'], answer: 0, explanation: '“Run out of + noun” nghĩa là dùng hết một thứ gì đó.' },
      { prompt: 'Residents should cut down ___ private car use.', options: ['on', 'with', 'at', 'for'], answer: 0, explanation: 'Cụm đúng là “cut down on” = cắt giảm lượng sử dụng.' },
      { prompt: 'I cannot put up ___ the construction noise any longer.', options: ['with', 'on', 'from', 'about'], answer: 0, explanation: '“Put up with” nghĩa là chịu đựng một điều khó chịu.' },
      { prompt: 'The council will look ___ complaints about unsafe pavements.', options: ['into', 'after', 'up with', 'out of'], answer: 0, explanation: '“Look into” nghĩa là điều tra hoặc xem xét kỹ một vấn đề.' },
    ],
  },
  {
    id: 3,
    title: 'Healthy Living for Teens',
    topic: 'Teen health · First conditional with modal verbs',
    vocabulary: [
      { word: 'well-balanced', meaning: 'cân bằng, hài hòa' },
      { word: 'peer pressure', meaning: 'áp lực từ bạn bè đồng trang lứa' },
      { word: 'deadline', meaning: 'hạn chót' },
      { word: 'mental health', meaning: 'sức khỏe tinh thần' },
      { word: 'concentrate', meaning: 'tập trung' },
      { word: 'prioritise', meaning: 'sắp xếp việc ưu tiên' },
      { word: 'overwhelmed', meaning: 'quá tải, choáng ngợp' },
      { word: 'counsellor', meaning: 'chuyên viên tư vấn' },
      { word: 'get enough sleep', meaning: 'ngủ đủ giấc' },
      { word: 'manage time', meaning: 'quản lý thời gian' },
    ],
    notes: [
      { title: 'Điều kiện loại 1', rule: 'Mệnh đề if dùng hiện tại đơn. Mệnh đề chính có thể dùng will hoặc can, may, might, must, should + V để diễn tả khả năng, cho phép, dự đoán, nghĩa vụ hoặc lời khuyên.', example: 'If you feel stressed, you should talk to an adult.' },
      { title: 'Lưu ý', rule: 'Không dùng will sau if trong mẫu cơ bản; sau động từ khuyết thiếu luôn là động từ nguyên thể không “to”.', example: 'If you plan carefully, you can finish on time.' },
    ],
    grammar: [
      { prompt: 'If you feel exhausted, you ___ take a short break.', options: ['should', 'should to', 'will to', 'are'], answer: 0, explanation: '“Should + V” đưa ra lời khuyên. Sau should dùng động từ nguyên thể “take”, không có “to”.' },
      { prompt: 'If Nam ___ enough sleep, he may find it hard to concentrate.', options: ['does not get', 'will not get', 'not gets', 'did not get'], answer: 0, explanation: 'Mệnh đề if của điều kiện loại 1 dùng hiện tại đơn: does not get.' },
      { prompt: 'You ___ talk to the school counsellor if the pressure continues.', options: ['can', 'can to', 'are can', 'will can'], answer: 0, explanation: '“Can + V” diễn tả một lựa chọn khả thi. Không dùng “to” sau can và không kết hợp “will can”.' },
      { prompt: 'If the deadline is tomorrow, we ___ finish this task today.', options: ['must', 'must to', 'will must to', 'are must'], answer: 0, explanation: '“Must + V” diễn tả sự cần thiết. Sau must là động từ nguyên thể.' },
      { prompt: 'If you make a study plan, you ___ feel less overwhelmed.', options: ['may', 'may to', 'are may', 'have may'], answer: 0, explanation: '“May + V” diễn tả khả năng có thể xảy ra: may feel.' },
      { prompt: 'If Mai ___ her phone away, she can concentrate better.', options: ['puts', 'will put', 'putting', 'is put'], answer: 0, explanation: 'Mệnh đề điều kiện dùng hiện tại đơn. Mai là ngôi thứ ba số ít nên “put” thêm -s.' },
      { prompt: 'If you have a high fever, you ___ see a doctor.', options: ['should', 'might to', 'can seeing', 'will to'], answer: 0, explanation: '“Should see” là lời khuyên phù hợp; modal verb đi với động từ nguyên thể.' },
      { prompt: 'You might sleep better if you ___ caffeine in the evening.', options: ['avoid', 'will avoid', 'avoided will', 'are avoid'], answer: 0, explanation: 'Khi mệnh đề if đứng sau, quy tắc vẫn không đổi: dùng hiện tại đơn “avoid”.' },
      { prompt: 'If students exercise regularly, they ___ improve their mood.', options: ['can', 'can to', 'will can', 'are able improve'], answer: 0, explanation: '“Can improve” diễn tả khả năng/lợi ích có thể đạt được.' },
      { prompt: 'If your friend seems distressed, you ___ ignore the signs.', options: ['should not', 'do not should', 'must not to', 'will not to'], answer: 0, explanation: 'Lời khuyên phủ định dùng “should not + V”: should not ignore.' },
    ],
  },
  {
    id: 4,
    title: 'Remembering the Past',
    topic: 'Past life · Past continuous · Wish + past simple',
    vocabulary: [
      { word: 'ancestor', meaning: 'tổ tiên' },
      { word: 'heritage', meaning: 'di sản' },
      { word: 'thatched house', meaning: 'nhà mái tranh' },
      { word: 'extended family', meaning: 'gia đình nhiều thế hệ, gia đình mở rộng' },
      { word: 'worship', meaning: 'thờ cúng' },
      { word: 'preserve', meaning: 'bảo tồn' },
      { word: 'tradition', meaning: 'truyền thống' },
      { word: 'facility', meaning: 'cơ sở vật chất, tiện nghi' },
      { word: 'generation', meaning: 'thế hệ' },
      { word: 'historical site', meaning: 'di tích lịch sử' },
    ],
    notes: [
      { title: 'Quá khứ tiếp diễn', rule: 'S + was/were + V-ing diễn tả hành động đang xảy ra tại một thời điểm trong quá khứ hoặc đang diễn ra khi một hành động ngắn xen vào.', example: 'We were visiting the temple when it started to rain.' },
      { title: 'Wish + quá khứ đơn', rule: 'Dùng wish + S + past simple cho mong muốn trái với hiện tại hoặc khó xảy ra. “Were” có thể dùng cho mọi ngôi trong văn phong trang trọng.', example: 'I wish our town had more old houses.' },
    ],
    grammar: [
      { prompt: 'At eight last night, Grandma ___ us a story about her childhood.', options: ['was telling', 'told now', 'is telling', 'has told'], answer: 0, explanation: '“At eight last night” chỉ một thời điểm cụ thể trong quá khứ, nên dùng was telling.' },
      { prompt: 'We ___ around the old village when the rain began.', options: ['were walking', 'walk', 'have walked', 'are walking'], answer: 0, explanation: 'Hành động đi bộ đang diễn ra thì “the rain began” xen vào: were walking + past simple.' },
      { prompt: 'While my parents were cooking, I ___ old family photos.', options: ['was arranging', 'am arranging', 'have arranged', 'arrange'], answer: 0, explanation: 'Hai hành động cùng đang diễn ra trong quá khứ có thể dùng quá khứ tiếp diễn: was arranging.' },
      { prompt: 'The children ___ folk games all afternoon.', options: ['were playing', 'have played', 'play', 'are played'], answer: 0, explanation: '“All afternoon” trong bối cảnh quá khứ nhấn mạnh khoảng thời gian hành động diễn ra, nên dùng were playing.' },
      { prompt: 'What ___ you ___ at 9 p.m. yesterday?', options: ['were / doing', 'did / doing', 'are / do', 'have / done'], answer: 0, explanation: 'Câu hỏi quá khứ tiếp diễn: What + were + you + V-ing?' },
      { prompt: 'I wish our neighbourhood ___ its old communal house.', options: ['still had', 'has', 'will have', 'is having'], answer: 0, explanation: 'Mong muốn trái với hiện tại dùng wish + quá khứ đơn: still had.' },
      { prompt: 'Lan wishes she ___ more about her family history.', options: ['knew', 'knows', 'will know', 'has known'], answer: 0, explanation: 'Wish về điều không đúng ở hiện tại dùng quá khứ đơn “knew”.' },
      { prompt: 'We wish the museum ___ closer to our school.', options: ['were', 'is', 'will be', 'has been'], answer: 0, explanation: 'Sau wish có thể dùng “were” cho mọi ngôi để diễn tả tình huống trái với hiện tại.' },
      { prompt: 'My brother wishes he ___ to work on Sundays.', options: ['did not have', 'does not have', 'will not have', 'not had'], answer: 0, explanation: 'Mong muốn thay đổi tình trạng hiện tại dùng wish + past simple: did not have to.' },
      { prompt: 'I wish people ___ more traditional buildings.', options: ['preserved', 'preserve now', 'will preserve', 'are preserving'], answer: 0, explanation: 'Sau wish dùng quá khứ đơn “preserved” để nói mong muốn về hiện tại.' },
    ],
  },
  {
    id: 5,
    title: 'Our Experiences',
    topic: 'Memorable experiences · Present perfect',
    vocabulary: [
      { word: 'unforgettable', meaning: 'không thể nào quên' },
      { word: 'thrilling', meaning: 'hồi hộp, đầy phấn khích' },
      { word: 'embarrassing', meaning: 'gây xấu hổ, ngượng ngùng' },
      { word: 'unpleasant', meaning: 'không dễ chịu' },
      { word: 'snorkelling', meaning: 'lặn với ống thở' },
      { word: 'put up a tent', meaning: 'dựng lều' },
      { word: 'give a performance', meaning: 'biểu diễn' },
      { word: 'explore', meaning: 'khám phá' },
      { word: 'eco-tour', meaning: 'chuyến du lịch sinh thái' },
      { word: 'memorable', meaning: 'đáng nhớ' },
    ],
    notes: [
      { title: 'Hiện tại hoàn thành', rule: 'S + have/has + V3/ed. Dùng cho trải nghiệm hoặc hành động đã xảy ra nhưng không nêu thời điểm quá khứ cụ thể.', example: 'I have visited an ancient village.' },
      { title: 'Ever, never, already, yet', rule: 'Ever thường dùng trong câu hỏi trải nghiệm; never mang nghĩa chưa từng; already thường ở câu khẳng định; yet thường ở cuối câu hỏi/phủ định.', example: 'Have you ever tried snorkelling?' },
    ],
    grammar: [
      { prompt: 'Mai ___ an eco-tour twice.', options: ['has taken', 'took yesterday', 'is taking', 'takes now'], answer: 0, explanation: 'Trải nghiệm tính đến hiện tại và không nêu thời điểm cụ thể dùng hiện tại hoàn thành: has taken.' },
      { prompt: '___ you ever ___ a performance in front of a large audience?', options: ['Have / given', 'Did / given', 'Has / gave', 'Are / giving'], answer: 0, explanation: 'Câu hỏi trải nghiệm với “ever”: Have + you + V3. V3 của give là given.' },
      { prompt: 'I have never ___ in a helicopter.', options: ['flown', 'flew', 'fly', 'flying'], answer: 0, explanation: 'Sau have never cần quá khứ phân từ. V3 của fly là flown.' },
      { prompt: 'Nam ___ his project already.', options: ['has finished', 'finished last night', 'finish', 'is finish'], answer: 0, explanation: '“Already” thường đi với hiện tại hoàn thành để nhấn mạnh việc đã hoàn tất: has finished.' },
      { prompt: 'We have not put up the tent ___.', options: ['yet', 'ever', 'already', 'last week'], answer: 0, explanation: '“Yet” thường đứng cuối câu phủ định hiện tại hoàn thành, nghĩa là vẫn chưa.' },
      { prompt: 'My sister ___ Japan in 2024.', options: ['visited', 'has visited', 'visits ever', 'has visit'], answer: 0, explanation: 'Có thời điểm quá khứ xác định “in 2024” nên dùng quá khứ đơn, không dùng hiện tại hoàn thành.' },
      { prompt: 'They ___ three cities so far.', options: ['have toured', 'toured yesterday', 'tour now', 'has toured'], answer: 0, explanation: '“So far” là dấu hiệu hiện tại hoàn thành. Chủ ngữ they dùng have toured.' },
      { prompt: 'Has Minh ever ___ a horse?', options: ['ridden', 'rode', 'ride', 'riding'], answer: 0, explanation: 'Sau has cần V3. Ride – rode – ridden, nên chọn ridden.' },
      { prompt: 'This is the most exciting trip I ___.', options: ['have ever had', 'ever have', 'had tomorrow', 'am having yesterday'], answer: 0, explanation: 'Sau cấu trúc so sánh nhất nói về trải nghiệm đến hiện tại thường dùng hiện tại hoàn thành: have ever had.' },
      { prompt: 'Lan and Hoa ___ home from the camp yet.', options: ['have not returned', 'has not returned', 'did not returned', 'not return'], answer: 0, explanation: 'Chủ ngữ số nhiều dùng have not + V3. “Yet” củng cố lựa chọn hiện tại hoàn thành.' },
    ],
  },
  {
    id: 6,
    title: 'Vietnamese Lifestyles: Then and Now',
    topic: 'Lifestyle changes · Verbs + V-ing/to-infinitive',
    vocabulary: [
      { word: 'generation gap', meaning: 'khoảng cách thế hệ' },
      { word: 'family-oriented', meaning: 'coi trọng, hướng về gia đình' },
      { word: 'privacy', meaning: 'sự riêng tư' },
      { word: 'pursue', meaning: 'theo đuổi mục tiêu, ước mơ' },
      { word: 'independent', meaning: 'độc lập, tự chủ' },
      { word: 'face-to-face', meaning: 'trực tiếp, mặt đối mặt' },
      { word: 'lifestyle', meaning: 'lối sống' },
      { word: 'family values', meaning: 'các giá trị gia đình' },
      { word: 'household appliance', meaning: 'thiết bị gia dụng' },
      { word: 'learning facility', meaning: 'cơ sở vật chất phục vụ học tập' },
    ],
    notes: [
      { title: 'Động từ + to V', rule: 'Want, promise, decide, agree, learn và plan thường đi với to-infinitive.', example: 'We decided to interview our grandparents.' },
      { title: 'Động từ + V-ing', rule: 'Enjoy, fancy, finish, mind, avoid và suggest thường đi với V-ing. Dạng phủ định có thể là not + V-ing.', example: 'She suggested visiting the history museum.' },
    ],
    grammar: [
      { prompt: 'We decided ___ our grandparents about life in the past.', options: ['to interview', 'interviewing', 'interviewed', 'interview'], answer: 0, explanation: '“Decide” đi với to-infinitive: decide to interview.' },
      { prompt: 'My brother enjoys ___ about traditional farming.', options: ['learning', 'to learning', 'learned', 'learn'], answer: 0, explanation: '“Enjoy” đi với V-ing, vì vậy dùng learning.' },
      { prompt: 'Lan promised ___ the family photos carefully.', options: ['to keep', 'keeping', 'kept', 'keep'], answer: 0, explanation: '“Promise” đi với to + động từ nguyên thể: promised to keep.' },
      { prompt: 'Would you mind ___ your phone during dinner?', options: ['not using', 'not to use', 'do not use', 'not used'], answer: 0, explanation: '“Mind” đi với V-ing; dạng phủ định là mind not using.' },
      { prompt: 'They plan ___ a display about changing lifestyles.', options: ['to create', 'creating', 'created', 'create'], answer: 0, explanation: '“Plan” đi với to-infinitive: plan to create.' },
      { prompt: 'We should avoid ___ every piece of information online.', options: ['believing', 'to believe', 'believed', 'believe'], answer: 0, explanation: '“Avoid” đi với V-ing: avoid believing.' },
      { prompt: 'The teacher suggested ___ older family members.', options: ['asking', 'to asking', 'asked', 'ask to'], answer: 0, explanation: '“Suggest” trong mẫu này đi với V-ing: suggested asking.' },
      { prompt: 'My grandfather has learned ___ video calls.', options: ['to use', 'using to', 'used', 'use'], answer: 0, explanation: '“Learn” đi với to-infinitive khi nói học cách làm gì: learn to use.' },
      { prompt: 'Have you finished ___ the old photographs?', options: ['sorting', 'to sort', 'sorted to', 'sort'], answer: 0, explanation: '“Finish” đi với V-ing: finish sorting.' },
      { prompt: 'The students agreed ___ their findings with the class.', options: ['to share', 'sharing', 'shared', 'share'], answer: 0, explanation: '“Agree” đi với to-infinitive: agree to share.' },
    ],
  },
];

function vocabularyQuestions(items: VocabItem[]): Question[] {
  return items.map((item, index) => {
    const answer = index % 4;
    const distractors = [1, 2, 3].map((step) => items[(index + step) % items.length].word);
    const options = [...distractors];
    options.splice(answer, 0, item.word);
    return {
      id: index + 1,
      section: 'Language Focus',
      prompt: `Từ hoặc cụm từ nào có nghĩa “${item.meaning}”?`,
      options,
      answer,
      explanation: `“${item.word}” có nghĩa là “${item.meaning}”. Hãy học từ trong một cụm hoặc câu hoàn chỉnh để nhớ cách dùng, không chỉ học nghĩa riêng lẻ.`,
    };
  });
}

export const unitExams9: Exam[] = unitSpecs.map((unit) => ({
  id: 100 + unit.id,
  menuLabel: `Unit ${unit.id} · ${unit.title}`,
  menuGroup: 'unit',
  title: `English 9 · Unit ${unit.id}: ${unit.title}`,
  theme: `${unit.topic} · 20 câu`,
  sourceNote: 'Nội dung được biên soạn mới theo phạm vi từ vựng và ngữ pháp công khai của Tiếng Anh 9 Global Success trên Loigiaihay; không gồm nghe, phát âm hay bài đọc.',
  passageTitle: '',
  passage: '',
  reviewNotes: unit.notes,
  questions: [
    ...vocabularyQuestions(unit.vocabulary),
    ...unit.grammar.map((item, index): Question => {
      const answer = index % item.options.length;
      const correctOption = item.options[item.answer];
      const options = item.options.filter((_, optionIndex) => optionIndex !== item.answer);
      options.splice(answer, 0, correctOption);
      return {
        id: unit.vocabulary.length + index + 1,
        section: 'Language Focus',
        prompt: item.prompt,
        options,
        answer,
        explanation: item.explanation,
      };
    }),
  ],
}));

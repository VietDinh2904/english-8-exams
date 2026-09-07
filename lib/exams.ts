export type Question = {
  id: number;
  section: 'Language Focus' | 'Reading';
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  underlines?: string[];
};

export type Exam = {
  id: number;
  title: string;
  theme: string;
  passageTitle: string;
  passage: string;
  questions: Question[];
};

const q = (id: number, section: Question['section'], prompt: string, options: string[], answer: number, explanation: string, underlines?: string[]): Question => ({ id, section, prompt, options, answer, explanation, underlines });

export const exams: Exam[] = [
  {
    id: 1,
    title: 'Đề giữa học kỳ I · Đề số 1',
    theme: 'Leisure & social media',
    passageTitle: 'Facebook and students',
    passage: 'With approximately 2.96 billion users as of 2022, Facebook is one of the world’s popular social networks. Students use it for entertainment and academic learning. It is a relaxing channel where they can share memories, watch funny clips and connect with people who have the same interests through Facebook pages. It also gives learners access to free learning materials and specialized knowledge. Students can create group chats to share lectures, prepare presentations and do assignments together. In short, Facebook can contribute to academic achievement when it is used appropriately.',
    questions: [
      q(1,'Language Focus','Which word has a different underlined sound?',['upload','cruel','puzzle','muscle'],1,'Kiến thức phát âm chữ “u”: “cruel” /ˈkruː.əl/ có âm /uː/. Trong “upload”, “puzzle” và “muscle”, phần gạch chân được đọc gần âm /ʌ/. Vì vậy B là từ có cách phát âm khác.', ['u','u','u','u']),
      q(2,'Language Focus','Choose the word with a different stress pattern.',['leisure','diving','origami','movie'],2,'Kiến thức trọng âm: “origami” /ˌɒr.ɪˈɡɑː.mi/ nhấn âm tiết thứ ba. Ba từ “leisure”, “diving”, “movie” đều nhấn âm tiết thứ nhất, nên chọn C.'),
      q(3,'Language Focus','Most students detest ___ homework at weekends.',['have','having','to have','had'],1,'Cấu trúc: detest + V-ing = rất ghét làm việc gì. “Having homework” là cụm đúng. Không dùng động từ nguyên mẫu hoặc “to + V” sau “detest” trong cấu trúc này. Nghĩa: Hầu hết học sinh ghét phải làm bài tập vào cuối tuần.'),
      q(4,'Language Focus','After the course, Nam speaks English ___ than before.',['good','best','better','more well'],2,'Dấu hiệu “than” yêu cầu dạng so sánh hơn. “Well” là trạng từ bổ nghĩa cho “speaks” và có dạng so sánh bất quy tắc là “better”. Nghĩa: Sau khóa học, Nam nói tiếng Anh tốt hơn trước.'),
      q(5,'Language Focus','Posting photos is fun; ___, it can sometimes cause problems.',['although','but','however','so'],2,'Hai mệnh đề đầy đủ diễn tả sự tương phản và được ngăn bằng dấu chấm phẩy, vì vậy dùng trạng từ nối “however” kèm dấu phẩy. “Although” phải đứng trong mệnh đề phụ; “but” không đi theo mẫu dấu câu này; “so” chỉ kết quả.'),
      q(6,'Reading','What is the passage mainly about?',['Problems caused by Facebook','Benefits of Facebook for students','The history of Facebook'],1,'Cách tìm ý chính: đối chiếu câu mở đầu, các ví dụ ở thân bài và câu kết. Toàn bài nói Facebook hỗ trợ giải trí, kết nối và học tập cho học sinh, nên đáp án B bao quát nhất.'),
      q(7,'Reading','In “it is a relaxing channel”, what does “it” refer to?',['Facebook','Entertainment','School life'],0,'Đại từ “it” thay thế danh từ được nhắc gần nhất và xuyên suốt đoạn là “Facebook”. Thay “Facebook” vào câu vẫn đúng nghĩa: Facebook là một kênh thư giãn.'),
      q(8,'Reading','Where can students meet people with similar interests?',['Messenger calls','Facebook comments only','Facebook pages'],2,'Trong bài có chi tiết học sinh kết nối với người cùng sở thích “through Facebook pages”. Vì vậy chọn C; hai lựa chọn còn lại không khớp thông tin trực tiếp.'),
      q(9,'Reading','Why is Facebook useful as a knowledge platform?',['It provides free learning materials','It has many English films','It replaces every teacher'],0,'Bài đọc nêu người học được tiếp cận tài liệu miễn phí và hỏi kiến thức chuyên môn. Đáp án A diễn đạt đúng chi tiết này; bài không nói Facebook thay giáo viên.'),
      q(10,'Reading','Which is NOT a stated purpose of a learning group chat?',['Preparing presentations','Venting about school life','Doing assignments together'],1,'Từ khóa “NOT” yêu cầu tìm phương án không thuộc nhóm chat học tập. Chuẩn bị thuyết trình và làm bài cùng nhau đều được nêu; chia sẻ cảm xúc tiêu cực chỉ là hoạt động Facebook nói chung.'),
    ],
  },
  {
    id: 2,
    title: 'Đề giữa học kỳ I · Đề số 2',
    theme: 'Countryside & traditions',
    passageTitle: 'The Khmer',
    passage: 'The Khmer Krom live in southern Viet Nam and are the Mekong Delta’s second biggest ethnic group after the Kinh. It is not typical to see Khmer people wearing traditional clothing in daily life. Only women over 50 still wear it to the temple and shave their hair as a sign of respect for the Buddha. Khmer silk clothing is a work of art. The Khmer used to create their own silk, but today they buy it from the Kinh. They still dye yarn with colourful powders imported from Thailand.',
    questions: [
      q(1,'Language Focus','An enjoys ___ in his free time and hopes to become a chef.',['cook','cooking','to cooking','cooked'],1,'Cấu trúc: enjoy + V-ing = thích làm việc gì. Vì vậy dùng “cooking”. Nghĩa: An thích nấu ăn lúc rảnh và mong muốn trở thành đầu bếp.'),
      q(2,'Language Focus','My mother spoke ___ than my sister.',['loud','louder','more loudly','most loudly'],2,'“Spoke” cần trạng từ bổ nghĩa; “than” báo hiệu so sánh hơn. Trạng từ “loudly” có dạng so sánh “more loudly”. “Louder” thường là tính từ hoặc dạng thân mật, còn đề kiểm tra cấu trúc trạng từ.'),
      q(3,'Language Focus','Farmers often ___ rice and fruit in nearby fields.',['feed','hold','catch','cultivate'],3,'“Cultivate” nghĩa là canh tác, trồng trọt. “Feed” là cho ăn, “hold” là cầm/tổ chức, “catch” là bắt. Nghĩa câu: Nông dân thường trồng lúa và cây ăn quả ở các cánh đồng gần đó.'),
      q(4,'Language Focus','Tom showed us how to ___ the paper into a frog.',['log','fold','upload','connect'],1,'Cấu trúc “show someone how to + V”. Động từ “fold” nghĩa là gấp; “fold the paper into a frog” là gấp giấy thành con ếch.'),
      q(5,'Language Focus','We crossed the river by ___.',['bus','car','ferry','plane'],2,'“Ferry” là phà, phương tiện dùng để chở người hoặc xe qua sông. Các phương tiện còn lại không phù hợp với ngữ cảnh “crossed the river”.'),
      q(6,'Reading','The Khmer are the Mekong Delta’s second largest ethnic group after the Kinh.',['True','False'],0,'TRUE. Câu đầu của bài đọc nêu rõ người Khmer là nhóm dân tộc lớn thứ hai ở Đồng bằng sông Cửu Long, sau người Kinh.'),
      q(7,'Reading','Khmer people commonly wear traditional clothes every day.',['True','False'],1,'FALSE. Bài đọc dùng cụm “not typical”, nghĩa là việc mặc trang phục truyền thống trong đời sống hằng ngày không phổ biến.'),
      q(8,'Reading','Some women over 50 wear traditional clothes to the temple.',['True','False'],0,'TRUE. Bài cho biết phụ nữ trên 50 tuổi vẫn mặc trang phục truyền thống khi đến chùa để thể hiện sự tôn kính.'),
      q(9,'Reading','The Khmer still make all of their own silk today.',['True','False'],1,'FALSE. Trước đây họ tự làm lụa, nhưng hiện nay mua lụa từ người Kinh. Từ “used to” cho thấy thói quen cũ không còn tiếp tục.'),
      q(10,'Reading','The powders used to dye yarn are imported from Thailand.',['True','False'],0,'TRUE. Câu cuối xác nhận bột màu dùng để nhuộm sợi được nhập khẩu từ Thái Lan.'),
    ],
  },
  {
    id: 3,
    title: 'Đề giữa học kỳ I · Đề số 3',
    theme: 'School life & bullying',
    passageTitle: 'Bullying',
    passage: 'Bullying is a serious problem that can involve mean words, physical actions, or exclusion from a group. A study in British primary schools found that about a quarter of students said they were bullied. In secondary schools, persistent bullying occurred less frequently but was harder to deal with. Today, schools recognise how serious it is and are creating rules to stop it. Studies in different countries show that when schools take action, bullying goes down a lot.',
    questions: [
      q(1,'Language Focus','When you are bullied, you should ___ to a trusted teacher.',['talk','talking','to talking','talked'],0,'Sau động từ khuyết thiếu “should” dùng động từ nguyên mẫu không “to”: should + talk. Nghĩa: Khi bị bắt nạt, em nên nói chuyện với một giáo viên đáng tin cậy.'),
      q(2,'Language Focus','___ in green spaces can help people relieve stress.',['Walk','Walking','Walked','To walked'],1,'Khi một hành động làm chủ ngữ, ta thường dùng danh động từ V-ing. “Walking in green spaces” là cả cụm chủ ngữ; động từ chính là “can help”.'),
      q(3,'Language Focus','The local people treated their guests ___.',['hospitable','hospitality','hospitably','hospitablely'],2,'Sau động từ “treated” cần trạng từ chỉ cách thức. Từ “hospitable” đổi thành “hospitably” = một cách hiếu khách. “Hospitality” là danh từ.'),
      q(4,'Language Focus','Study harder; ___, you may not pass the test.',['otherwise','moreover','therefore','however'],0,'“Otherwise” = nếu không thì, dùng để nêu hậu quả nếu không thực hiện lời khuyên trước đó. Nghĩa: Hãy học chăm hơn; nếu không, bạn có thể không qua bài kiểm tra.'),
      q(5,'Language Focus','My uncle is ___ the goods from the truck.',['loading','unloading','herding','catching'],1,'“Unload” nghĩa là dỡ hàng xuống; “load” là chất hàng lên. Có “from the truck” nên chọn “unloading”. Thì hiện tại tiếp diễn: is + V-ing.'),
      q(6,'Reading','Which forms of bullying are mentioned?',['Mean words, physical actions and exclusion','Only physical actions','Poor school results'],0,'Bài đọc liệt kê ba hình thức: lời nói ác ý, hành động thể chất và loại trừ một người khỏi nhóm. Đáp án A chứa đủ cả ba.'),
      q(7,'Reading','How many primary pupils reported being bullied?',['About half','About a quarter','One in twenty-five'],1,'Chi tiết “about a quarter” nghĩa là khoảng một phần tư số học sinh tiểu học cho biết mình từng bị bắt nạt.'),
      q(8,'Reading','Did bullying occur more frequently in secondary schools?',['Yes, much more often','No, it occurred less frequently','The passage does not say'],1,'Bài nói bắt nạt dai dẳng ở trường trung học xảy ra ít thường xuyên hơn, dù khó xử lý hơn. Vì vậy chọn B.'),
      q(9,'Reading','What are schools doing to stop bullying?',['Closing playgrounds','Creating rules','Giving more homework'],1,'Cụm từ khóa “schools are creating rules to stop it” trả lời trực tiếp câu hỏi. Đáp án là “Creating rules”.'),
      q(10,'Reading','What happens when schools take action?',['Bullying increases','Nothing changes','Bullying goes down a lot'],2,'Câu cuối cho biết khi nhà trường hành động, tình trạng bắt nạt giảm đáng kể. “Goes down a lot” mang nghĩa giảm nhiều.'),
    ],
  },
  {
    id: 4,
    title: 'Đề giữa học kỳ I · Đề số 4',
    theme: 'Village life & family',
    passageTitle: 'Life in a southern village',
    passage: 'I feel fortunate to live in a peaceful village in southern Viet Nam. Vast fields, green trees, lakes, ponds and canals make the scenery picturesque. The air is fresh and life moves more slowly than in cities. People work hard: they grow vegetables, cultivate rice, raise cattle, grow fruit trees and fish. Children play traditional games and sometimes help their parents. Villagers know each other well and often meet in the evening to eat fruit, play chess, sing folk songs and chat.',
    questions: [
      q(1,'Language Focus','A balance between human and animal needs can prevent habitat ___.',['destroy','destroyed','destruction','destructive'],2,'Sau danh từ “habitat” cần một danh từ để tạo cụm “habitat destruction” = sự phá hủy môi trường sống. “Destroy” là động từ; “destroyed/destructive” là tính từ nên không phù hợp.'),
      q(2,'Language Focus','My sister is keen on ___ and wants to be a chef.',['cook','cooking','to cook','cooked'],1,'Cấu trúc: be keen on + danh từ/V-ing = rất thích, say mê điều gì. Vì vậy chọn “cooking”. Nghĩa: Chị tôi thích nấu ăn và muốn trở thành đầu bếp.'),
      q(3,'Language Focus','At harvest time, ___ are busy collecting crops.',['farm','farms','farmers','farming'],2,'Câu cần danh từ số nhiều chỉ người làm hành động “collecting crops”. “Farmers” là nông dân; “farm” là nông trại hoặc canh tác.'),
      q(4,'Language Focus','We ___ to nearby villages to enjoy the fresh air.',['cycle','cycles','cycling','cycled always'],0,'Đây là thói quen ở hiện tại. Chủ ngữ “we” đi với động từ nguyên mẫu “cycle”, không thêm -s. Nghĩa: Chúng tôi đạp xe tới những ngôi làng gần đó.'),
      q(5,'Language Focus','My mother teaches me ___ my own doll clothes.',['make','making','to make','made'],2,'Cấu trúc: teach + somebody + to V = dạy ai làm gì. Do đó dùng “to make”. Nghĩa: Mẹ dạy tôi tự may quần áo cho búp bê.'),
      q(6,'Reading','Life in the author’s village is peaceful.',['True','False'],0,'TRUE. Ngay câu đầu, tác giả nói mình sống trong một ngôi làng yên bình ở miền Nam Việt Nam.'),
      q(7,'Reading','People in the village work hard.',['True','False'],0,'TRUE. Bài đọc nêu trực tiếp “The people work very hard”, sau đó liệt kê các công việc trồng trọt và chăn nuôi.'),
      q(8,'Reading','Villagers live only by fishing.',['True','False'],1,'FALSE. “Only” làm câu sai: người dân còn trồng rau, lúa, cây ăn quả và nuôi gia súc, không chỉ đánh cá.'),
      q(9,'Reading','Children are always busy helping their parents.',['True','False'],1,'FALSE. Bài dùng “sometimes” (đôi khi), trong khi câu hỏi dùng “always” (luôn luôn). Hai trạng từ chỉ tần suất không tương đương.'),
      q(10,'Reading','The villagers get along well.',['True','False'],0,'TRUE. Họ biết nhau rõ, thân thiện, hiếu khách và thường gặp nhau vào buổi tối; các chi tiết này cho thấy họ hòa thuận.'),
    ],
  },
  {
    id: 5,
    title: 'Đề giữa học kỳ I · Đề số 5',
    theme: 'Nature & the British countryside',
    passageTitle: 'The countryside in Britain',
    passage: 'The British countryside is known for contrasts: bare mountains and moorland, lakes, rivers, woods and a long, often wild coastline. National parks have especially beautiful scenery. British people also associate the countryside with farmland, fields and animals. Most farmland is owned by individuals or independent companies, while the government maintains public footpaths. Many people enjoy walking, cycling, picnics and the peace of country life. Today few rural people work on farms; many commute to towns.',
    questions: [
      q(1,'Language Focus','A new factory could be ___ disastrous for the area.',['environment','environmental','environmentally','environmentalist'],2,'Tính từ “disastrous” cần trạng từ bổ nghĩa, nên dùng “environmentally” = về mặt môi trường. Cụm “environmentally disastrous” nghĩa là gây hậu quả thảm khốc cho môi trường.'),
      q(2,'Language Focus','Earth Day raises ___ of environmental issues.',['aware','awareness','awarely','unaware'],1,'Cụm cố định: raise awareness of/about = nâng cao nhận thức về. Sau “raises” cần danh từ “awareness”; “aware” là tính từ.'),
      q(3,'Language Focus','Local people are friendly to ___.',['visit','visiting','visitors','visited'],2,'Sau giới từ “to” cần danh từ chỉ đối tượng. “Visitors” nghĩa là khách tham quan/du khách. Nghĩa: Người địa phương thân thiện với du khách.'),
      q(4,'Language Focus','Climbing can ___ your strength.',['decrease','reduce','increase','lower'],2,'Sau “can” dùng động từ nguyên mẫu. Về nghĩa, leo núi giúp tăng sức mạnh nên chọn “increase”. Các từ “decrease/reduce/lower” đều mang nghĩa giảm.'),
      q(5,'Language Focus','People learn to use climbing equipment ___.',['effective','effect','effectively','effectiveness'],2,'Động từ “use” cần trạng từ chỉ cách thức “effectively” = một cách hiệu quả. “Effective” là tính từ; “effect/effectiveness” là danh từ.'),
      q(6,'Reading','Which feature is NOT listed in the opening description?',['Farmland','Moorland','Bare mountains','Lakes and woods'],0,'Từ khóa “NOT” yêu cầu loại trừ. Đoạn mở đầu liệt kê moorland, bare mountains, lakes, rivers và woods; “farmland” chỉ xuất hiện ở phần sau.'),
      q(7,'Reading','Who owns most farmland in Britain?',['Only the government','Individuals or independent companies','Tourists','National parks'],1,'Câu trong bài: phần lớn đất nông nghiệp thuộc sở hữu của cá nhân hoặc công ty độc lập. Chính phủ chỉ duy trì mạng lưới đường đi bộ công cộng.'),
      q(8,'Reading','What do many British people associate with the countryside?',['Work in towns','Heavy traffic','Peace and relaxation','Public offices'],2,'Bài nhấn mạnh người Anh tận hưởng sự yên bình và thư giãn của cuộc sống nông thôn. Vì vậy C là ý đúng và bao quát.'),
      q(9,'Reading','What does “commute” most nearly mean?',['Travel regularly to work','Walk for fun','Move permanently','Work on a farm'],0,'“Commute” nghĩa là đi lại thường xuyên giữa nhà và nơi làm việc, không hàm ý chuyển nhà hoặc chỉ dùng một phương tiện cụ thể.'),
      q(10,'Reading','Where do many rural residents work today?',['On farms','In towns','In national parks','On the coastline'],1,'Bài nói ngày nay ít người nông thôn làm việc tại trang trại; nhiều người đi làm ở thị trấn. Do đó chọn B.'),
    ],
  },
  {
    id: 6,
    title: 'Đề giữa học kỳ I · Đề số 6',
    theme: 'Hobbies & growing up',
    passageTitle: 'Knitting with Grandma',
    passage: 'My grandma and I share a pastime: knitting. She taught me when I was ten. In the evenings, we sit in front of the TV and knit. Last year I wanted a birthday present for Dad, so I found an online pattern and a YouTube video for a sweater. It took me a week to finish. Dad said it was his favourite sweater. Knitting makes you more careful and patient, although you need to practise when stitches drop or wool is held too tightly. Grandma says knitting is magical.',
    questions: [
      q(1,'Language Focus','My brother volunteers for an animal protection ___.',['organise','organised','organisation','organising'],2,'Sau tính từ ghép “animal protection” cần một danh từ chỉ tổ chức. “Organisation” = tổ chức; “organise” là động từ. Nghĩa: Anh tôi làm tình nguyện cho một tổ chức bảo vệ động vật.'),
      q(2,'Language Focus','Scientists can predict many natural ___.',['disastrous','disasters','disaster','disastrously'],1,'“Many” đi với danh từ đếm được số nhiều, nên chọn “disasters”. “Natural disasters” là cụm từ chỉ thiên tai; “disastrous” là tính từ.'),
      q(3,'Language Focus','The Internet ___ at home is weak.',['connect','connection','connected','connecting'],1,'Cụm danh từ đúng là “Internet connection” = kết nối Internet. “Weak” là tính từ mô tả chất lượng của kết nối.'),
      q(4,'Language Focus','Our factory needs more ___ workers.',['train','training','trained','trainer'],2,'“Trained” là quá khứ phân từ dùng như tính từ, nghĩa là đã được đào tạo. “Trained workers” = công nhân lành nghề/đã qua đào tạo.'),
      q(5,'Language Focus','People in my village are always willing ___ each other.',['help','to help','helping','helped'],1,'Cấu trúc: be willing to + V = sẵn lòng làm gì. Vì vậy chọn “to help”. Nghĩa: Người dân trong làng luôn sẵn lòng giúp đỡ nhau.'),
      q(6,'Reading','The writer started knitting in Grade 10.',['True','False'],1,'FALSE. Tác giả bắt đầu học đan khi mười tuổi (“when I was ten”), không phải khi học lớp 10. Cần phân biệt “ten years old” và “Grade 10”.'),
      q(7,'Reading','She found the sweater pattern online.',['True','False'],0,'TRUE. Tác giả tìm trên Internet và thấy mẫu đan đi kèm một video YouTube hướng dẫn.'),
      q(8,'Reading','She spent more than a week making the sweater.',['True','False'],1,'FALSE. Bài nói “It took me a week” = mất đúng một tuần. Câu hỏi dùng “more than a week” nên không khớp.'),
      q(9,'Reading','Knitting can make people more careful and patient.',['True','False'],0,'TRUE. Bài đọc nêu rõ lợi ích tốt nhất của việc đan là giúp con người cẩn thận và kiên nhẫn hơn.'),
      q(10,'Reading','The writer’s dad says knitting is magical.',['True','False'],1,'FALSE. Người nói việc đan len kỳ diệu là bà của tác giả, không phải bố. Đây là câu kiểm tra đúng chủ thể.'),
    ],
  },
];

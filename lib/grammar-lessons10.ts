import type { Question } from './exams';
import { distributeAnswers } from './answer-distribution';
import type { GrammarLesson, GrammarTopic } from './grammar-lessons9';

type Row = [prompt: string, correct: string, wrong1: string, wrong2: string, wrong3: string, explanation: string];

const topic = (
  title: string,
  meaning: string,
  structure: string[],
  use: string,
  examples: [english: string, vietnamese: string][],
  note: string,
): GrammarTopic => ({ title, meaning, structure, use, examples: examples.map(([english, vietnamese]) => ({ english, vietnamese })), note });

const exercise = (rows: Row[], unit: number): Question[] => distributeAnswers(rows.map(([prompt, correct, wrong1, wrong2, wrong3, explanation], index) => ({
  id: index + 1,
  section: 'Language Focus' as const,
  prompt,
  options: [correct, wrong1, wrong2, wrong3],
  answer: 0,
  explanation,
})), `grammar-10-unit-${unit}`);

export const grammarLessons10: Record<number, GrammarLesson> = {
  1: {
    unit: 1,
    topics: [
      topic('Present simple – hiện tại đơn', 'Nói về thói quen, lịch trình và sự thật có tính ổn định.', ['Khẳng định: S + V(s/es)', 'Phủ định: S + do/does not + V', 'Câu hỏi: Do/Does + S + V?'], 'Với he/she/it, động từ thêm -s/-es. Dấu hiệu thường gặp: every day, usually, often, always. Động từ trạng thái như know, love, need thường dùng hiện tại đơn.', [['My father cooks dinner every Friday.', 'Bố tôi nấu bữa tối vào mỗi thứ Sáu.'], ['Does Lan help with the housework?', 'Lan có giúp làm việc nhà không?']], 'Sai: She cook every day. Đúng: She cooks every day.'),
      topic('Present continuous – hiện tại tiếp diễn', 'Diễn tả sự việc đang xảy ra ngay lúc nói hoặc một tình huống tạm thời.', ['Khẳng định: S + am/is/are + V-ing', 'Phủ định: S + am/is/are not + V-ing', 'Câu hỏi: Am/Is/Are + S + V-ing?'], 'Dấu hiệu thường gặp: now, right now, at the moment, today trong tình huống tạm thời. Không lạm dụng với động từ trạng thái.', [['My sister is washing the dishes now.', 'Em gái tôi đang rửa bát.'], ['We are staying with Grandma this week.', 'Tuần này chúng tôi đang ở nhà bà.']], 'Sai: I am knowing the answer. Đúng: I know the answer.'),
    ],
    exercises: exercise([
      ['My mother usually ___ breakfast at six.', 'prepares', 'is preparing', 'prepare', 'prepared now', 'Usually chỉ thói quen; mother số ít nên prepares.'],
      ['Listen! Someone ___ at the door.', 'is knocking', 'knocks usually', 'knock', 'knocked yesterday', 'Listen cho biết hành động đang diễn ra, dùng is + V-ing.'],
      ['We ___ the kitchen every Sunday.', 'clean', 'are cleaning now', 'cleans', 'cleaned tomorrow', 'Every Sunday là lịch lặp lại; we dùng clean.'],
      ['Dad ___ a meal at the moment.', 'is cooking', 'cooks usually', 'cook', 'cooked yesterday', 'At the moment yêu cầu hiện tại tiếp diễn.'],
      ['Hoa ___ why family chores matter.', 'understands', 'is understanding', 'understand', 'understood yesterday', 'Understand là động từ trạng thái, thường dùng hiện tại đơn.'],
      ['___ your brother usually do the washing-up?', 'Does', 'Do', 'Is', 'Has', 'Câu hỏi hiện tại đơn với brother số ít dùng Does.'],
      ['Why ___ you ___ the floor now?', 'are / sweeping', 'do / sweeping', 'does / sweep', 'are / sweep', 'Now yêu cầu are + V-ing.'],
      ['My grandparents ___ with us this month.', 'are staying', 'stay every year', 'stays', 'stayed last month', 'This month cho biết tình huống tạm thời; are staying.'],
      ['Our bus ___ at 6:45 every morning.', 'leaves', 'is leaving now', 'leave', 'leaving', 'Lịch trình lặp lại dùng hiện tại đơn; bus số ít nên leaves.'],
      ['Choose the correct sentence.', 'She is helping Mum now.', 'She helping Mum now.', 'She helps Mum now at the moment.', 'She is help Mum now.', 'Now chỉ hành động đang xảy ra; is + V-ing.'],
    ], 1),
  },
  2: {
    unit: 2,
    topics: [
      topic('Will và be going to', 'Hai cách nói về tương lai nhưng thường khác nhau ở ý định hoặc bằng chứng.', ['S + will + V', 'S + am/is/are going to + V', 'Phủ định: won’t + V / am/is/are not going to + V'], 'Will thường cho quyết định ngay lúc nói hoặc dự đoán không dựa trên dấu hiệu rõ. Be going to cho kế hoạch đã có hoặc dự đoán có dấu hiệu quan sát được.', [['The phone is ringing. I will answer it.', 'Điện thoại reo. Tôi sẽ nghe máy.'], ['Look at those clouds! It is going to rain.', 'Nhìn mây kia! Trời sắp mưa.']], 'Sai: I will to help. Đúng: I will help.'),
      topic('Câu bị động', 'Nhấn mạnh người/vật nhận hành động, không nhất thiết nêu người thực hiện.', ['Hiện tại đơn: S + am/is/are + V3/ed', 'Quá khứ đơn: S + was/were + V3/ed', 'Tác nhân khi cần: by + người/vật thực hiện'], 'Chọn thì của be theo thời gian; V3/ed là quá khứ phân từ của động từ chính.', [['Plastic bottles are recycled here.', 'Chai nhựa được tái chế ở đây.'], ['The trees were planted last year.', 'Những cây này được trồng năm ngoái.']], 'Sai: Bottles recycle here. Đúng khi nhấn mạnh vật nhận hành động: Bottles are recycled here.'),
    ],
    exercises: exercise([
      ['The phone is ringing. I ___ answer it.', 'will', 'am going', 'was', 'have', 'Quyết định tại lúc nói dùng will + V.'],
      ['We bought the seeds yesterday. We ___ plant trees on Sunday.', 'are going to', 'will to', 'going', 'are going', 'Đã chuẩn bị hạt giống nên dùng kế hoạch be going to + V.'],
      ['Look at the dark clouds! It ___ rain.', 'is going to', 'will to', 'is going', 'has', 'Có dấu hiệu rõ ràng nên dùng be going to.'],
      ['I promise I ___ use less plastic.', 'will', 'am going', 'was', 'had', 'Will thường dùng cho lời hứa.'],
      ['Solar panels ___ on the school roof next month.', 'will be installed', 'will install', 'will be install', 'are installing yesterday', 'Bị động tương lai: will be + V3.'],
      ['Paper ___ from wood.', 'is made', 'made', 'are made', 'is making', 'Chủ ngữ paper nhận hành động; hiện tại đơn bị động is made.'],
      ['The old batteries ___ safely yesterday.', 'were collected', 'are collect', 'was collected', 'collected themselves', 'Yesterday dùng quá khứ đơn; batteries số nhiều nên were + V3.'],
      ['Glass bottles ___ at this centre every week.', 'are recycled', 'is recycled', 'recycle themselves', 'were recycle', 'Bị động hiện tại đơn với chủ ngữ số nhiều: are recycled.'],
      ['The park ___ by volunteers last year.', 'was cleaned', 'is clean', 'were cleaned', 'cleaned itself', 'Last year dùng quá khứ đơn; park số ít nên was cleaned.'],
      ['Choose the correct sentence.', 'The trees are planted every spring.', 'The trees is planted every spring.', 'The trees are plant every spring.', 'The trees plant by volunteers every spring.', 'Bị động hiện tại đơn với chủ ngữ số nhiều: are + V3.'],
    ], 2),
  },
  3: {
    unit: 3,
    topics: [
      topic('Compound sentences – câu ghép', 'Nối hai mệnh đề độc lập để thể hiện bổ sung, tương phản, lựa chọn hoặc kết quả.', ['Mệnh đề 1, + and/but/or/so + mệnh đề 2', 'And: thêm ý; but: đối lập; or: lựa chọn; so: kết quả'], 'Mỗi mệnh đề có thể đứng thành câu riêng. Chọn liên từ theo quan hệ ý nghĩa thay vì theo vị trí từ.', [['The song was simple, but it was moving.', 'Bài hát đơn giản nhưng gây xúc động.'], ['The hall was full, so we watched online.', 'Khán phòng kín chỗ nên chúng tôi xem trực tuyến.']], 'Sai khi đổi nguyên nhân–kết quả: The hall was full, but we watched online nếu ý muốn nói “vì vậy”.'),
      topic('To-infinitive và bare infinitive', 'Dùng động từ nguyên thể có to hoặc không to sau các nhóm động từ khác nhau.', ['want/hope/decide/plan + to V', 'can/must/should + V (không to)', 'let/make + người + V (không to)'], 'To V thường theo sau động từ chỉ mong muốn/kế hoạch; sau modal verbs và let/make dùng V nguyên thể không to.', [['She hopes to perform on stage.', 'Cô ấy hy vọng được biểu diễn trên sân khấu.'], ['Music makes me relax.', 'Âm nhạc khiến tôi thư giãn.']], 'Sai: She can to sing. Đúng: She can sing.'),
    ],
    exercises: exercise([
      ['The lyrics are sad, ___ the melody is cheerful.', 'but', 'so', 'and', 'or', 'Hai ý đối lập nên dùng but.'],
      ['The hall was full, ___ we watched the concert online.', 'so', 'but', 'or', 'yet', 'Vế sau là kết quả của việc hết chỗ.'],
      ['You can sing, ___ you can play the guitar.', 'or', 'so', 'but', 'because', 'Hai lựa chọn nối bằng or.'],
      ['The band rehearsed, ___ the audience waited outside.', 'and', 'so that', 'because of', 'unless', 'Hai mệnh đề độc lập thêm thông tin, nối bằng and.'],
      ['Mai hopes ___ in the school concert.', 'to perform', 'performing to', 'perform', 'performed', 'Hope + to V.'],
      ['The teacher made us ___ the chorus again.', 'sing', 'to sing', 'singing', 'sang', 'Make + người + V nguyên thể không to.'],
      ['Students can ___ this song easily.', 'learn', 'to learn', 'learning', 'learned', 'Sau can dùng V nguyên thể không to.'],
      ['The band decided ___ a new song.', 'to write', 'writing', 'write', 'wrote', 'Decide + to V.'],
      ['Her parents let her ___ the music club.', 'join', 'to join', 'joining', 'joined', 'Let + người + V nguyên thể không to.'],
      ['Choose the correct sentence.', 'He wants to play the piano.', 'He wants play the piano.', 'He can to play the piano.', 'He made me to play the piano.', 'Want + to V; hai lựa chọn khác sai quy tắc modal/make.'],
    ], 3),
  },
  4: {
    unit: 4,
    topics: [
      topic('Past simple và past continuous với when/while', 'Kể một sự việc đã kết thúc và mô tả hành động đang diễn ra khi sự việc đó xen vào.', ['Past simple: S + V2/ed', 'Past continuous: S + was/were + V-ing', 'While + hành động dài, hành động ngắn + past simple', 'Hành động dài + when + hành động ngắn'], 'While thường giới thiệu hành động đang diễn ra; when thường giới thiệu hành động xen vào. Hai hành động song song có thể cùng dùng quá khứ tiếp diễn.', [['While we were cleaning the park, it started to rain.', 'Khi chúng tôi đang dọn công viên, trời bắt đầu mưa.'], ['The volunteers were working when the lights went out.', 'Các tình nguyện viên đang làm việc thì đèn tắt.']], 'Sai: While we cleaned the park, it was starting to rain nếu muốn nói một việc ngắn xen vào.'),
      topic('Tính từ -ing/-ed và -ful/-less', 'Nhận biết từ mô tả nguyên nhân gây cảm xúc, người cảm nhận và nghĩa của hậu tố.', ['-ing: sự vật gây cảm xúc (interesting)', '-ed: người cảm nhận (interested)', '-ful: có/đầy (helpful); -less: thiếu/không có (homeless)'], 'Dùng -ing cho điều khiến người khác cảm thấy thế nào; -ed cho cảm xúc của người.', [['The project is inspiring. We feel inspired.', 'Dự án truyền cảm hứng. Chúng tôi cảm thấy được truyền cảm hứng.'], ['The shelter helps homeless people.', 'Mái ấm giúp những người không có nhà.']], 'Sai: I am boring khi muốn nói “tôi thấy chán”. Đúng: I am bored.'),
    ],
    exercises: exercise([
      ['While we ___ the park, it began to rain.', 'were cleaning', 'cleaned tomorrow', 'are cleaning', 'have cleaned', 'Hành động đang diễn ra trong quá khứ dùng were + V-ing.'],
      ['The volunteers were working when the power ___.', 'went out', 'was going out', 'goes out', 'has gone out', 'Sự việc ngắn xen vào dùng quá khứ đơn.'],
      ['At seven yesterday, Lan ___ food for the shelter.', 'was preparing', 'prepares', 'has prepared', 'is preparing', 'Tại thời điểm quá khứ xác định dùng quá khứ tiếp diễn.'],
      ['The team ___ supplies last Sunday.', 'delivered', 'was delivering now', 'has delivered tomorrow', 'delivers yesterday', 'Last Sunday là thời điểm quá khứ xác định; dùng quá khứ đơn.'],
      ['While Minh was painting, Hoa ___ posters.', 'was designing', 'designs', 'is designing', 'has designed', 'Hai hành động song song trong quá khứ dùng quá khứ tiếp diễn.'],
      ['The charity event was ___ for everyone.', 'inspiring', 'inspired', 'inspire', 'inspiration', 'Sự kiện gây cảm hứng nên dùng tính từ -ing.'],
      ['The students felt ___ by the volunteers.', 'inspired', 'inspiring', 'inspire', 'inspiration', 'Người cảm nhận cảm xúc dùng tính từ -ed.'],
      ['A person without a home is ___.', 'homeless', 'homeful', 'homely', 'homing', 'Hậu tố -less nghĩa là thiếu/không có.'],
      ['A volunteer who gives useful support is ___.', 'helpful', 'helpless', 'helping', 'helped', 'Helpful nghĩa là hay giúp đỡ/có ích.'],
      ['Choose the correct sentence.', 'The lesson was confusing, so I felt confused.', 'The lesson was confused, so I felt confusing.', 'The lesson was confuse, so I felt confusing.', 'The lesson confused, so I felt confusing.', 'Sự vật gây cảm xúc dùng -ing; người cảm nhận dùng -ed.'],
    ], 4),
  },
  5: {
    unit: 5,
    topics: [
      topic('Present perfect – hiện tại hoàn thành', 'Nói về trải nghiệm, kết quả còn liên quan hiện tại hoặc sự việc bắt đầu trong quá khứ và còn tiếp tục.', ['S + have/has + V3/ed', 'S + have/has not + V3/ed', 'Have/Has + S + V3/ed?'], 'Ever, never, already, yet, since và for thường đi với hiện tại hoàn thành. Nếu có mốc quá khứ xác định như yesterday, dùng quá khứ đơn.', [['She has used this app for two years.', 'Cô ấy đã dùng ứng dụng này được hai năm.'], ['Have you ever tried a 3D printer?', 'Bạn đã từng thử máy in 3D chưa?']], 'Sai: I have bought it yesterday. Đúng: I bought it yesterday.'),
      topic('V-ing và to-infinitive', 'Chọn dạng động từ theo động từ đứng trước.', ['enjoy/avoid/finish + V-ing', 'want/decide/hope + to V', 'remember/stop + V-ing hoặc to V, nhưng nghĩa có thể thay đổi'], 'Học động từ theo nhóm. Stop doing = dừng việc đang làm; stop to do = dừng lại để làm việc khác.', [['I enjoy using this device.', 'Tôi thích dùng thiết bị này.'], ['We stopped to charge the phone.', 'Chúng tôi dừng lại để sạc điện thoại.']], 'Sai: She enjoys to use it. Đúng: She enjoys using it.'),
    ],
    exercises: exercise([
      ['She ___ this app for two years.', 'has used', 'used yesterday', 'is use', 'have used', 'For two years cho biết sự việc kéo dài đến hiện tại; she dùng has.'],
      ['___ you ever ___ a 3D printer?', 'Have / used', 'Did / used', 'Has / use', 'Are / using', 'Hỏi trải nghiệm: Have + you + ever + V3.'],
      ['I have not installed the update ___.', 'yet', 'yesterday', 'ago', 'last week', 'Yet thường đứng cuối câu phủ định hiện tại hoàn thành.'],
      ['They have ___ built a working model.', 'already', 'last year', 'yesterday', 'ago', 'Already phù hợp với hiện tại hoàn thành.'],
      ['The team ___ the robot last Friday.', 'tested', 'has tested', 'test now', 'testing', 'Last Friday là mốc quá khứ xác định nên dùng quá khứ đơn.'],
      ['We enjoy ___ new tools.', 'testing', 'to test', 'test', 'tested', 'Enjoy + V-ing.'],
      ['The inventors decided ___ the design.', 'to improve', 'improving', 'improve', 'improved', 'Decide + to V.'],
      ['You should avoid ___ the device in water.', 'using', 'to use', 'use', 'used', 'Avoid + V-ing.'],
      ['We stopped ___ the battery.', 'to charge', 'charging', 'charge', 'charged', 'Dừng lại để sạc pin: stop to V.'],
      ['Choose the correct sentence.', 'Mai has never used a drone.', 'Mai have never used a drone.', 'Mai has never use a drone.', 'Mai has never using a drone.', 'Mai số ít dùng has + V3; never ở giữa has và V3.'],
    ], 5),
  },
  6: {
    unit: 6,
    topics: [topic('Câu bị động với động từ khuyết thiếu', 'Nhấn mạnh người hoặc vật nhận hành động và diễn đạt khả năng, lời khuyên, nghĩa vụ hoặc dự đoán.', ['S + can/should/must/may/will + be + V3/ed', 'Phủ định: S + modal + not + be + V3/ed', 'Câu hỏi: Modal + S + be + V3/ed?'], 'Không bỏ be sau modal. V3/ed giữ nguyên theo động từ chính. Tác nhân có thể thêm bằng by nếu quan trọng.', [['Equal opportunities should be provided to everyone.', 'Cơ hội bình đẳng nên được trao cho mọi người.'], ['The rule must be followed by all students.', 'Tất cả học sinh phải tuân theo quy định.']], 'Sai: Women should given more opportunities. Đúng: Women should be given more opportunities.')],
    exercises: exercise([
      ['Equal chances ___ to every student.', 'should be offered', 'should offer', 'should be offer', 'should to be offered', 'Bị động với should: should be + V3.'],
      ['The rules ___ by all club members.', 'must be followed', 'must follow', 'must be follow', 'must to follow', 'Bị động với must: must be followed.'],
      ['Girls and boys ___ fairly in sports.', 'should be treated', 'should treat', 'should be treat', 'are should treated', 'Bị động với should: should be treated.'],
      ['This task ___ by anyone with the right training.', 'can be done', 'can do', 'can be do', 'can to be done', 'Bị động với can: can be + V3.'],
      ['More female leaders ___ in the future.', 'may be elected', 'may elect', 'may be elect', 'may to be elected', 'Bị động với may: may be elected.'],
      ['Discrimination ___ at school.', 'must not be accepted', 'must not accept', 'must not be accept', 'must be not accepted', 'Phủ định modal passive: must not be + V3.'],
      ['The new policy ___ next month.', 'will be introduced', 'will introduce', 'will be introduce', 'will to be introduced', 'Bị động tương lai: will be + V3.'],
      ['___ both teams be given the same equipment?', 'Should', 'Do', 'Are', 'Does', 'Câu hỏi bị động với modal bắt đầu bằng Should.'],
      ['The award ___ to a deserving student.', 'can be given', 'can give', 'can be give', 'can to give', 'Give có V3 là given; dùng can be given.'],
      ['Choose the correct sentence.', 'The work should be shared equally.', 'The work should shared equally.', 'The work should be share equally.', 'The work should to be shared equally.', 'Bị động modal đúng là should be + V3.'],
    ], 6),
  },
};

import type { Exam, Question } from './exams';

const q = (
  id: number,
  section: Question['section'],
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  underlines?: string[],
): Question => ({ id, section, prompt, options, answer, explanation, underlines });

export const exams9: Exam[] = [
  {
    id: 1,
    title: 'Khảo sát chất lượng đầu năm · Đề số 1',
    theme: 'Ôn nền tảng lớp 8 → 9',
    passageTitle: 'Understanding volcanoes',
    passage:
      'Volcanoes are often grouped into three types. Active volcanoes erupt or show signs that an eruption may happen. Extinct volcanoes have lost their heat source and are not expected to erupt again. Dormant volcanoes have been quiet for a long time, but they may become active in the future. Scientists study volcanoes in several ways. They examine rocks, make maps, measure small movements in the ground, and use satellites to observe changes from space. These methods can provide useful warnings, but predicting the exact time of an eruption is still extremely difficult.',
    questions: [
      q(1, 'Language Focus', 'Choose the word whose underlined part is pronounced differently.', ['thank', 'father', 'theatre', 'healthy'], 1, 'Phần “th” trong “father” được phát âm /ð/ (âm hữu thanh). Trong “thank”, “theatre” và “healthy”, “th” được phát âm /θ/ (âm vô thanh). Vì vậy đáp án B khác ba từ còn lại.', ['th', 'th', 'th', 'th']),
      q(2, 'Language Focus', 'Choose the word with a different stress pattern.', ['suburb', 'neighbour', 'tourist', 'remind'], 3, '“Suburb”, “neighbour” và “tourist” đều nhấn âm tiết thứ nhất. “Remind” /rɪˈmaɪnd/ nhấn âm tiết thứ hai, nên chọn D.'),
      q(3, 'Language Focus', 'My grandparents live ___ a quiet suburb of the city.', ['at', 'in', 'on', 'from'], 1, 'Dùng giới từ “in” trước một khu vực hoặc địa điểm có phạm vi: in a suburb, in a city. Câu có nghĩa: Ông bà tôi sống trong một vùng ngoại ô yên tĩnh của thành phố.'),
      q(4, 'Language Focus', 'Lan could not decide ___ to invite to the science fair.', ['what', 'where', 'who', 'when'], 2, 'Cấu trúc “question word + to-infinitive”. Vì động từ “invite” cần một người làm tân ngữ, ta dùng “who to invite” = mời ai.'),
      q(5, 'Language Focus', 'It is ___ easier to prevent damage than to repair it later.', ['always', 'never', 'rarely', 'hardly'], 0, '“Always” diễn tả một nguyên tắc luôn đúng trong ngữ cảnh: phòng tránh thiệt hại luôn dễ hơn sửa chữa về sau. Các trạng từ phủ định hoặc tần suất thấp làm câu sai nghĩa.'),
      q(6, 'Language Focus', 'I did not fully understand tsunami warnings ___ I watched a documentary about them.', ['while', 'until', 'because', 'although'], 1, 'Mẫu “not ... until” nghĩa là mãi cho đến khi điều gì xảy ra thì trạng thái mới thay đổi. Ở đây: Tôi chưa hiểu đầy đủ cảnh báo sóng thần cho đến khi xem phim tài liệu.'),
      q(7, 'Language Focus', 'Millions of viewers watched the rescue operation ___ on television.', ['lively', 'alive', 'live', 'living'], 2, '“Live” ở đây là trạng từ/tính từ chỉ chương trình được phát trực tiếp. “Alive” nghĩa là còn sống; “lively” là sôi nổi; “living” là đang sống.'),
      q(8, 'Language Focus', 'Scientists may discover another habitable planet ___ the next twenty years.', ['for', 'since', 'in', 'at'], 2, '“In + khoảng thời gian” có thể chỉ một sự việc sẽ xảy ra trong tương lai: in the next twenty years. “For” chỉ độ dài; “since” đi với mốc bắt đầu.'),
      q(9, 'Language Focus', 'Our teacher ___ us to follow the evacuation signs carefully.', ['said', 'spoke', 'told', 'asked to'], 2, 'Cấu trúc “tell somebody to + V”: told us to follow. “Say” không đi trực tiếp với tân ngữ người theo mẫu này; “asked to” còn thiếu tân ngữ đúng vị trí.'),
      q(10, 'Language Focus', '___ bicycle needs to be washed before the trip.', ['Mine', 'My', 'Me', 'I'], 1, 'Trước danh từ “bicycle” cần tính từ sở hữu “my”. “Mine” là đại từ sở hữu nên đứng độc lập, không đứng trước danh từ.'),
      q(11, 'Language Focus', 'The safety report has to ___ before Friday.', ['submit', 'be submitted', 'submitted', 'be submitting'], 1, 'Chủ ngữ “the safety report” nhận hành động, nên dùng bị động sau “has to”: has to be + V3. “Submit” có V3 là “submitted”.'),
      q(12, 'Language Focus', 'Would you mind if I ___ the window?', ['open', 'opened', 'will open', 'am opening'], 1, 'Sau “Would you mind if I ...?” thường dùng quá khứ đơn để đưa ra lời xin phép lịch sự: if I opened. Đây không mang nghĩa quá khứ.'),
      q(13, 'Language Focus', 'Malaysia is made up ___ thirteen states and three federal territories.', ['by', 'from', 'of', 'with'], 2, 'Cụm cố định “be made up of” = bao gồm/được tạo thành từ. Vì vậy dùng “of”.'),
      q(14, 'Language Focus', 'The new bridge ___ built five years ago.', ['is', 'was', 'were', 'has'], 1, '“Five years ago” yêu cầu quá khứ đơn. Chủ ngữ “the new bridge” số ít và câu ở thể bị động, nên dùng “was built”.'),
      q(15, 'Language Focus', 'Nam said that he ___ from a small coastal town.', ['comes', 'came', 'will come', 'has come'], 1, 'Trong lời nói gián tiếp với động từ tường thuật “said” ở quá khứ, hiện tại đơn thường lùi thành quá khứ đơn: come → came.'),
      q(16, 'Language Focus', 'It rained heavily, ___ the outdoor match was cancelled.', ['but', 'because', 'so', 'although'], 2, 'Vế trước là nguyên nhân, vế sau là kết quả; “so” nối hai mệnh đề theo nghĩa “vì vậy”. “Because” sẽ đảo quan hệ và không phù hợp dấu phẩy ở đây.'),
      q(17, 'Language Focus', 'While we ___ home, we saw an accident near the station.', ['walked', 'were walking', 'are walking', 'have walked'], 1, 'Một hành động đang diễn ra thì hành động ngắn xen vào: “were walking” (quá khứ tiếp diễn) đi với “saw” (quá khứ đơn).'),
      q(18, 'Language Focus', 'The storm was severe, ___ nobody in the village was injured.', ['so', 'because', 'but', 'therefore'], 2, 'Hai ý tương phản: bão dữ dội nhưng không ai bị thương. “But” là liên từ thích hợp để nối hai mệnh đề.'),
      q(19, 'Language Focus', 'Could you show me ___ to use this emergency radio?', ['how', 'who', 'which person', 'how do I'], 0, 'Cấu trúc gián tiếp “show somebody how to + V” = chỉ cho ai cách làm gì. Không đảo trợ động từ trong câu hỏi gián tiếp.'),
      q(20, 'Language Focus', 'I wish I ___ more about first aid.', ['know', 'knew', 'will know', 'am knowing'], 1, '“Wish” về một điều không đúng ở hiện tại dùng quá khứ đơn: wish + S + V2. “I wish I knew” nghĩa là tôi ước mình biết nhiều hơn.'),
      q(21, 'Reading', 'An active volcano may erupt or show signs of a possible eruption.', ['True', 'False'], 0, 'TRUE. Câu thứ hai giải thích núi lửa đang hoạt động có thể phun trào hoặc biểu hiện dấu hiệu cho thấy một vụ phun trào có thể xảy ra.'),
      q(22, 'Reading', 'An extinct volcano is expected to erupt again soon.', ['True', 'False'], 1, 'FALSE. Bài đọc nói núi lửa đã tắt mất nguồn nhiệt và không được dự đoán sẽ phun trào trở lại. “Soon” trái hẳn với thông tin trong bài.'),
      q(23, 'Reading', 'A dormant volcano can possibly become active in the future.', ['True', 'False'], 0, 'TRUE. “Dormant” là im lặng trong thời gian dài, nhưng bài nhấn mạnh loại núi lửa này vẫn có thể hoạt động lại trong tương lai.'),
      q(24, 'Reading', 'Scientists observe volcanoes only from the ground.', ['True', 'False'], 1, 'FALSE. Ngoài nghiên cứu đá, lập bản đồ và đo chuyển động mặt đất, các nhà khoa học còn dùng vệ tinh để quan sát thay đổi từ không gian.'),
      q(25, 'Reading', 'Scientists can always predict the exact time of an eruption.', ['True', 'False'], 1, 'FALSE. Câu cuối cho biết dự đoán chính xác thời điểm phun trào vẫn cực kỳ khó. Các phương pháp chỉ cung cấp cảnh báo hữu ích, không bảo đảm chính xác tuyệt đối.'),
    ],
  },
];

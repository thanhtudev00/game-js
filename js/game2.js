const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
      question: 'Năm điều Bác Hồ dạy Thiếu niên ,nhi đồng. Điều thứ hai là:',
      choice1: 'Giữ gìn vệ sinh thật tốt',
      choice2: 'Học tập tốt, lao động tốt',
      choice3: 'Khiêm tốn thật thà, dũng cảm',
      choice4: 'Tất cả đều đúng',
      answer: 2,
  },
  {
      question:"Ngày, tháng, năm sinh của Bác Hồ là?",
      choice1: "A. 19/5/1890.",
      choice2: "B. 19/4/1980.",
      choice3: "C. 20/1/1890",
      choice4: "D. 01/2/1890. ",
      answer: 1,
  },
  {
      question:" Bác Hồ đọc bản Tuyên ngôn Độc lập vào ngày, tháng, năm nào?",
      choice1: "A. 15/1/1945.",
      choice2: "B. 19/8/1945.",
      choice3: "C. 20/11/1945.",
      choice4: "D. 2/9/1945. ",
      answer: 4,
  },
  {
      question:"Bác Hồ có những tên gọi nào khác?",
      choice1: "A. Nguyễn Sinh Cung.",
      choice2: "B. Nguyễn Ái Quốc.",
      choice3: "C. Nguyễn Tất Thành.",
      choice4: "D. Cả 3 đáp án trên. ",
      answer: 4,
  },
  {
      question:"Bác Hồ quê ở đâu?",
      choice1: "A. Xã Kim Liên, Huyện Nam Đàn, Tỉnh Nghệ An.",
      choice2: "B. Cao Bằng,Tỉnh Lạng Sơn.",
      choice3: "C. Cả A và B đều đúng",
      choice4: "D. Cả A và B đều sai ",
      answer: 1,
  },
  {
      question:"Em tán thành với ý kiến nào sau đây?",
      choice1: "A. Chỉ nên hứa những điều mình có thể thực hiện được.",
      choice2: "B. Có thể hứa mọi điều, còn thực hiện được hay không không quan trọng.",
      choice3: "C. Cả A và B đều đúng",
      choice4: "D. Cả A và B đều sai ",
      answer: 1,
  },
  {
      question:" Em tán thành với ý kiến nào sau đây?",
      choice1: "A. Trẻ em có quyền được Ông bà, cha mẹ chăm sóc.",
      choice2: "B. Trẻ em không cần quan tâm đến mọi người trong gia đình. ",
      choice3: "C. Cả A và B đều đúng",
      choice4: "D. Cả A và B đều sai  ",
      answer: 1,
  },
  {
      question:"Em tán thành với ý kiến nào sau đây?",
      choice1: "A. Cả A và B đều đúng",
      choice2: "B. Niềm vui sẽ được nhân lên, nỗi buồn sẽ vơi đi nếu được cảm thông chia sẻ.",
      choice3: "C. Niềm vui và nỗi buồn là của riêng mỗi người, không nên chia sẽ cùng ai.",
      choice4: "D. Cả A và B đều sai ",
      answer: 2,
  },
  {
      question:"Hành vi nào dưới đây nên làm?",
      choice1: "A. Đánh nhau với trẻ em hàng xóm.",
      choice2: "B. Chào hỏi lễ phép khi gặp hàng xóm.",
      choice3: "C. Hái trộm quả trong vườn nhà hàng xóm.",
      choice4: "D. Tất cả đều đúng ",
      answer: 2,
  },
  {
      question:"Bà Năm ở cạnh nhà em là mẹ Liệt sĩ, mấy hôm nay bà bị ốm nặng. Em sẽ làm gì?",
      choice1: "A. Tất cả đều đúng",
      choice2: "B. Mặc kệ bà, không liên quan gì đến mình",
      choice3: "C. Tất cả đều sai",
      choice4: "D. Cùng mẹ đếm chăm sóc bà. ",
      answer: 4,
  },
  {
      question:"Đi học về gần đến nhà, gặp chú thương binh đang đi tìm nhà người quen. Em sẽ làm gì?",
      choice1: "A. Cười nhạo chú",
      choice2: "B. Vẫn đi tiếp về nhà.",
      choice3: "C. Giúp chú tìm nhà người quen.",
      choice4: "D. Không cần để ý ",
      answer: 3,
  },
  {
      question:"Ý kiến nào em tán thành trong việc tôn trọng tài sản của người khác?",
      choice1: "A. Tự ý sử dụng dù chưa được cho phép.",
      choice2: "B. Hỏi mượn khi cần.",
      choice3: "C. Sử dụng trước, hỏi mượn sau.",
      choice4: "D. Cứ lấy sài không cần hỏi ",
      answer: 2,
  },
  {
      question:"Tôn trọng đám tang là:",
      choice1: "A. Biểu hiện nếp sống văn minh.",
      choice2: "B. Chỉ cần tôn trọng đám tang những người mình quen biết.",
      choice3: "C. Đồng cảm, chia sẻ",
      choice4: "D. Cả A và C đúng ",
      answer: 4,
  },
  {
      question:" Nhằm bảo vệ và tiết kiệm nguồn nước, theo em hành động nào sau đây là đúng?",
      choice1: "A. Đổ rác thải xuống sông, suối ao hồ.",
      choice2: "B. Xả nước tràn bể, không khóa lại sau khi dùng.",
      choice3: "C. Lấy đủ lượng nước cần dùng",
      choice4: "D. Sài thỏi mái vì nhà có tiền  ",
      answer: 1,
  },
  {
      question:" Những việc làm nào sau đây được xem là hành động tốt nhằm bảo vệ nguồn nước?",
      choice1: "A. Tắm giặt tại bể nước công cộng.",
      choice2: "B. Bỏ rác vào thùng chứa rác",
      choice3: "C. Phóng uế bừa bãi, đỗ nước bẩn tràn ra mặt đất.",
      choice4: "D. Xả nước thải ra ao hồ ",
      answer: 2,
  },
  {
      question:"Em làm gì để chăm sóc con vật nuôi trong tình huống khi đang vui chơi cùng bạn, mẹ nhắc về cho lợn ăn?",
      choice1: "A. Em vẫn tiếp tục chơi.",
      choice2: "B. Nghe lời mẹ về cho Lợn ăn ngay.",
      choice3: "C. Chơi hết buổi rồi mới về cho Lợn ăn sau.",
      choice4: "D. Tất cả đều đúng ",
      answer: 2,
  },
  {
      question:"Để góp phần bảo vệ môi trường xanh, sạch, đẹp em đã có những hành động sau:",
      choice1: "A. Tham gia chăm sóc cây xanh trong vườn trường.",
      choice2: "B. Bẻ trộm hoa trên các bồn hoa .",
      choice3: "C. Phá cây cảnh trong sân trường.",
      choice4: "D. Thích thì làm  ",
      answer: 1,
  },
  {
      question:"Khoanh tròn trước ý kiến, hành vi em cho là đúng",
      choice1: "A. Trẻ em có quyền tham gia ý kiến về những việc có liên quan đến mình",
      choice2: "B. Trẻ em có quyền được ông bà, cha mẹ yêu thương quan tâm, chăm sóc.",
      choice3: "C. Hái trộm quả trong vườn nhà hàng xóm",
      choice4: "D. Tham gia cùng các bạn quyên góp sách vở, quần áo cũ để giúp các bạn nghèo trong lớp. ",
      answer: 4,
  },
  {
      question:" Em nhìn thấy bạn đeo băng tang đi học em sẽ?",
      choice1: "A. mặc kệ bạn",
      choice2: "B. động viên bạn cho bạn đỡ buồn.",
      choice3: "C. trêu ngươi bạn cho bạn khóc.",
      choice4: "D. rủ các bạn không chơi với bạn nữa. ",
      answer: 2,
  },
  {
      question:" Khi đi đường em gặp một đám tang thì em sẽ?",
      choice1: "A. cười đùa cho vui.",
      choice2: "B. chỉ trỏ vào quan tài người đã mất.",
      choice3: "C. nhường đường cho đám tang đi trước.",
      choice4: "D. Cả 3 đáp án trên. ",
      answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 20;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `câu hỏi ${questionCounter} đến ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();

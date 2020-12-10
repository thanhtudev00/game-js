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
  question: 'Khi thấy bạn hái hoa, phá cây ở nơi công cộng bạn sẽ...',
  choice1: 'Mặc bạn, không quan tâm.',
  choice2: 'Cùng hái hoa, phá cây với bạn.',
  choice3: 'Khuyên ngăn bạn.',
  choice4: 'Lại đánh mắng bạn.',
  answer: 3,
},
{
  question: "Việc làm nào sai khi gặp đám tang?",
  choice1: "Cùng học bài, vui chơi với bạn.",
  choice2: "Trêu chọc, đánh nhau, làm bạn tức giận.",
  choice3: "Không giúp bạn, khi bạn gặp khó khăn.",
  choice4: "Để bạn vui chơi một mình.",
  answer: 1,
},
{
  question: "Để cư xử tốt với bạn, các em nên làm gì?",
  choice1: "chạy theo em chỉ trỏ",
  choice2: "ngả mũ",
  choice3: "nô đùa",
  choice4: "luồn lách vượt lên trước",
  answer: 2,
},
{
  question: "Khi đưa vật gì cho thầy giáo cô giáo,em phải đưa như thế nào?",
  choice1: "Đưa bằng tay trái",
  choice2: "Đưa bằng một tay",
  choice3: "Đưa bằng tay phải",
  choice4: "Đưa bằng hai tay",
  answer: 4,
},
{
  question: "Hành vi nào là đúng?",
  choice1: "Cùng bạn học bài",
  choice2: "Vừa đi vừa giật tóc bạn",
  choice3: "Làm bạn ngã",
  choice4: "Xé sách vở của bạn",
  answer: 1,
},
{
  question: "Đi bộ như thế nào là đúng quy định đối với đường không có vỉa hè?",
  choice1: "Đi sát lề đường bên tay phải",
  choice2: "Đi sát lề đường bên tay trái",
  choice3: "Đi ra giữa lòng đường",
  choice4: "Vừa đi vừa nô nghịch",
  answer: 1,
},
{
  question: "Muốn có nhiều bạn em phải làm gì?",
  choice1: "Trêu chọc bạn",
  choice2: "Cư xử tốt với bạn khi cùng học cùng chơi",
  choice3: "Không cho bạn mượn đồ của mình.",
  choice4: "Bạn muốn chơi nhưng mình không chơi với bạn.",
  answer: 2,
},
{
  question: "Khi nào cần nói lời cần nói lời cảm ơn?",
  choice1: "Khi được người khác quan tâm giúp đỡ.",
  choice2: ". Khi làm phiền người khác",
  choice3: "Khi giúp đỡ người khác",
  choice4: "Khi người khác giúp đỡ việc lớn",
  answer: 1,
},
{
  question: "Em tán thành với ý kiến nào sau đây?",
  choice1: "Thờ ơ cười khi bạn đang có chuyện buồn",
  choice2: "Ghen tức khi thấy bạn học giỏi hơn mình. ",
  choice3: " Chúc mừng bạn khi bạn đạt điểm 10 trong học tập",
  answer: 3,
},
{
  question: "Hành vi nào dưới đây nên làm hay không nên làm?",
  choice1: "Đánh nhau với trẻ em hàng xóm",
  choice2: "Chào hỏi lễ phép khi gặp hàng xóm",
  choice3: "Hái trộm quả trong vườn nhà hàng xóm",
  choice4: "Cả A B C đều đúng",
  answer: 2,
},
{
  question: "Bà Năm ở cạnh nhà em là mẹ Liệt sĩ, mấy hôm nay bà bị ốm nặng. Em sẽ làm gì?",
  choice1: "Cùng mẹ đếm chăm sóc bà. ",
  choice2: "Mặc kệ bà, không liên quan gì đến mình",
  answer: 1,
},
{
  question: "Ý kiến nào em tán thành trong việc tôn trọng tài sản của người khác?",
  choice1: "Tự ý sử dụng dù chưa được cho phép ",
  choice2: "Hỏi mượn khi cần ",
  choice3: "Sử dụng trước, hỏi mượn sau.",
  choice4: "A và C đều đúng",
  answer: 2,
},
{
  question: "Nhằm bảo vệ và tiết kiệm nguồn nước, theo em hành động nào sau đây là đúng?",
  choice1: "Đổ rác thải xuống sông, suối ao hồ ",
  choice2: "Xả nước tràn bể, không khóa lại sau khi dùng.",
  choice3: "Lấy đủ lượng nước cần dùng",
  choice4: "Đáp án 1 và 2 là đúng ",
  answer: 3,
},
{
  question: "Em làm gì để chăm sóc con vật nuôi trong tình huống khi đang vui chơi cùng bạn, mẹ nhắc về cho lợn ăn?",
  choice1: "Em vẫn tiếp tục chơi",
  choice2: "Nghe lời mẹ về cho Lợn ăn ngay",
  choice3: "Chơi hết buổi rồi mới về cho Lợn ăn sau",
  choice4: "Tất cả các câu",
  answer: 2,
},
{
  question: "Để góp phần bảo vệ môi trường xanh, sạch, đẹp em đã có những hành động sau:",
  choice1: "Tham gia chăm sóc cây xanh trong vườn trường",
  choice2: "Bẻ trộm hoa trên các bồn hoa ",
  choice3: "Phá cây cảnh trong sân trường",
  choice4: "Tất cả các hành vi trên",
  answer: 1,
},
{
  question: "Em tán thành với ý kiến nào sau đây?",
  choice1: "Quan tâm, giúp đỡ hàng xóm láng giềng",
  choice2: "Trẻ em không cần quan tâm, giúp đỡ hàng xóm láng giềng",
  choice3: "Trẻ em không cần giúp đỡ hàng xóm",
  choice4: "Cả B và c đều đúng",
  answer: 1,
},
{
  question: "Trong các loại cây sau cây nào là cây bóng mát ?",
  choice1: "Cây Khoai",
  choice2: "Cây Bàng",
  choice3: "Cây Lúa",
  choice4: "Cây Mía",
  answer: 2,
},
{
  question: "Hành vi nào thể hiện tôn trọng người nước ngoài ?",
  choice1: "Nhiệt tình chỉ dẫn đường đi cho khách nước ngoài .",
  choice2: "Khi khách nước ngoài hỏi thăm , em không trả lời và bỏ đi .",
  choice3: "Chạy theo người nước ngoài yêu cầu họ mua đồ lưu niệm .",
  choice4: "Người nước ngoài rất giùa nên bán hàng cho họ thật đắt .",
  answer: 1,
},
{
  question: "Việc nào không nên làm với cây trồng?",
  choice1: "Tưới cây",
  choice2: "Bắt sâu",
  choice3: "Bón phân",
  choice4: "Bẻ cành cây",
  answer: 4,
},
{
  question: "Việc nào không nên làm với vật nuôi?",
  choice1: "Cho ăn",
  choice2: "Tiêm phòng bệnh",
  choice3: "Vệ sinh chổ ở",
  choice4: "Để chuồng bẩn",
  answer: 4,
}
]

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

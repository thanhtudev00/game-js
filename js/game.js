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
    question: "Việc làm nào đúng khi gặp đám tang?",
    choice1: "Chạy theo xem chỉ trỏ",
    choice2: "Nhường đường",
    choice3: "Cười đùa",
    choice4: "Bóp còi xe xin đường",
    answer: 2,
  },
  {
    question: "Việc làm nào sai khi gặp đám tang?",
    choice1: "dừng xe",
    choice2: "đứng vào lề đường",
    choice3: "luồn lách vượt lên trước",
    choice4: "ngả mũ nón",
    answer: 3,
  },
  {
    question: "Khi gặp đám tang em cần phải làm gì?",
    choice1: "chạy theo em chỉ trỏ",
    choice2: "ngả mũ",
    choice3: "nô đùa",
    choice4: "luồn lách vượt lên trước",
    answer: 2,
  },
  {
    question:
      "Bác đưa thư nhờ em chuyển cho ông Tư hàng xóm vì cả nhà đi vắng. Em sẽ làm gì?",
    choice1: "bóc thư ra xem",
    choice2: "bóc ra xem rồi đưa ông Tư",
    choice3: "không bóc thư, đợi ông Tư về đưa cho ông",
    choice4: "không đưa thư cho ông Tư",
    answer: 3,
  },
  {
    question: "Bóc thư từ của người khác ra xem là?",
    choice1: "thể hiện sự quan tâm của mình",
    choice2: "việc làm đúng",
    choice3: "việc làm vi phạm pháp luật",
    choice4: "tôn trọng người khác",
    answer: 3,
  },
  {
    question: "Thiếu nhi thế giới khác nhau về:",
    choice1: "Màu da",
    choice2: "Ngôn ngữ",
    choice3: "Điều kiện sống",
    choice4: "Tất cả các ý kiến trên",
    answer: 4,
  },
  {
    question: "Vì sao phải tiết kiệm nguồn nước?",
    choice1: "Nước là tài nguyên quý giá",
    choice2: "Nước không thể thiếu trong cuộc sống",
    choice3: "Nước chỉ có hạn",
    choice4: "Tất cả 3 ý trên",
    answer: 4,
  },
  {
    question:
      "Theo em vì sao cần phải chăm sóc cây trồng vật nuôi thường xuyên và liên tục?",
    choice1: "Chăm sóc sẽ giúp cây, con vật lớn nhanh, tránh được bệnh tật.",
    choice2:
      "Vật nuôi, cây trồng có vai trò quan trọng đối với cuộc sống của con người.",
    choice3: "Cây, con vật dễ mắc bệnh, chậm lớn.",
    choice4: "Tất cả các ý trên",
    answer: 4,
  },
  {
    question:
      " Em tán thành ý kiến nào trong việc tiết kiệm và bảo vệ nguồn nước ?",
    choice1:
      "Sông , hồ không phải của riêng nhà nào nên ta có thể đổ rác được .",
    choice2:
      "Nguồn nước là có hạn cần được giữ gìn và bảo vệ cho cuộc sống hôm nay và mai sau ",
    choice3: " Nước giếng khoang của nhà mình cứ dùng thoả mái . ",
    choice4:
      "Nước sạch không bao giờ cạn không cần phải tiết kiệm, bảo vệ và giữ gìn.",
    answer: 2,
  },
  {
    question: "Em tán thành ý kiến nào ?",
    choice1: "Chỉ cần chăm sóc và bảo vệ các con vật của gia đình mình.",
    choice2: "Chỉ cần chăm sóc những loại cây do con người trồng.",
    choice3:
      "Cần bảo vệ tất cả các loại cây trồng, vật nuôi thường xuyên liên tục..",
    choice4: "Thỉnh thoảng tưới nước cho cây cũng được.",
    answer: 3,
  },
  {
    question: "Hành vi nào sau đây của bạn là đúng ",
    choice1: "Nhờ anh chị làm hộ bài tập về nhà . ",
    choice2: "Nhờ chị làm công việc mà mình được bố , mẹ giao",
    choice3: "Tự mình cố gắng làm công việc của mình được bố mẹ giao cho.",
    choice4: "Tất cả các ý trên.",
    answer: 3,
  },
  {
    question: "Việc làm nào sau đây thể hiện hành vi đối xử đúng với bạn ;",
    choice1: "Hỏi thăm an ủi khi bạn có chuyện buồn ",
    choice2: "Động viên giúp đỡ bạn khi bạn bị điểm kém ",
    choice3: "Chúc mừng bạn khi bạn được điểm 10",
    choice4: "Tất cả các hành vi trên.",
    answer: 4,
  },
  {
    question: "Tên nào sau đây không phải tên gọi của Bác Hồ ?",
    choice1: "Nguyễn Tất Thành ",
    choice2: "Nguyễn Sinh Cung",
    choice3: "Nguyễn ái Quốc",
    choice4: "Nguyễn Văn Tư ",
    answer: 4,
  },
  {
    question: "Trong các tên sau tên nào là tên gọi của Bác Hồ ?",
    choice1: "Nguyễn Sinh khiêm",
    choice2: "Nguyễn Văn Cung",
    choice3: "Nguyễn Sinh Sắc",
    choice4: "Nguyễn Sinh Cung",
    answer: 4,
  },
  {
    question: "Hành vi nào không nên làm đối với cây trồng ?",
    choice1: "Trèo, đu bám cây",
    choice2: "Bẻ cành bứt lá",
    choice3: "Giẫm đạp lên thảm cỏ",
    choice4: "Tất cả các hành vi trên",
    answer: 4,
  },
  {
    question: "Bài hát nào nói về tình đoàn kết với thiếu nhi Thế giới ",
    choice1: "Trái đất này là của chúng mình ",
    choice2: "Cả A và C",
    choice3: "Thiếu nhi thế giới liên hoan",
    choice4: "Trẻ em hôm nay thế giới ngày mai.",
    answer: 2,
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
  progressText.innerText = `Câu hỏi ${questionCounter} đến ${MAX_QUESTIONS}`;
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

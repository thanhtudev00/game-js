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
  question: 'Do chủ quan, Nam đã nhận một công việc không phù hợp với khả năng của mình, Nam sẽ:',
  choice1: 'Bỏ không làm.',
  choice2: 'Làm qua loa cho xong.',
  choice3: 'Cố gắng làm cho tốt.',
  choice4: ' Xin đổi công việc khác.',
  answer: 3,
},
{
  question: "Hoa được phân công mang lọ hoa cho buổi sơ kết thi đua của lớp. Sáng hôm đó, Hoa bị ốm không thể đi học được. Hoa sẽ:",
  choice1: " Bỏ qua vì nghĩ rằng mình bị ốm.",
  choice2: "Gọi điện cho bạn và nhờ bạn mang hộ.",
  choice3: "Nhờ mẹ mang đến.",
  choice4: "Cả B và C",
  answer: 4,
},
{
  question: "Hùng được phân công trang trí đầu báo tường của lớp, nhưng đến ngày phải nộp mới ra Hùng sẽ:",
  choice1: "Trang trí cho qua loa.",
  choice2: "Nói dối cô giáo là mình bị ốm nên chưa làm được.",
  choice3: "Nhận lỗi và cuối giờ nhờ các bạn trong nhóm cùng làm.",
  choice4: "Tất cả đều đúng",
  answer: 3,
},
{
  question: "Giỗ Tổ Hùng Vương được tổ chức ở đâu:",
  choice1: "Hà Nội",
  choice2: "Phú Thọ",
  choice3: "Thành Phố Hồ Chí Minh",
  choice4: "Tất cả đều sai",
  answer: 3,
},
{
  question: "Giỗ Tổ Hùng Vương được tổ chức vào ngày:",
  choice1: "Mồng 10 tháng 3 âm lịch",
  choice2: "Mồng 1 Tết",
  choice3: "Rằm Trung thu",
  choice4: "Đáp án khác",
  answer: 1,
},
{
  question: "Trên đường đi học, thấy một em bé bị lạc, đang khóc tìm mẹ, em sẽ:",
  choice1: "Mặc em bé, không quan tâm ",
  choice2: "An ủi em bé",
  choice3: "An ủi em bé và giúp em tìm mẹ",
  choice4: "Nhờ người khác giúp em bé.",
  answer: 3,
},
{
  question: "Thấy hai em bé đang đánh nhau để tranh giành đồ chơi, em sẽ:",
  choice1: "Không can thiệp.",
  choice2: "Khuyên ngăn hai em bé.",
  choice3: "Lấy đồ chơi đưa cho một trong hai em bé.",
  choice4: "Giải pháp khác",
  answer: 2,
},
{
  question: "Nghe tin quê mình bị bão lụt tàn phá, em sẽ:",
  choice1: "Gửi thư về quê thăm hỏi, chia sẻ",
  choice2: "Tích cực tham gia các hoạt động cứu trợ cho quê hương.",
  choice3: "Coi như không có gì xảy ra.",
  choice4: "Mặc kệ",
  answer: 1,
},
{
  question: "Được biết quê mình đang tổ chức quyên góp tiền để tu bổ đình làng, em sẽ:",
  choice1: "Cho rằng đó là việc của người lớn, trẻ em không cần quan tâm.",
  choice2: "Bớt một phần tiền được lì xì trong dịp tết góp vào tu bổ đình làng.",
  choice3: "Cùng các bạn trong lớp bàn bạc, tìm cách tham gia như thế nào cho phù h ợp với khả năng của mình",
  choice4: "Cả B và C đều đúng",
  answer: 4,
},
{
  question: "Gia đình em không tham gia tổng vệ sinh đường phố (ngõ xóm) vào sáng thứ bảy hằng tuần theo quy định của địa phương. Em sẽ:",
  choice1: "Mặc kệ, cho rằng không phải việc của mình",
  choice2: "Nhắc bố, mẹ tham gia tổng vệ sinh.",
  choice3: "Dậy sớm cùng tham gia tổng vệ sinh với mọi người.",
  choice4: "Tất cả đều đúng",
  answer: 3,
},
{
  question: "Xã (phường) tổ chức sinh hoạt hè cho trẻ em. Em sẽ:",
  choice1: "Không tham gia vì không thích.",
  choice2: "Tham gia theo khả năng của mình.",
  choice3: "Tích cực tham gia và rủ các bạn cùng tham gia.",
  choice4: "Tất cả đều đúng.",
  answer: 3,
},
{
  question: "Những hành vi thể hiện kính già yêu trẻ.",
  choice1: "Chào hỏi, xưng hô lễ phép với người già.",
  choice2: "Kể chuyện cho em nhỏ nghe.",
  choice3: " Dùng hai tay khi đưa vật gì đó cho người già.",
  choice4: "Tất cả đều đúng",
  answer: 4,
},
{
  question: "Những ý kiến thể hiện sự đối xử bình đẳng với phụ nữ là:",
  choice1: "Trẻ em trai và gái có quyền được đối xử bình đẳng.",
  choice2: "Con trai bao giờ cũng giỏi hơn con gái.",
  choice3: "Làm việc nhà không chỉ là trách nhiệm của mẹ và chị, em gái",
  choice4: "Mọi chức vụ trong xã hội chỉ đàn ông mới được nắm giữ.",
  answer: 3,
},
{
  question: "Nếu em sơ ý làm rơi hộp bút của bạn xuống đất, khi đó em sẽ:",
  choice1: "Bỏ đi không nói gì",
  choice2: "Nhặt hộp bút lên đưa bạn và nói lời xin lỗi",
  choice3: "Nói lời xin lỗi bạn",
  choice4: "Nhặt hộp bút lên đưa bạn",
  answer: 2,
},
{
  question: "Bạn mượn quyển truyện tranh của em về đọc nhưng sơ ý để em bé làm rách vài trang. Em sẽ :",
  choice1: "Bắt đền bạn",
  choice2: "Lần sau không cho bạn mượn",
  choice3: "Giận dữ, mắng bạn",
  choice4: "Tha lỗi cho bạn, nhắc nhở bạn lần sau giữ cẩn thận hơn",
  answer: 4,
},
{
  question: "Chọn đáp án đúng nhất trước những việc làm thể hiện sự tôn trọng phụ nữ của các bạn nam:",
  choice1: "Khi lên xe ô-tô, luôn nhường các bạn nữ lên xe trước.",
  choice2: "Không chơi với các bạn nữ.",
  choice3: "A và D đều đúng",
  choice4: "Chúc mừng, tặng quà cho các bạn nữ nhân ngày 8 - 3.",
  answer: 3,
},
{
  question: "Chọn đáp án đúng nhất trước ý kiến, hành vi em cho là sai",
  choice1: "Nếu biết hợp tác thì công việc chung sẽ luôn gặp thuận lợi.",
  choice2: "Giữ gìn nề nếp, thói quen tốt của gia đình, dòng họ.",
  choice3: "Nếu thấy bạn mình làm việc sai trái em sẽ mặc không quan tâm.",
  choice4: "Kiên trì sửa chữa một khuyết điểm của bản thân (như nói ngọng, nói lắp, ....) cũng là người có chí.",
  answer: 3,
},
{
  question: "Chọn đáp án sai trước những hành vi, việc làm thể hiện hợp tác với mọi người xung quanh",
  choice1: "Luôn quan tâm, chia sẻ với bạn bè.",
  choice2: "Tích cực tham gia các hoạt động chung.",
  choice3: "Biết hỗ trợ, phối hợp với nhau trong công việc chung.",
  choice4: "Không quan tâm đến việc của người khác.",
  answer: 4,
},
{
  question: "Chọn đáp án sai trước những điều cần chú ý khi hợp tác làm việc với người khác là:",
  choice1: "Bàn bạc kĩ trước khi thống nhất cách làm việc.",
  choice2: "Tuân thủ đúng cách làm việc đã thống nhất với cả nhóm.",
  choice3: "Nhận tất cả các công việc trong nhóm.",
  choice4: "Lắng nghe và tôn trọng ý kiến của các bạn trong nhóm.",
  answer: 3,
},
{
  question: "Chọn đáp án sai trước những việc làm dưới đây thể hiện lòng biết ơn đối với tổ tiên?",
  choice1: "Cố gắng học tập, rèn luyện để trở thành người có ích cho gia đình, quê hương, đất nước",
  choice2: "Bỏ đi những kỉ vật của gia đình dòng họ vì không hợp thời",
  choice3: "Thường xuyên về quê cùng bố mẹ thăm hỏi người thân và họ hang",
  choice4: "Giữ gìn nề nếp tốt của gia đình, dòng họ.",
  answer: 2,
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

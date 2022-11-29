// ========== Buoc 1 Khai bao bien =======//
const word = document.getElementById("word");
const inputText = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving"
];

let randomWord;
let score = 0;
let time = 10;

// Kiểm tra level để tăng thời gian khi trả lời đúng
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// kiểm tra level để tự động chọn select option
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

/**
 * Bước 2:
 * Lấy random 1 từ trong mảng words và hiển thị ra ngoài màn hình
 */
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
function setRandomWord() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
setRandomWord();

/**
 * Bước 4:
 * - Thiết lập tự động chạy hàm updateTime(), để giảm thời gian
 * - Nếu thời gian giảm về 0 thì xóa interval
 */
const timeInterval = setInterval(updateTime, 1000);
function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;
  if (time == 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}
/**
 * Bước 3:
 * - Gọi sự kiện và lấy giá trị khi gõ vào phần tử input
 * - Kiểm tra nếu giá trị gõ vào giống từ khóa random thì
 *    + Random từ khóa khác
 *    + Cập nhật điểm
 *    + Xóa giá trị input
 */

/**
 *
 * Bước 5:
 * Nếu hết thời gian thì gọi hàm gameOver và render ra ngoài màn hình
 */
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

inputText.addEventListener("input", function (e) {
  let inputValue = e.target.value;

  // neu go dung
  if (inputValue === randomWord) {
    setRandomWord();
    updateScore();
    if (difficulty == "hard") {
      time += 2;
    } else if (difficulty == "medium") {
      time += 3;
    } else {
      time += 5;
    }
    e.target.value = "";
  }
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

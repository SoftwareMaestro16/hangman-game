import { WORDS, KEYBOARD_LETTERS } from "./consts";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");
let triesLeft;
let winCount;

const createPlaceHoldersHTML = () => {
  // gameDiv.innerHTML = `<h1>${wordToGuess}</h1>`;

  const word = sessionStorage.getItem("word");
  const wordsArray = Array.from(word);
  const placeHoldersHTML = wordsArray.reduce(
    (acc, curr, i) => acc + `<h1 id="letter_${i}" class="letter"> _ </h1>`,
    ""
  );

  // Array.from('_'.repeat(word.length))

  // let placeHoldersHTML = '';
  // for (let i = 0; i < word.length; i++) {
  //     placeHoldersHTML = placeHoldersHTML + `<h1 id="letter_${i}" class="letter"> _ </h1>`;
  // }

  // // gameDiv.innerHTML = placeHoldersHTML;

  return `<div id="placeholders" class="placeholders-wrapper">${placeHoldersHTML}</div>`;
};

const createKeyboard = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard"); // class
  keyboard.id = "keyboard"; // id

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr) => {
    return (
      acc +
      `<button class="button-primary keyboard-button" id="${curr}">${curr}</button>`
    );
  }, "");

  keyboard.innerHTML = keyboardHTML;
  return keyboard;
};

const createHangmanImg = () => {
  const image = document.createElement("img");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.classList.add("hangman-img");
  image.id = "hangman-img";

  return image;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem("word");
  const inputLetter = letter.toLowerCase();

  if (!word.includes(inputLetter)) {
    const triesCounter = document.getElementById("tries-left");
    triesLeft -= 1;
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.getElementById("hangman-img");
    hangmanImg.src = `images/hg-${10 - triesLeft}.png`;
    if (triesLeft === 0) {
      stopGame("lose");
    }
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount += 1;
        if (winCount === word.length) {
          stopGame("win");
          return;
        }
        document.getElementById(`letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

const stopGame = (status) => {
  document.getElementById("placeholders").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();
  document.getElementById("quit").remove();

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    document.getElementById("hangman-img").src = "images/hg-win.png";
    document.getElementById(
      "game"
    ).innerHTML += `<h2 class="result-header win">You Win! 🎉</h2>`;
  } else if (status === "lose") {
    document.getElementById(
      "game"
    ).innerHTML += `<h2 class="result-header lose">You Lose! 😭</h2>`;
  } else if (status === "quit") {
    logoH1.classList.remove("logo-sm");
    document.getElementById("hangman-img").remove();
  }

  document.getElementById(
    "game"
  ).innerHTML += `<p>The Word Was: <span class="result-word">${word}</span></p><button id="play-again" class="button-primary px-5 py-2 mt-5">Play Again! ⬅️</button>`;
  document.getElementById("play-again").onclick = startGame;
};

// export const startGame = () => {
//   triesLeft = 10;
//   winCount = 0;

//   logoH1.classList.add("logo-sm");
//   const randomINdex = Math.floor(Math.random() * WORDS.length);
//   const wordToGuess = WORDS[randomINdex];
//   sessionStorage.setItem("word", wordToGuess);

//   gameDiv.innerHTML = createPlaceHoldersHTML();

//   gameDiv.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span></p>`;

//   const keyboardDiv = createKeyboard();
//   keyboardDiv.addEventListener("click", (event) => {
//     if (event.target.tagName.toLowerCase() === "button") {
//       event.target.disabled = true;
//       checkLetter(event.target.id);
//     }
//   });

//   const hangmanImg = createHangmanImg();
//   gameDiv.prepend(hangmanImg);

//   gameDiv.appendChild(keyboardDiv);

//   gameDiv.insertAdjacentHTML(
//     "beforeend",
//     '<button id="quit" class="button-secondary px-2 py-1 mt-4">Quit.</button>'
//   );
//   document.getElementById("quit").onclick = () => {
//     const isSure = confirm("Are You Sure?");
//     if (isSure) {
//         stopGame("quit");
//     }
//   };
// };

// new

export const startGame = () => {
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");

  const buttonEasy = document.createElement("button");
  buttonEasy.classList.add("button-easy");
  buttonEasy.textContent = "Easy";
  const imgEasy = document.createElement("img");
  imgEasy.src = "images/EasyFace.png";
  imgEasy.alt = "Easy level";
  imgEasy.classList.add("button-image");
  buttonEasy.appendChild(imgEasy);

  const buttonMedium = document.createElement("button");
  buttonMedium.classList.add("button-medium");
  buttonMedium.textContent = "Medium";
  const imgMedium = document.createElement("img");
  imgMedium.src = "images/MediumFace.png";
  imgMedium.alt = "Medium level";
  imgMedium.classList.add("button-image");
  buttonMedium.appendChild(imgMedium);

  const buttonHard = document.createElement("button");
  buttonHard.classList.add("button-hard");
  buttonHard.textContent = "Hard";
  const imgHard = document.createElement("img");
  imgHard.src = "images/HardFace.png";
  imgHard.alt = "Hard level";
  imgHard.classList.add("button-image");
  buttonHard.appendChild(imgHard);

  buttonEasy.addEventListener("click", startEasyGame);
  buttonMedium.addEventListener("click", startMediumGame);
  buttonHard.addEventListener("click", startHardGame);

  buttonsContainer.appendChild(buttonEasy);
  buttonsContainer.appendChild(buttonMedium);
  buttonsContainer.appendChild(buttonHard);
  gameDiv.innerHTML = "";
  gameDiv.appendChild(buttonsContainer);
};

export const startEasyGame = () => {
  triesLeft = 10; // Установка 13 попыток для уровня "Easy"
  winCount = 0;

  logoH1.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceHoldersHTML();

  gameDiv.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">${triesLeft}</span></p>`;

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;
      checkLetter(event.target.id);
    }
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);

  gameDiv.appendChild(keyboardDiv);

  gameDiv.insertAdjacentHTML(
    "beforeend",
    '<button id="quit" class="button-secondary px-2 py-1 mt-4">Quit.</button>'
  );
  document.getElementById("quit").onclick = () => {
    const isSure = confirm("Are You Sure?");
    if (isSure) {
      stopGame("quit");
    }
  };
};

export const startMediumGame = () => {
  triesLeft = 8; // Установка 10 попыток для уровня "Medium"
  winCount = 0;

  logoH1.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceHoldersHTML();

  gameDiv.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">${triesLeft}</span></p>`;

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;
      checkLetter(event.target.id);
    }
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);

  gameDiv.appendChild(keyboardDiv);

  gameDiv.insertAdjacentHTML(
    "beforeend",
    '<button id="quit" class="button-secondary px-2 py-1 mt-4">Quit.</button>'
  );
  document.getElementById("quit").onclick = () => {
    const isSure = confirm("Are You Sure?");
    if (isSure) {
      stopGame("quit");
    }
  };
};

export const startHardGame = () => {
  triesLeft = 5; // Установка 7 попыток для уровня "Hard"
  winCount = 0;

  logoH1.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceHoldersHTML();

  gameDiv.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">${triesLeft}</span></p>`;

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;
      checkLetter(event.target.id);
    }
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);

  gameDiv.appendChild(keyboardDiv);

  gameDiv.insertAdjacentHTML(
    "beforeend",
    '<button id="quit" class="button-secondary px-2 py-1 mt-4">Quit.</button>'
  );
  document.getElementById("quit").onclick = () => {
    const isSure = confirm("Are You Sure?");
    if (isSure) {
      stopGame("quit");
    }
  };
};

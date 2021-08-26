// Main script

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loadJson(path) {
  const response = await fetch(path);
  const data = await response.json();
  return data;
}

const endingPunctuation = [".", "?", "!"];

function generatePoem(words, poem = "") {
  if (poem.includes(".")) {
    return poem;
  }

  let randInt = random(0, words.length - 1);
  let puncInt = random(0, words.length - 1);
  let word = words[randInt];

  if (poem[poem.length - 2] === "." || poem === "") {
    word = word.charAt(0).toUpperCase() + word.slice(1)
  }

  poem += `${word}`

  if (poem.length > 40) {
    poem += ".";
  } else {
    if (puncInt % 5 === 0) {
      let rand = random(0, 8);

      if (rand === 8) {
        poem += "!";
      } else if (rand === 7) {
        poem += "?";
      } else {
        poem += ".";
      }
    } else if (puncInt % 20 === 0 && !poem.includes("—")) {
      poem += " —";
    } else if (puncInt % 15 === 0 && !poem.includes(";")) {
      poem += ";";
    } else if (puncInt % 12 === 0 && !poem.includes(":")) {
      poem += ":";
    } else if (puncInt % 4 === 0) {
      poem += ",";
    }
  }

  poem += " ";

  if (endingPunctuation.some(punct => poem.includes(punct))) {
    return poem;
  }

  return generatePoem(words, poem);
}

function displayOnScreen(phrase, timeout = 100) {
  let element;
  let followedPhrase = "";
  let letterIndex = 0;

  function showUp() {
    if (followedPhrase.length === phrase.length) {
      clearInterval(interval);
    } else {
      followedPhrase += phrase[letterIndex];
      letterIndex++;

      element = <h1>{followedPhrase}</h1>;
      ReactDOM.render(element, document.getElementById('root'));
    }
  }

  const interval = setInterval(showUp, timeout);
}

loadJson('./words.json').then((data) => {
  const words = data.data
  const poem = generatePoem(words);
  
  displayOnScreen(poem);
  //countWords(words);
});

function countWords(words) {
  let length = words.length;
  let count20 = 0;
  let count15 = 0;
  let count12 = 0;
  let count4 = 0;
  let count5 = 0;

  for (let index = 0; index < words.length; index++) {
    if (index % 5 === 0) {
      count5++;
    }

    if (index % 20 === 0) {
      count20++;
    } else if (index % 15 == 0) {
      count15++;
    } else if (index % 12 == 0) {
      count12++;
    } else if (index % 4 == 0) {
      count4++;
    }
  }

  count5 /= length;
  count20 /= length;
  count15 /= length;
  count12 /= length;
  count4 /= length;

  console.log(`f5: ${count5}, f20: ${count20}, f15: ${count15}, f12: ${count12}, f4: ${count4}`);
}



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

loadJson('./words.json').then((data) => {
  const words = data.data
  let screen = "";
  let resetDisplay = false;

  function showUp() {
    let randInt = random(0, words.length - 1);
    let puncInt = random(0, words.length - 1);
    let word = words[randInt];

    if (screen[screen.length - 2] === "." || screen === "") {
      word = word.charAt(0).toUpperCase() + word.slice(1)
    }

    screen += `${word}`

    if (screen.length > 40) {
      screen += ".";
      resetDisplay = true;
    } else {
      if (puncInt % 5 === 0) {
        let rand = random(0, 8);

        if (rand === 8) {
          screen += "!";
        } else if (rand === 7) {
          screen += "?";
        } else {
          screen += ".";
        }
        resetDisplay = true;
      } else if (puncInt % 20 === 0 && !screen.includes("—")) {
        screen += " —";
      } else if (puncInt % 15 === 0 && !screen.includes(";")) {
        screen += ";";
      } else if (puncInt % 12 === 0 && !screen.includes(":")) {
        screen += ":";
      } else if (puncInt % 4 === 0) {
        screen += ",";
      }
    }

    screen += " ";

    let element = <h1>{screen}</h1>;

    if (resetDisplay) {
      resetDisplay = false;
      clearInterval(interval);
    }

    ReactDOM.render(element, document.getElementById('root'));
  }

  let interval = setInterval(showUp, 600)
});


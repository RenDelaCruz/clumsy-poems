function displayOnScreen(sentence, timeout = 100) {
  let element;
  let followedSentence = '';
  let letterIndex = 0;

  const interval = setInterval(showUp, timeout);

  function showUp() {
    if (followedSentence.length === sentence.length) {
      clearInterval(interval);
    } else {
      followedSentence += sentence[letterIndex];
      letterIndex++;

      element = <h1>{followedSentence}</h1>;
      ReactDOM.render(element, document.getElementById('root'));
    }
  }
}

let poem = generatePoem();
displayOnScreen(poem);
console.log(poem);

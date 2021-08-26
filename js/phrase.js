const nouns = JSON.parse(nounsData);
const verbs = JSON.parse(verbsData);
const adjectives = JSON.parse(adjectivesData);
const adverbs = JSON.parse(adverbsData);

const PartOfSpeech = Object.freeze({
  NOUN: nouns,
  VERB: verbs,
  ADJECTIVE: adjectives,
  ADVERB: adverbs
});

function random(minIncluding, maxExcluding) {
  minIncluding = Math.ceil(minIncluding);
  maxExcluding = Math.floor(maxExcluding - 1);
  return Math.floor(Math.random() * (maxExcluding - minIncluding + 1)) + minIncluding;
}

function getAdjective(adjectiveBuild = '') {
  adjectiveBuild += getRandomWord(PartOfSpeech.ADJECTIVE);

  let chance = random(0, 10);
  if (chance < 2) { // 20%
    return getAdjective(adjectiveBuild + ' ');
  }

  return adjectiveBuild;
}

function getVerb(presentTenseAllowed = true) {
  let verb = getRandomWord(PartOfSpeech.VERB);
  let adverb = '';

  let chance = random(0, 10);
  if (presentTenseAllowed && chance < 5) { // 50%
    let presentVerb = verb.present;
    if (['s', 'sh', 'ch', 'x', 'z'].some(suffix => presentVerb.endsWith(suffix))) {
      verb = presentVerb + 'es';
    } else {
      verb = presentVerb + 's';
    }
  } else {
    verb = verb.past;
  }

  chance = random(0, 10);
  if (chance < 3) { // 30%
    adverb = getRandomWord(PartOfSpeech.ADVERB) + ' ';
  }
  return adverb + verb;
}

function generateSubject() {
  let noun = getRandomWord(PartOfSpeech.NOUN);
  let adj = '';

  let chance = random(0, 10);
  if (chance < 8) { // 80%
    adj = getAdjective() + ' ';
  }

  return adj + noun;
}

function getStop() {
  let chance = random(0, 8);
  if (chance === 0) { // 12.5%
    return '!';
  } else if (chance === 1) { // 12.5%
    return '?';
  } // 75%
  return '.';
}

function getRandomWord(wordList) {
  const randomIndex = random(0, wordList.length - 1);
  return wordList[randomIndex];
}

function generatePoem() {
  let phrase = generateSubject();

  let chance = random(0, 100);
  if (chance < 60) { // 60%
    phrase += ': ';

    chance = random(0, 4);
    if (chance === 0) { // 25%
      phrase += generateSubject();
    } else if (chance === 1) { // 25%
      phrase += getVerb(false);
    } else if (chance === 2) { // 25%
      phrase += getAdjective();
    } else { // 25%
      phrase += getRandomWord(PartOfSpeech.NOUN);
    }
  } else if (chance < 90) { // 30%
    phrase += ' ' + getVerb();

    chance = random(0, 10);
    if (chance < 6) { // 60% * 30% = 18%
      phrase += ' ' + generateSubject();
    }
  } // 10%

  phrase += getStop();
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

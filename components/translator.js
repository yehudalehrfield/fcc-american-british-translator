const americanOnly = require('./american-only');
const americanToBritishSpelling = require('./american-to-british-spelling');
const americanToBritishTitles = require('./american-to-british-titles');
const britishOnly = require('./british-only');

class Translator {
  // getInput(inputString) {}

  // getLocale(localeString) {}

  swapKeyValuePairs(obj) {
    this.swapArray = Object.entries(obj).map(([word, translation]) => [
      translation,
      word,
    ]);
    return Object.fromEntries(this.swapArray);
  }

  // eslint-disable-next-line class-methods-use-this
  highlight(str) {
    return `<span class="highlight">${str}</span>`;
  }

  translate(inputString, locale) {
    let wordRegex = new RegExp();
    let wordTranslation;
    let spellingTranslation;
    let titleTranslation;
    let clockSeparator;
    let translationString;
    // condense the if-else into four lines using ternarys?
    if (locale === 'american-to-british') {
      wordTranslation = americanOnly;
      spellingTranslation = americanToBritishSpelling;
      titleTranslation = americanToBritishTitles;
      clockSeparator = { regex: /(\d{1,2}):(\d{1,2})/g, replace: '.' };
    } else if (locale === 'british-to-american') {
      wordTranslation = britishOnly;
      spellingTranslation = this.swapKeyValuePairs(americanToBritishSpelling);
      titleTranslation = this.swapKeyValuePairs(americanToBritishTitles);
      clockSeparator = { regex: /(\d{1,2}).(\d{1,2})/g, replace: ':' };
    }

    // intitial translation
    translationString = inputString;
    // translate words
    Object.keys(wordTranslation).forEach((word) => {
      wordRegex = new RegExp(word, 'gi');
      translationString = translationString.replace(
        wordRegex,
        this.highlight(wordTranslation[word])
      );
    });
    // translate spelling
    Object.keys(spellingTranslation).forEach((word) => {
      wordRegex = new RegExp(word, 'gi');
      translationString = translationString.replace(
        wordRegex,
        this.highlight(spellingTranslation[word])
      );
    });
    // translate titles
    Object.keys(titleTranslation).forEach((word) => {
      wordRegex = new RegExp(word, 'gi');
      translationString = translationString.replace(
        wordRegex,
        this.highlight(
          titleTranslation[word].charAt(0).toUpperCase() +
            titleTranslation[word].slice(1)
        )
      );
    });
    // translate times
    translationString = translationString.replace(
      clockSeparator.regex,
      this.highlight(`$1${clockSeparator.replace}$2`)
    );

    // ensure first letter is uppercase.
    // FUTURE: every sentance should begin with uppercase
    // NOW: return should have 'text', 'translation'
    // NOW: also add 'wasChanged' to be triggered if there was a highlight method call
    translationString =
      translationString.charAt(0).toUpperCase() + translationString.slice(1);
    return { text: inputString, translation: translationString };
  }
}

// // TESTING AREA
// const translator = new Translator();
// const aToB = 'American To British';
// const bToA = 'British To American';
// const testAToB = [
//   'Dr. Tylenol',
//   'Mangoes are my favorite fruit.',
//   'I ate yogurt for breakfast.',
//   'To play hooky means to skip class or work.',
//   'Lunch is at 12:15 today.',
//   'Hey there!',
// ];
// const testBToA = [
//   'We watched the footie match for a while.',
//   'Paracetamol takes up to an hour to work.',
//   "I've just got bits and bobs in my bum bag.",
//   'Dinner is at 6.15 tonight.',
// ];
// console.log(`----------------${aToB}----------------`);
// testAToB.forEach((string) => {
//   console.log(`original: ${string}`);
//   console.log(`translated: ${translator.translate(string, aToB).translation}`);
// });
// console.log(`----------------${bToA}----------------`);
// testBToA.forEach((string) => {
//   console.log(`original: ${string}`);
//   console.log(`translated: ${translator.translate(string, bToA)}`);
// });

module.exports = Translator;

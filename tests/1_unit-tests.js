/* eslint-disable no-undef */
const chai = require('chai');

const { assert } = chai;

const Translator = require('../components/translator');

const translator = new Translator();

const locales = ['american-to-british', 'british-to-american'];
const aToB = {
  input: [
    'Mangoes are my favorite fruit.',
    'I ate yogurt for breakfast.',
    "We had a party at my friend's condo.",
    'Can you toss this in the trashcan for me?',
    'The parking lot was full.',
    'Like a high tech Rube Goldberg machine.',
    'To play hooky means to skip class or work.',
    'No Mr. Bond, I expect you to die.',
    'Dr. Grosh will see you now.',
    'Lunch is at 12:15 today.',
  ],
  result: [
    'Mangoes are my <span class="highlight">favourite</span> fruit.',
    'I ate <span class="highlight">yoghurt</span> for breakfast.',
    `We had a party at my friend's <span class="highlight">flat</span>.`,
    'Can you toss this in the <span class="highlight">bin</span> for me?',
    'The <span class="highlight">car park</span> was full.',
    'Like a high tech <span class="highlight">Heath Robinson device</span>.',
    'To <span class="highlight">bunk off</span> means to skip class or work.',
    'No <span class="highlight">Mr</span> Bond, I expect you to die.',
    '<span class="highlight">Dr</span> Grosh will see you now.',
    'Lunch is at <span class="highlight">12.15</span> today.',
  ],
};
const bToA = [
  'We watched the footie match for a while.',
  'Paracetamol takes up to an hour to work.',
  'First, caramelise the onions.',
  'I spent the bank holiday at the funfair.',
  'I had a bicky then went to the chippy.',
  "I've just got bits and bobs in my bum bag.",
  'The car boot sale at Boxted Airfield was called off.',
  'Have you met Mrs Kalyani?',
  "Prof Joyner of King's College, London.",
  'Tea time is usually around 4 or 4.30.',
  'Mangoes are my favorite fruit.',
  'I ate yogurt for breakfast.',
  'We watched the footie match for a while.',
  'Paracetamol takes up to an hour to work.',
];
suite('Unit Tests', () => {
  suite('American to British', () => {
    aToB.input.forEach((testString, i) => {
      test(`Test #${i + 1}`, (done) => {
        assert.equal(
          translator.translate(testString, locales[0]).translation,
          aToB.result[i]
        );
        done();
      });
    });
  });
});

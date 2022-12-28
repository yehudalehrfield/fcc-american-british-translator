const Translator = require('../components/translator');

module.exports = (app) => {
  const translator = new Translator();

  app.route('/api/translate').post((req, res) => {
    const { text, locale } = req.body;
    let errorMessage;
    let result;
    if (!text || !locale) errorMessage = 'Required field(s) missing';
    // not sure about this one. "If text is empty..." ? How is this different than above?
    // else if (text.split(' ' < 1)) errorMessage = 'No text to translate';
    else if (
      locale !== 'american-to-british' &&
      locale !== 'british-to-american'
    )
      errorMessage = 'Invalid value for locale field';
    else {
      result = translator.translate(text, locale);

      result.translation =
        result.translation === result.text
          ? 'Everything looks good to me!'
          : result.translation;
    }
    if (errorMessage) res.json({ error: errorMessage });
    else res.json(result);
  });
};

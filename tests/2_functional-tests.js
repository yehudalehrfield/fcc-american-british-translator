/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const { assert } = chai;
const server = require('../server');

chai.use(chaiHttp);

// const Translator = require('../components/translator');

suite('Functional Tests', () => {
  test('Translate with text and locale fields', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text: 'Mangoes are my favorite fruit.',
        locale: 'american-to-british',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'translation');
        assert.equal(
          res.body.translation,
          'Mangoes are my <span class="highlight">favourite</span> fruit.'
        );
      });
    done();
  });
  test('Translate with missing text and locale fields', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Required field(s) missing');
      });
    done();
  });
  test('Translate with missing text field', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Required field(s) missing');
      });
    done();
  });
  test('Translate with missing locale field', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: 'Translator' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Required field(s) missing');
      });
    done();
  });
  test('Translate with empty text field', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: '', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'No text to translate');
      });
    done();
  });
  test('Translate with empty text field', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: 'Hey there!', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'translation');
        assert.property(res.body, 'text');
        assert.equal(res.body.translation, 'Everything looks good to me!');
      });
    done();
  });
});

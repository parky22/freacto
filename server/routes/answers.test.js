const request = require('supertest-as-promised');
const { expect } = require('chai');
const db = require('../../db');
const Question = require('../../db/models/question');
const Answer = require('../../db/models/answer');
const app = require('../app');

describe('/api/answers', () => {
  const question1 = {
    title: 'String Search',
    content: 'You are attempting to find the index of the first appearance of one string (the needle) inside of another (the haystack).'
  }

  const answer1 = {
    content: 'function indexOf (needle, haystack) { for (let hIdx = 0; hIdx + needle.length <= haystack.length; hIdx++) { for (let nIdx = 0; nIdx < needle.length; nIdx++) { if (haystack[hIdx + nIdx] !== needle[nIdx]) break; if (nIdx + 1 === needle.length) return hIdx; } return -1;}'
  }

  before(() => {
      return db.sync({force: true});
    }
  )

  beforeEach(() => {
    return Answer.create(answer1);
  })
  //need to clear everything in the test database
  afterEach(() => {
      Answer.truncate({cascade: true});
    }
  )

  it('GETs all answers', () => {
    return request(app)
      .get('/api/answer')
      .expect(200)
      .then(res => {
        console.log("RES", res.body);
        expect(res.body.length).to.equal(1);
        //expect(res.body).to.contain(answer1);
      })
  })

  it('GETs answer by id', () => {
    return request(app)
      .get('/1')
      .expect(200)
      .then(res => {
        expect(res.body).to.contain(answer1);
      });
  })
});

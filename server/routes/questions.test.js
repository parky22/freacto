const request = require('supertest-as-promised');
const { expect } = require('chai');
const Question = require('../../db/models/question');
const Answer = require('../../db/models/answer');
const app = require('../app');

xdescribe('/question', () => {
  const question1 = {
    title: 'String Search',
    content: 'You are attempting to find the index of the first appearance of one string (the needle) inside of another (the haystack).'
  }

  const answer1 = {
    content: 'function indexOf (needle, haystack) { for (let hIdx = 0; hIdx + needle.length <= haystack.length; hIdx++) { for (let nIdx = 0; nIdx < needle.length; nIdx++) { if (haystack[hIdx + nIdx] !== needle[nIdx]) break; if (nIdx + 1 === needle.length) return hIdx; } return -1;}'
  }

  const question2 = {
    title: 'String Permutations',
    content: 'Given a string, return an array of all the permutations of that string. The permutations of the string should be the same length as the original string (i.e. use each letter in the string exactly once) but do not need to be actual words. The array that is returned should only contain unique values and its elements should be in alphabetical order.',
    current: true
  }

  const answer2 = {
    content: 'a solution that I need to go back and find'
  }

  before(
    () => {
        Question.create(question1)
    }
  )

  it('GETs all questions', () => {
    request(app)
      .get('/question')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1);
        expect(res.body).to.contain(question1);
      })
  })

  // it('GETs the current question', () => {
  //   request(app)
  //     .get('/question/current')
  //     .expect(200)
  //     .then(res => {
  //       expect(res.body.length).to.equal(1);
  //       expect(res.body).to.contain(question2);
  //     })
  // })

  it('GETs a question by id', () => {
    request(app)
      .get('/1')
      .expect(200)
      .then(res => {
        expect(res.body).to.contain(question1);
      });
  })
});

/*
Template for Question and Answer?
var studyTask;
    beforeEach(function(){
      // make a parent `study` task
      studyTask = Task.build({ name: 'study', due: helper.dates.yesterday() });
      return studyTask.save()
        .then(function(study){
          // make two child tasks (`sql` and `express`) and two unrelated tasks
          return Bluebird.all([
            Task.create({
              parentId: study.id,
              name: 'sql',
              due: helper.dates.yesterday(),
              complete: true
            }),
            Task.create({
              parentId: study.id,
              name: 'express',
              due: helper.dates.tomorrow()
            }),
            Task.create({ name: 'sleep' }),
            Task.create({ name: 'eat' })
          ]);
        });
    });
*/

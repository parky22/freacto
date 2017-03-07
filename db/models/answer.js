const Sequelize = require('sequelize');
const db = require('../');

const Answer = db.define('answer', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
  // create getter/setter method to use markdown library
});

module.exports = Answer;

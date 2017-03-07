const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../package.json');

// db server constant(s)
const dbName = (process.env.DATABASE_NAME || pkg.name) + (process.env.NODE_ENV === 'testing' ? '_test' : '');
const url = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;

// notify the user we're about to do it
console.log(chalk.yellow(`Opening database connection to ${url}`))

// init the db
const db = new Sequelize(url, {
  define: {
    freezeTableName: true   // don't go changing my table names sequeliez!
  },
  logging: false
});

module.exports = db;

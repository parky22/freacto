'use strict';

const pkg = require('./package.json');

module.exports = {
  get name() {return pkg.name},
  get isTesting() {return !!global.it},
  get isProduction() {
    return process.env.NODE_ENV === 'production'
  }
};

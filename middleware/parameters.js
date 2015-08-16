'use strict';

const pkg = require('../package.json');

module.exports = () => {
  return function *(next) {
    this.production = (process.env.NODE_ENV === 'production');
    this.bootstrap = JSON.stringify({
      version: pkg.version
    });
    yield next;
  };
};

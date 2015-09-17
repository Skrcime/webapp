'use strict';

const pkg = require('../package.json');

/**
 * Parameters for handlebars templates
 */
module.exports = () => {
  var production = (process.env.NODE_ENV === 'production');
  var domain = process.env.ENDPOINT;

  return function *(next) {
    this.production = production;
    this.domain = domain;

    this.bootstrap = JSON.stringify({
      version: pkg.version,
      domain: domain,
      user: this.user || null
    });
    yield next;
  };
};

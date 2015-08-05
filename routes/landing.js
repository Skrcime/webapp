'use strict';

let log = require('../log');

module.exports = function *(){
  log.debug('Render landing');

  yield this.render('landing', {
    title: 'Nil Gradisnik - Home'
  });
};

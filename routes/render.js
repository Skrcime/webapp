const utils = require('../utils');
const log = require('../log');

exports.landing = function *(){
  log.debug('Render landing');

  yield this.render('landing', {
    title: 'Skrcime'
  });
};

exports.login = function *(){
  log.debug('Render login');

  yield this.render('login', {
    title: 'Skrcime - Prijava'
  });
};
exports.logout = function *(){
  log.debug('Render logout');

  this.cookies.set(utils.cookieKey);
  this.redirect('/');
};
exports.register = function *(){
  log.debug('Render register');

  yield this.render('register', {
    title: 'Skrcime - Registracija'
  });
};

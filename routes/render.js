const utils = require('../utils');
const log = require('../log');

exports.landing = function *(){
  yield this.render('landing', {title: 'Skrcime'});
};

exports.login = function *(){
  yield this.render('login', {title: 'Skrcime - Prijava'});
};
exports.logout = function *(){
  this.cookies.set(utils.cookieKey);
  this.redirect('/');
};
exports.register = function *(){
  yield this.render('register', {title: 'Skrcime - Registracija'});
};

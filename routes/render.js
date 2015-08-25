const log = require('../log');
const jwt = require('../middleware/jwt');

exports.landing = function *(){
  yield this.render('landing', {title: 'Skrcime'});
};

exports.prijava = function *(){
  yield this.render('login', {title: 'Skrcime - Prijava'});
};
exports.odjava = function *(){
  this.cookies.set(jwt.cookieKey, null, jwt.cookieOptions);
  this.redirect('/');
};
exports.registracija = function *(){
  yield this.render('register', {title: 'Skrcime - Registracija'});
};

exports.zgodovina = function *(){
  yield this.render('history', {
    title: 'Skrcime - Zgodovina',
    urls: yield this.knex('urls').where('user', this.user.sub)
  });
};

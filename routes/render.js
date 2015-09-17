'use strict';

const log = require('../log');
const jwt = require('../middleware/jwt');

exports.landing = function *(){
  yield this.render('landing', {title: 'Skrcime'});
};

exports.prijava = function *(){
  log.info('Render.prijava');

  yield this.render('login', {title: 'Skrcime - Prijava'});
};
exports.odjava = function *(){
  log.info(`Render.odjava: ${this.user.email}`);

  this.cookies.set(jwt.cookieKey, null, jwt.cookieOptions);
  this.redirect('/');
};
exports.registracija = function *(){
  log.info('Render.registracija');

  yield this.render('register', {title: 'Skrcime - Registracija'});
};

exports.zgodovina = function *(){
  log.info('Render.zgodovina');

  yield this.render('history', {
    title: 'Skrcime - Zgodovina',
    urls: yield this.knex('urls').where('user', this.user.sub)
  });
};

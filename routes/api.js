'use strict';

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const log = require('../log');
const common = require('../common');
const jwt = require('../middleware/jwt');

const hashLength = 4;

exports.skrci = function *(){
  var url = shorten(this.request.body.url, this.user, 'web');
  if (!url) {
    this.status = 400;
    this.body = {success: false, message: 'Invalid URL'};
    return;
  }
  log.info(`API.shorten user:${this.user ? this.user.sub : 'anon'} url:${url.full}`);

  try {
    yield this.knex('urls').insert(url);
  } catch(err) {
    if (err.code === '23505') {
      log.debug('API.shorten hash conflict #1 trying new');
      url.hash = randomHash();
      try {
        yield this.knex('urls').insert(url);
      } catch(e) {
        log.error('API.shorten hash conflict #2 backing off');
        this.status = 500;
        return;
      }
    }
    log.error(`API.shorten ${err}`);
    this.status = 500;
    return;
  }

  this.body = {success: true, hash: url.hash};
};

exports.prijava = function *(){
  var user = this.request.body;
  var valid = common.loginValid(user);
  if (valid !== true) {
    this.status = 400;
    this.body = {success: false, message: valid};
    return;
  }

  log.info(`API.login ${user.email}`);
  try {
    var users = yield this.knex('users').where('email', user.email);
    if (users.length === 1) {
      var password = user.password;
      user = users[0];
      if (bcrypt.compareSync(password, user.password)) {
        this.cookies.set(jwt.cookieKey, jwt.user(user), jwt.cookieOptions);
        log.debug(`API.login ${user.email} ok`);
        this.body = {};
        return;
      }
    }
    log.warning(`API.login ${user.email} unauthorized`);

    this.status = 401;
    this.body = {success: false, message: 'Unauthorized'};
  } catch(err) {
    log.error(`API.login ${err}`);

    this.status = 500;
    this.body = {success: false, message: 'Server error', error: err};
  }
};

exports.registracija = function *(){
  var user = this.request.body;
  var valid = common.registerValid(user);
  if (valid !== true) {
    this.status = 400;
    this.body = {success: false, message: valid};
    return;
  }

  log.debug(`API.register ${user.email}`);
  try {
    user.password = bcrypt.hashSync(user.password, 8);
    yield this.knex('users').insert(user);
    this.body = {success: true};
  } catch(err) {
    log.error(`API.register ${err}`);

    this.status = 500;
    this.body = {success: false, message: 'Server error', error: err};
  }
};

function shorten(url, user, source) {
  if (!common.isURL(url)) return false;
  return {
    hash: randomHash(),
    full: url,
    source: source || 'web',
    user: user ? user.sub : null
  };
}
function randomHash() {
  return crypto.randomBytes(hashLength / 2).toString('hex');
}

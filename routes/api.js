const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const utils = require('../utils');
const log = require('../log');

exports.shorten = function *(){
  var url = utils.shorten(this.request.body.url, this.user, 'web');
  if (!url) {
    this.status = 400;
    return this.body = {success: false, message: 'Invalid URL'};
  }
  log.info(`API.shorten url:${url.full}`);
  
  try {
    yield this.knex('urls').insert(url);
  } catch(err) {
    if (err.code === '23505') {
      log.debug('API.shorten hash conflict #1 trying new');
      url.hash = utils.randomHash();
      try {
        yield this.knex('urls').insert(url);
      } catch(e) {
        log.error('API.shorten hash conflict #2 backing off');
        return this.status = 500;
      }
    }
    log.error(`API.shorten ${err}`);
    return this.status = 500;
  }
  
  this.body = {success: true, hash: url.hash};
};

exports.login = function *(){
  var email = this.request.body.email;
  if (!email) return this.status = 400;
  var password = this.request.body.password;
  if (!password) return this.status = 400;

  log.info(`API.login ${email}`);
  try {
    var users = yield this.knex('users').where('email', email);
    if (users.length === 1) {
      var user = users[0];
      if (bcrypt.compareSync(password, user.password)) {
        this.cookies.set(utils.cookieKey, utils.jwt(user), utils.cookieOptions);
        log.debug(`API.login ${email} ok`);
        return this.body = {};
      }
    }
    log.warning(`API.login ${email} unauthorized`);
    
    this.status = 401;
    this.body = {success: false};
  } catch(err) {
    log.error(`API.login ${err}`);
    
    this.status = 500;
    this.body = {success: false, error: err};
  }
};

exports.register = function *(){
  var user = {
    name: this.request.body.name,
    email: this.request.body.email,
    password: bcrypt.hashSync(this.request.body.password, 8)
  };
  
  log.debug(`API.register ${user.email}`);
  try {
    yield this.knex('users').insert(user);
    this.body = {success: true};
  } catch(err) {
    log.error(`API.register ${err}`);
    
    this.status = 500;
    this.body = {success: false, error: err};
  }
};

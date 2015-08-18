const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const utils = require('../utils');
const log = require('../log');

exports.shorten = function *(){
  log.info('API.shorten');

  var longUrl = this.request.body.url;
  log.debug(`longUrl: ${longUrl}`);
  
  this.body = {success: true};
};

exports.login = function *(){
  var email = this.request.body.email;
  var password = this.request.body.password;

  log.info(`API.login ${email}`);
  try {
    var users = yield this.knex('users').where('email', email);
    if (users.length === 1) {
      var user = users[0];
      if (bcrypt.compareSync(password, user.password)) {
        this.cookies.set(utils.cookieKey, utils.jwt(user), utils.cookieOptions);
        log.debug(`Api.login ${email} ok`);
        return this.body = {};
      }
    }
    log.warning(`Api.login ${email} unauthorized`);
    
    this.status = 401;
    this.body = {success: false};
  } catch(e) {
    log.error(`API.login ${e}`);
    
    this.status = 500;
    this.body = {success: false, error: e};
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
  } catch(e) {
    log.error(`API.register ${e}`);
    
    this.status = 500;
    this.body = {success: false, error: e};
  }
};

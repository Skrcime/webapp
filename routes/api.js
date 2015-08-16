const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const utils = require('../utils');
const log = require('../log');

exports.shorten = function *(){
  log.debug('API shorten');

  var longUrl = this.request.body.url;
  console.log(`longUrl: ${longUrl}`);
  
  this.body = {success: true};
};

exports.login = function *(){
  log.debug('API login');

  var email = this.request.body.email;
  var password = this.request.body.password;

  try {
    var users = yield this.knex('users').where('email', email);
    if (users.length === 1) {
      var user = users[0];
      if (bcrypt.compareSync(password, user.password)) {
        this.cookies.set(utils.cookieKey, utils.jwt(user), utils.cookieOptions);
        return this.body = {};
      }
    }
    this.status = 401;
    this.body = {success: false};
  } catch(e) {
    log.error(`API.login ${e}`);
    
    this.status = 500;
    this.body = {success: false, error: e};
  }
};
exports.register = function *(){
  log.debug('API register');

  var user = {
    email: this.request.body.email,
    password: bcrypt.hashSync(this.request.body.password, 8)
  }
  yield this.knex('users').insert(user);
  
  this.body = {success: true};
};

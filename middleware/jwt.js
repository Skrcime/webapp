'use strict';

const jwt = require('jsonwebtoken');

const domain = process.env.ENDPOINT;
const publicKey = process.env.JWT_PUBLIC_KEY;
const privateKey = process.env.JWT_PRIVATE_KEY;

const expiration = 172800000; // 48hours
const jwtOptions = {
  algorithm: 'RS256',
  issuer: 'skrci.me',
  expiresInSeconds: expiration / 1000
};

exports.cookieKey = 'skrcime.jwt';
exports.cookieOptions = {
  httpOnly: true,
  maxAge: expiration,
  domain: `.${domain}`
};

/**
 * JWT middleware
 */
exports.session = privateUrls => {
  return function *(next) {
    var auth = this.request.headers.authorization;
    var token = null;

    // Look for JWT
    if (auth && auth.split(' ')[0] === 'Bearer') token = auth.split(' ')[1];
    if (this.cookies.get(exports.cookieKey)) token = this.cookies.get(exports.cookieKey);

    if (token) {
      try { // Decode JWT
        this.user = jwt.verify(token, publicKey, jwtOptions);
      } catch(e) {
        // Do nothing
      }
    }

    // Redirect private URLs
    if (privateUrls.indexOf(this.request.path) !== -1 && !this.user) return this.redirect('/');

    yield next;
  };
};

exports.user = user => {
  var options = Object.assign({}, jwtOptions);
  options.subject = user.id;

  return jwt.sign({
    email: user.email,
    name: user.name
  }, privateKey, options);
};

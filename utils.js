const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const urlRegex = require('url-regex')({exact: true});

exports.shorten = (url, user, source) => {
  if (!urlRegex.test(url)) return false;
  
  return {
    hash: exports.randomHash(),
    full: url,
    source: source || 'web',
    user: user ? user.sub : null
  };
};
exports.toURL = val => {
  if (typeof val !== 'string') return val;
  return val.indexOf('://') !== -1 ? val : `http://${val}`;
}

exports.cookieKey = 'skrcime.jwt';
exports.cookieOptions = {};

exports.jwtOptions = {
  algorithm: 'RS256',
  issuer: 'skrci.me',
  expiresInMinutes: 2880 // 48hours
};
exports.jwt = (user) => {
  var options = exports.jwtOptions;
  options.subject = user.id;
  
  return jwt.sign({
    email: user.email,
    name: user.name
  }, process.env.JWT_PRIVATE_KEY, options);
};

exports.randomHash = len => crypto.randomBytes(len || 2).toString('hex');

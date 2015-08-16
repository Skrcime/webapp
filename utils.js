const jwt = require('jsonwebtoken');

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

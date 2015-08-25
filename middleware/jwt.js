const jwt = require('jsonwebtoken');

const domain = process.env.ENDPOINT;
const sessionExpiration = 172800000; // 48hours

exports.cookieKey = 'skrcime.jwt';
exports.cookieOptions = {
  httpOnly: true,
  maxAge: sessionExpiration,
  domain: `.${domain}`
};
exports.jwtOptions = {
  algorithm: 'RS256',
  issuer: 'skrci.me',
  expiresInSeconds: sessionExpiration / 1000
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
        this.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY, exports.jwtOptions);
      } catch(e) {}
    }
    
    // Redirect private URLs
    if (privateUrls.indexOf(this.request.path) !== -1 && !this.user) return this.redirect('/');
    
    yield next;
  };
};

exports.user = user => {
  var options = exports.jwtOptions;
  options.subject = user.id;
  
  return jwt.sign({
    email: user.email,
    name: user.name
  }, process.env.JWT_PRIVATE_KEY, options);
};

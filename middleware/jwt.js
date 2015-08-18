const jwt = require('jsonwebtoken');

const utils = require('../utils');

/**
 * JWT middleware
 */
module.exports = (privateUrls) => {
  return function *(next) {
    var auth = this.request.headers.authorization;
    var token = null;
    
    // Look for JWT
    if (auth && auth.split(' ')[0] === 'Bearer') token = auth.split(' ')[1];
    if (this.cookies.get(utils.cookieKey)) token = this.cookies.get(utils.cookieKey);
    
    if (token) {
      try { // Decode JWT
        this.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY, utils.jwtOptions);
      } catch(e) {}
    }
    
    // Redirect private URLs
    if (privateUrls.indexOf(this.request.path) !== -1 && !this.user) return this.redirect('/');
    
    yield next;
  };
};

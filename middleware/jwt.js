const jwt = require('jsonwebtoken');

const utils = require('../utils');

module.exports = (privateUrls) => {
  return function *(next) {
    var headers = this.request.headers;
    
    var token = null;
    if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
      token = headers.authorization.split(' ')[1];
    }
    if (this.cookies && this.cookies.get(utils.cookieKey)) {
      token = this.cookies.get(utils.cookieKey);
    }
    
    if (token) {
      try {
        this.user = jwt.verify(token, process.env.JWT_PUBLIC_KEY, utils.jwtOptions);
      } catch(e) {}
    }
    
    if (privateUrls.indexOf(this.request.path) !== -1 && !this.user) return this.redirect('/');
    
    yield next;
  };
};

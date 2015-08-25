var urlRegex = require('url-regex')({exact: true});
var emailRegex = require('email-regex')({exact: true});

exports.ready = function ready(callback) {
  if (typeof document !== 'object') return;
  if (document.readyState !== 'loading') return callback();
  
  document.addEventListener('DOMContentLoaded', callback);
};

exports.formParse = function(form) {
  var data = {};
  Array.prototype.forEach.call(form.querySelectorAll('input'), function(el, i){
    data[el.name] = el.value;
  });
  return data;
};

exports.loginValid = userValid.bind(null, 'login');
exports.registerValid = userValid.bind(null, 'register');
function userValid(type, user) {
  for (var key in user) {
    if (user.hasOwnProperty(key)) {
      var value = user[key];

      if (!value) return 'Missing ' + key;
      if (typeof value !== 'string') return 'Invalid ' + key;
      if (key === 'email' && !exports.isEmail(value)) return 'Invalid email';
      if (type === 'register') {
        if (key === 'password' && value.length < 6) return 'Password too short';
      }
    }
  }
  return true;
}

exports.toURL = function(val) {
  if (typeof val !== 'string') return val;
  return val.indexOf('://') !== -1 ? val : 'http://' + val;
};

exports.isURL = function(val) {
  return urlRegex.test(val);
};
exports.isEmail = function(val) {
  return emailRegex.test(val);
};

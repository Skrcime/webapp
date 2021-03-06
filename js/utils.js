'use strict';

var urlRegex = require('url-regex')({exact: true});
var emailRegex = require('email-regex')({exact: true});

// Document ready callback
exports.ready = function ready(fn) {
  console.log(typeof document);
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
};

// Parse form input data
exports.formParse = function(form) {
  var data = {};

  Array.prototype.forEach.call(form.querySelectorAll('input'), function(el){
    data[el.name] = el.value;
  });

  return data;
};

exports.isURL = function(val) {
  return urlRegex.test(val);
};
exports.isEmail = function(val) {
  return emailRegex.test(val);
};

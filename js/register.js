'use strict';

var common = require('../common');
var request = require('./request');

var ui = {};

function clickRegister(e) {
  e.preventDefault();

  var user = common.formParse(ui.form);
  var valid = common.loginValid(user);
  if (valid !== true) {
    return alert(valid);
  }

  request.post('/registracija', user, function(err, res) {
    if (err) return alert(res.message);
    alert('ok');
  });
}

module.exports = function() {
  common.ready(function() {
    ui = {
      register: document.querySelectorAll('.js-register')[0],
      form: document.querySelectorAll('form')[0]
    };

    ui.register.addEventListener('click', clickRegister);
  });
};

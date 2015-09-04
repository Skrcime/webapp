'use strict';

var common = require('../common');
var request = require('./request');

var ui = {};

function clickLogin(e) {
  e.preventDefault();

  var user = common.formParse(ui.form);
  var valid = common.loginValid(user);
  if (valid !== true) {
    return alert(valid);
  }

  request.post('/prijava', user, function(err, res) {
    if (err) return alert(res.message);
    window.location = 'http://' + window.SKRCIME.domain;
  });
}

module.exports = function() {
  common.ready(function() {
    ui = {
      login: document.querySelectorAll('.js-login')[0],
      form: document.querySelectorAll('form')[0]
    };

    ui.login.addEventListener('click', clickLogin);
  });
};

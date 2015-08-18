var utils = require('./utils');
var request = require('./request');

var ui = {};

module.exports = function() {  
  utils.ready(function() {
    ui = {
      login: document.querySelectorAll('.js-login')[0],
      form: document.querySelectorAll('form')[0]
    };

    ui.login.addEventListener('click', clickLogin);
  });
};

function clickLogin(e) {
  e.preventDefault();

  var payload = utils.formParse(ui.form);
  request.post('/api/login', payload, function(err, res) {
    if (err) return console.error(err);
    window.location = '/';
  });
}

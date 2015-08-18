var utils = require('./utils');
var request = require('./request');

var ui = {};

module.exports = function() {
  utils.ready(function() {
    ui = {
      register: document.querySelectorAll('.js-register')[0],
      form: document.querySelectorAll('form')[0]
    };

    ui.register.addEventListener('click', clickRegister);
  });
};

function clickRegister(e) {
  e.preventDefault();

  var payload = utils.formParse(ui.form);
  request.post('/api/register', payload, function(err, res) {
    if (err) return console.log(err);
    console.log(res);
  });
}

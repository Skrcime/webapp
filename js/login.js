var utils = require('./utils');
var request = require('./request');

module.exports = function() {
  var $button, $form;
  
  utils.ready(function() {
    $button = document.querySelectorAll('.js-login')[0];
    $form = document.querySelectorAll('form')[0];

    $button.addEventListener('click', clickLogin);
  });

  function clickLogin(e) {
    e.preventDefault();
    
    var payload = utils.formParse($form);
    request.post('/api/login', payload, function(err, res) {
      if (err) return console.log(err);
      window.location = '/';
    });
  }
};

var utils = require('./utils');
var request = require('./request');

module.exports = function() {
  var $button, $form;
  
  utils.ready(function() {
    $button = document.querySelectorAll('.js-register')[0];
    $form = document.querySelectorAll('form')[0];

    $button.addEventListener('click', clickRegister);
  });

  function clickRegister(e) {
    e.preventDefault();
    
    var payload = utils.formParse($form);
    request.post('/api/register', payload, function(err, res) {
      if (err) return console.log(err);
      console.log(res);
    });
  }
};

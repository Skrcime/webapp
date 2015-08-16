var utils = require('./utils');
var request = require('./request');

module.exports = function() {
  var $button, $input; 
  
  utils.ready(function() {
    $button = document.querySelectorAll('.js-shorten')[0];
    $input = document.querySelectorAll('.js-longurl')[0]; 

    $button.addEventListener('click', clickShorten);
  });

  function clickShorten(e) {
    e.preventDefault();

    var payload = {
      url: $input.value
    };

    request.post('/api/skrci', payload, function(err, res) {
      if (err) return console.log(err);
      console.log(res);
    });
  };
};

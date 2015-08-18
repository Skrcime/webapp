var utils = require('./utils');
var request = require('./request');

var ui = {};

module.exports = function() {  
  utils.ready(function() {
    ui = {
      shorten: document.querySelectorAll('.js-shorten')[0],
      input: document.querySelectorAll('.js-longurl')[0]
    };

    ui.shorten.addEventListener('click', clickShorten);
  });
};

function clickShorten(e) {
  e.preventDefault();

  var payload = {
    url: ui.input.value
  };

  request.post('/api/skrci', payload, function(err, res) {
    if (err) return console.log(err);
    console.log(res);
  });
}

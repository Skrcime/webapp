var utils = require('./utils');
var request = require('./request');

var ui = {};

module.exports = function() {  
  utils.ready(function() {
    ui = {
      shorten: document.querySelectorAll('.js-shorten')[0],
      form: document.querySelectorAll('form')[0]
    };
    ui.input = ui.form['url'];

    ui.shorten.addEventListener('click', clickShorten);
    ui.input.addEventListener('keydown', keydownShorten);
  });
};

function clickShorten(e) {
  e.preventDefault();

  var payload = utils.formParse(ui.form);
  if (!utils.isURL(payload.url)) {
    ui.input.className = 'invalid';
    return console.log('invalid URL');
  }
  
  request.post('/api/skrci', payload, function(err, res) {
    if (err) return console.log(err, res);
    console.log(res);
  });
}
function keydownShorten(e) {
  e.target.className = '';
}

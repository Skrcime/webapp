var common = require('../common');
var request = require('./request');

var ui = {};

module.exports = function() {  
  common.ready(function() {
    ui = {
      shorten: document.querySelectorAll('.js-shorten')[0],
      form: document.querySelectorAll('form')[0],
      result: document.querySelectorAll('.result')[0],
    };
    ui.input = ui.form['url'];
    ui.resultInput = ui.result.querySelectorAll('input')[0];

    ui.shorten.addEventListener('click', clickShorten);
    ui.input.addEventListener('keydown', keydownShorten);
  });
};

function clickShorten(e) {
  e.preventDefault();

  var payload = common.formParse(ui.form);
  if (!common.isURL(payload.url)) {
    ui.input.className = 'invalid';
    return alert('Invalid URL');
  }
  
  request.post('/skrci', payload, function(err, res) {
    if (err) return alert(err);
    
    ui.resultInput.value = window.SKRCIME.domain + '/' + res.hash;
    ui.result.className += ' show';
  });
}
function keydownShorten(e) {
  e.target.className = '';
}

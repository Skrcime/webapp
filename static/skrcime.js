(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./request":4,"./utils":6}],2:[function(require,module,exports){
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

},{"./request":4,"./utils":6}],3:[function(require,module,exports){
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

},{"./request":4,"./utils":6}],4:[function(require,module,exports){
exports.post = function(url, data, fn) {
  var req = new XMLHttpRequest();
  req.open('POST', url, true);
  req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  req.onload = function() {
    if (typeof fn === 'function') {
      try {
        fn(null, JSON.parse(req.response));
      } catch(e) {
        fn(e);
      }
    }
  };
  if (typeof fn === 'function') req.onerror = fn;

  req.send(JSON.stringify(data));
};

exports.get = function(url, fn) {
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  req.onload = function() {
    if (req.status >= 200 && req.status < 400) {
      fn(null, JSON.parse(req.response));
    } else {
      fn(new Error('HTTP ' + req.status));
    }
  };
  req.onerror = fn;

  req.send();
};

},{}],5:[function(require,module,exports){
console.log('Skrci.me v' + SKRCIME.version);

window.skrcime = {
  landing: require('./landing'),
  login: require('./login'),
  register: require('./register')
};

},{"./landing":1,"./login":2,"./register":3}],6:[function(require,module,exports){

exports.ready = function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
};

exports.formParse = function(form) {
  var data = {};
  
  Array.prototype.forEach.call(form.querySelectorAll('input'), function(el, i){
    data[el.name] = el.value;
  });
  
  return data;
};

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9sYW5kaW5nLmpzIiwianMvbG9naW4uanMiLCJqcy9yZWdpc3Rlci5qcyIsImpzL3JlcXVlc3QuanMiLCJqcy9za3JjaW1lLmpzIiwianMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyICRidXR0b24sICRpbnB1dDsgXG4gIFxuICB1dGlscy5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXNob3J0ZW4nKVswXTtcbiAgICAkaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbG9uZ3VybCcpWzBdOyBcblxuICAgICRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1Nob3J0ZW4pO1xuICB9KTtcblxuICBmdW5jdGlvbiBjbGlja1Nob3J0ZW4oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBwYXlsb2FkID0ge1xuICAgICAgdXJsOiAkaW5wdXQudmFsdWVcbiAgICB9O1xuXG4gICAgcmVxdWVzdC5wb3N0KCcvYXBpL3NrcmNpJywgcGF5bG9hZCwgZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICB9KTtcbiAgfTtcbn07XG4iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJy4vcmVxdWVzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJGJ1dHRvbiwgJGZvcm07XG4gIFxuICB1dGlscy5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWxvZ2luJylbMF07XG4gICAgJGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJylbMF07XG5cbiAgICAkYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tMb2dpbik7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGNsaWNrTG9naW4oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICB2YXIgcGF5bG9hZCA9IHV0aWxzLmZvcm1QYXJzZSgkZm9ybSk7XG4gICAgcmVxdWVzdC5wb3N0KCcvYXBpL2xvZ2luJywgcGF5bG9hZCwgZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gJy8nO1xuICAgIH0pO1xuICB9XG59O1xuIiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyICRidXR0b24sICRmb3JtO1xuICBcbiAgdXRpbHMucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWdpc3RlcicpWzBdO1xuICAgICRmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpWzBdO1xuXG4gICAgJGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrUmVnaXN0ZXIpO1xuICB9KTtcblxuICBmdW5jdGlvbiBjbGlja1JlZ2lzdGVyKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgdmFyIHBheWxvYWQgPSB1dGlscy5mb3JtUGFyc2UoJGZvcm0pO1xuICAgIHJlcXVlc3QucG9zdCgnL2FwaS9yZWdpc3RlcicsIHBheWxvYWQsIGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY29uc29sZS5sb2coZXJyKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgfSk7XG4gIH1cbn07XG4iLCJleHBvcnRzLnBvc3QgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKSB7XG4gIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgcmVxLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuICByZXEuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnKTtcblxuICByZXEub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4obnVsbCwgSlNPTi5wYXJzZShyZXEucmVzcG9uc2UpKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBmbihlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHJlcS5vbmVycm9yID0gZm47XG5cbiAgcmVxLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcblxuZXhwb3J0cy5nZXQgPSBmdW5jdGlvbih1cmwsIGZuKSB7XG4gIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgcmVxLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcpO1xuXG4gIHJlcS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAocmVxLnN0YXR1cyA+PSAyMDAgJiYgcmVxLnN0YXR1cyA8IDQwMCkge1xuICAgICAgZm4obnVsbCwgSlNPTi5wYXJzZShyZXEucmVzcG9uc2UpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm4obmV3IEVycm9yKCdIVFRQICcgKyByZXEuc3RhdHVzKSk7XG4gICAgfVxuICB9O1xuICByZXEub25lcnJvciA9IGZuO1xuXG4gIHJlcS5zZW5kKCk7XG59O1xuIiwiY29uc29sZS5sb2coJ1NrcmNpLm1lIHYnICsgU0tSQ0lNRS52ZXJzaW9uKTtcblxud2luZG93LnNrcmNpbWUgPSB7XG4gIGxhbmRpbmc6IHJlcXVpcmUoJy4vbGFuZGluZycpLFxuICBsb2dpbjogcmVxdWlyZSgnLi9sb2dpbicpLFxuICByZWdpc3RlcjogcmVxdWlyZSgnLi9yZWdpc3RlcicpXG59O1xuIiwiXG5leHBvcnRzLnJlYWR5ID0gZnVuY3Rpb24gcmVhZHkoZm4pIHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykgZm4oKTtcbiAgZWxzZSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZm4pO1xufTtcblxuZXhwb3J0cy5mb3JtUGFyc2UgPSBmdW5jdGlvbihmb3JtKSB7XG4gIHZhciBkYXRhID0ge307XG4gIFxuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKSwgZnVuY3Rpb24oZWwsIGkpe1xuICAgIGRhdGFbZWwubmFtZV0gPSBlbC52YWx1ZTtcbiAgfSk7XG4gIFxuICByZXR1cm4gZGF0YTtcbn07XG4iXX0=

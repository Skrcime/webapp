'use strict';

var URL_PREFIX = 'http://api.' + window.SKRCIME.domain;

// HTTP POST
exports.post = function(url, data, fn) {
  var req = new XMLHttpRequest();
  req.withCredentials = true;
  req.open('POST', URL_PREFIX + url, true);
  req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  req.onload = function() {
    if (typeof fn === 'function') {
      try {
        var err = null;
        if (req.status >= 300) err = new Error('HTTP ' + req.status);
        fn(err, JSON.parse(req.response));
      } catch(e) {
        fn(e);
      }
    }
  };
  if (typeof fn === 'function') req.onerror = fn;

  req.send(JSON.stringify(data));
};

// HTTP GET
exports.get = function(url, fn) {
  var req = new XMLHttpRequest();
  req.withCredentials = true;
  req.open('GET', URL_PREFIX + url, true);
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

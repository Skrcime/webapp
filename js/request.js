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

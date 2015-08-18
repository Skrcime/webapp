// Document ready callback
exports.ready = function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
};

// Parse form input data
exports.formParse = function(form) {
  var data = {};
  
  Array.prototype.forEach.call(form.querySelectorAll('input'), function(el, i){
    data[el.name] = el.value;
  });
  
  return data;
};

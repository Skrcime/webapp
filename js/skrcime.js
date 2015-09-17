'use strict';

window.SKRCIME.pages = {
  landing: require('./landing'),
  login: require('./login'),
  register: require('./register'),
  history: require('./history')
};

var ascii = ' _____ _           _             \n'+'|   __| |_ ___ ___|_|  _____ ___ \n'+'|__   | \'_|  _|  _| |_|     | -_|\n'+'|_____|_,_|_| |___|_|_|_|_|_|___| ';
console.log(ascii + window.SKRCIME.version);

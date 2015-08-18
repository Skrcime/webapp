console.log('Skrci.me v' + SKRCIME.version);

window.SKRCIME.pages = {
  landing: require('./landing'),
  login: require('./login'),
  register: require('./register')
};

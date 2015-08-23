const utils = require('../utils');
const log = require('../log');

module.exports = function *(hash){
  try {
    var urls = yield this.knex('urls').where('hash', hash);
    if (urls.length !== 1) return this.redirect('/');
    log.debug(`Redirect ${hash}`);
    
    this.redirect(utils.toURL(urls[0].full));
  } catch(err) {
    log.error(`Redirect ${err}`);
    this.redirect('/');
  }
};

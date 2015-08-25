const common = require('../common');
const log = require('../log');

module.exports = function *(hash){
  log.debug(`Redirect ${hash}`);
  
  try {
    var urls = yield this.knex('urls').where('hash', hash);
    if (urls.length !== 1) return this.redirect('/');
    log.debug(`Redirect ${hash}`);
    
    this.redirect(common.toURL(urls[0].full));
  } catch(err) {
    log.error(`Redirect ${err}`);
    this.redirect('/');
  }
};

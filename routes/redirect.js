const common = require('../common');
const log = require('../log');

module.exports = function *(){
  log.debug(`Redirect ${this.params.hash}`);
  
  try {
    var urls = yield this.knex('urls').where('hash', this.params.hash);
    if (urls.length !== 1) return this.redirect('/');
    log.debug(`Redirect ${this.params.hash}`);
    
    this.redirect(common.toURL(urls[0].full));
  } catch(err) {
    log.error(`Redirect ${err}`);
    this.redirect('/');
  }
};

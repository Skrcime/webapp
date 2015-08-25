const domain = process.env.ENDPOINT;

module.exports = subdomain => {  
  return function *(next) {
    var subs = this.request.subdomains[0];

    if (this.request.subdomains[0] === subdomain) yield next;
    else this.redirect(`http://${domain}`);
  };
};

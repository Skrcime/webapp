const domain = process.env.ENDPOINT;

module.exports = subdomain => {  
  return function *(next) {
    if (this.request.subdomains[0] === subdomain) yield next;
    else this.redirect(`http://${domain}`);
  };
};

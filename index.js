'use strict';

let koa = require('koa');
let app = koa();

let route = require('koa-route');
let serve = require('koa-static');
let hbs = require('koa-handlebars');

let log = require('./log');
let landing = require('./routes/landing');

const config = require('./package.json').config;

app.use(hbs({
  defaultLayout: 'main',
  cache: app.env !== 'development'
}));

app.use(serve('static'));
app.use(function *(next) {
  this.production = (app.env === 'production');
  yield next;
});

app.use(route.get('/', landing));

app.listen(config.port);
log.info(`Server running on ${config.host}:${config.port}`);

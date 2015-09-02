const app = require('koa')();
const Router = require('koa-router');

const log = require('./log');
const redirect = require('./routes/redirect');
const render = require('./routes/render');
const api = require('./routes/api');

const subdomain = require('./middleware/subdomain');

const urls = require('./urls.json');

const port = process.env.PORT || 3000;

// Middleware
app.use(require('koa-handlebars')({
  defaultLayout: 'main',
  cache: app.env !== 'development',
  helpers: require('./middleware/hbs')
}));
app.use(require('koa-static')('static'));
app.use(require('koa-bodyparser')());
app.use(require('kcors')({credentials: true}));

// Custom middleware
app.use(require('./middleware/jwt').session(urls.private));
app.use(require('./middleware/parameters')());
app.use(require('./middleware/knex')({client: 'pg'}));

// Landing
const landingRoute = new Router();
landingRoute.get('/', subdomain(), render.landing);

// App
const appRoute = new Router();
urls.app.forEach(route => appRoute.get(route, subdomain('moj'), render[route.substr(1)]));

// API
const apiRoute = new Router();
urls.api.forEach(route => apiRoute.post(route, subdomain('api'), api[route.substr(1)]));

// Redirect
const redirectRoute = new Router();
redirectRoute.get('/:hash', subdomain(), redirect);

app.use(landingRoute.routes());
app.use(appRoute.routes());
app.use(apiRoute.routes());
app.use(redirectRoute.routes());

app.listen(port);
log.info(`Skrcime running on port:${port}`);

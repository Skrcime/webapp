const koa = require('koa');
const app = koa();

const route = require('koa-route');

const log = require('./log');

const render = require('./routes/render');
const api = require('./routes/api');

const pkg = require('./package.json');
const port = process.env.PORT || 3000;

const privateUrls = ['/racun'];

// Middleware
app.use(require('koa-handlebars')({
  defaultLayout: 'main',
  cache: app.env !== 'development'
}));
app.use(require('koa-static')('static'));
app.use(require('koa-bodyparser')());

// Custom middleware
app.use(require('./middleware/jwt')(privateUrls));
app.use(require('./middleware/parameters')());
app.use(require('./middleware/knex')({client: 'pg'}));

// Routes
app.use(route.get('/', render.landing));
app.use(route.get('/prijava', render.login));
app.use(route.get('/odjava', render.logout));
app.use(route.get('/registracija', render.register));

// API
app.use(route.post('/api/skrci', api.shorten));
app.use(route.post('/api/login', api.login));
app.use(route.post('/api/register', api.register));

app.listen(port);
log.info(`Skrcime running on port:${port}`);

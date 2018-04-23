const path = require('path')

const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const serve = require('koa-static');
const mount = require('koa-mount')
const logger = require('koa-logger')
const session = require('koa-session')
// const redisStore = require('koa-redis')
const router = require('koa-router')()

const config = require('../config')

// 会话session，存redis
app.keys = config.sessionSecret
app.use(session(config.session, app))

require('./db/index')
var v1Router = require('./routes/v1')
app.use(logger())
app.use(bodyParser())
app.use(json())

// 静态资源
// app.use(serve(path.join(__dirname, './server/public')))
// app.use(mount('/admin', serve(path.join(__dirname, './admin'))))
// app.use(mount('/', serve(path.join(__dirname, './app'))))
// 接口文档
app.use(mount('/doc/', serve(path.join(__dirname, '../apidoc'))))

// 路由
router.use('/api', v1Router.routes(), v1Router.allowedMethods())
app.use(router.routes(), router.allowedMethods())

app.use(async function (ctx) {
  ctx.body = {
    code: 404,
    msg: 'not fount'
  }
})

app.on('error', function (err, ctx) {
  console.log('server err', err);
})

module.exports = app

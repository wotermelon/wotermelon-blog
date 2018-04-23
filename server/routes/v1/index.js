const Router = require('koa-router')
const postRouter = require('./post')
// const messageRouter = require('./message')
const authRouter = require('./auth')
const tagRourter = require('./tag')

const router = new Router({
  prefix: '/v1'
})
router.get('/ping', async (ctx, next) => {
  ctx.body = {
    code: 0,
    data: ctx.session
  }
})
// 登录相关鉴权
router.use('/auth', authRouter.routes(), authRouter.allowedMethods())
// 文章
router.use('/post', postRouter.routes(), postRouter.allowedMethods())
// 标签
router.use('/tag', tagRourter.routes(), tagRourter.allowedMethods())
module.exports = router

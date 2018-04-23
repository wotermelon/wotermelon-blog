const Router = require('koa-router')
const router = new Router()

const authCtrl = require('../../db/controller/auth')

// 登录
router.post('/login', authCtrl.login)
// 登出
router.post('/logout', authCtrl.logout)

module.exports = router

const config = require('../../../config')
/**
 * 登录
 */
exports.login = async (ctx) => {
  let {
    username,
    password
  } = ctx.request.body
  if (config.admin.username === username && config.admin.password === password) {
    ctx.session = config.admin
    ctx.body = {
      code: 0,
      msg: '登录成功'
    }
  } else {
    ctx.status = 401
    ctx.body = {
      code: 401,
      msg: '用户名或密码错误'
    }
  }
}
/**
 * 登出
 */
exports.logout = async (ctx) => {
  ctx.session = null
  ctx.body = {
    code: 0,
    msg: '成功'
  }
}

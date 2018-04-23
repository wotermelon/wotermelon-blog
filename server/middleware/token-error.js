const config = require('../../config')

module.exports = function () {
  return async function (ctx, next) {
    return next().catch((err) => {
      if (401 == err.status) {
        ctx.status = 401
        ctx.body = {
          code: 401,
          msg: '认证失败'
        }
      } else {
        throw err
      }
    })
  }
}
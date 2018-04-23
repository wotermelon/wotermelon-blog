var messageDal = require('../dal/message')

/**
 * 获取留言列表
 */
exports.get = async (ctx) => {
  // 一次获取几条
  let pageSize = ctx.request.query.pageSize === undefined ? undefined : +ctx.request.query.pageSize
  // 跳过几条
  let skip = ctx.request.query.skip === undefined ? undefined : +ctx.request.query.skip
  // 关键字
  let keyword = ctx.query.search
  if ((pageSize === undefined && skip === undefined) ||
    (!isNaN(pageSize) && pageSize >= 0 && !isNaN(skip) && skip >= 0)) {
    // 如果是后台管理
    let query = ctx.request.query.admin ? {} : {
      status: {
        $ne: -1
      }
    }
    let messages = await messageDal.findMessages(query, {
      pageSize,
      skip,
      keyword
    })
    let topMessage = messages.filter((item, index) => {
      if (item.status === 1) {
        messages.splice(index, 1)
      }
      return item.status === 1
    }).sort((a, b) => b.at - a.at)
    ctx.body = {
      code: 0,
      msg: '成功',
      data: topMessage.concat(messages)
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '参数错误'
    }
  }
}
/**
 * 创建留言
 */
exports.post = async (ctx) => {
  console.log(ctx.request.ip)
  let msg = {
    nickName: ctx.request.body.name,
    email: ctx.request.body.email,
    content: ctx.request.body.content.trim(),
    // TODO:
    avatar: 'test',
    ip: ctx.request.ip
  }
  if (!msg.content) {
    ctx.body = {
      code: 0,
      msg: '内容不能为空'
    }
  }
  let msgIns = await messageDal.createMessage(msg)
  ctx.body = {
    code: 0,
    msg: '成功',
    data: msgIns
  }
}
/**
 * 编辑留言
 */
exports.patch = async (ctx) => {
  let updateValue = {
    status: ctx.request.body.status
  }
  let msgId = ctx.request.params.msgId
  // 如果置顶的话
  if (updateValue.status === 1) {
    updateValue.at = new Date()
  }
  await messageDal.updateMessage(msgId, updateValue)
  ctx.body = {
    code: 0,
    msg: '成功',
    data: updateValue
  }
}
/**
 * 删除留言
 */
exports.del = async (ctx) => {
  let msgIds = ctx.request.body.ids
  await messageDal.deleteMessage(msgIds)
  ctx.body = {
    code: 0,
    msg: '成功'
  }
}
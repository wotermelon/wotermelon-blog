var mongoose = require('mongoose')
var Message = mongoose.model('Message')

/* 创建留言 */
exports.createMessage = (message) => {
  return (new Message(message)).save()
}
/* 删除留言 */
exports.deleteMessage = (id) => {
  return Message.remove({
    _id: Array.isArray(id) ? id.length === 1 ? id[0] : {
      $in: id
    } : id
  }).exec()
}
/* 更新留言 */
exports.updateMessage = (id, value) => {
  return Message.update({
    _id: id
  }, {
    $set: value
  }).exec()
}
/* 获取留言 */
exports.findMessages = (query, { pageSize, skip, keyword }, detail = false) => {
  var queryOption = Object.assign({}, query)
  if (keyword) {
    let reg = {
      $regex: new RegExp(keyword, 'i')
    }
    queryOption['$or'] = [{
      nickName: reg
    }, {
      email: reg
    }, {
      content: reg
    }]
  }
  // 倒序排
  let _query = Message.find(queryOption).sort({
    createdAt: -1
  })
  if (pageSize !== undefined) {
    _query = _query.limit(pageSize).skip(skip)
  }
  if (!detail) {
    _query.select('-ip -status -at')
  }
  return _query.exec()
}
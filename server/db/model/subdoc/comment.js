const mongoose = require('mongoose')
const Schema =  mongoose.Schema
var ObjectId = Schema.Types.ObjectId

let obj = {
  ip: {
    type: String,
    trim: true
  },
  // 昵称
  nickname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}

const Comment = new Schema(Object.assign({}, obj, {
  // 评论回复
  replies: [
    new Schema(Object.assign({}, obj, {
      // 是否admin的评论
      isAdmin: {
        type: Boolean,
        default: false
      },
      // 回复时间
      replyedAt: {
        type: Date,
        default: new Date()
      }
    }))
  ]
}), {
  timestamps: true
})

module.exports = Comment

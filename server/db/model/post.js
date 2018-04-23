const mongoose = require('mongoose')
const Schema =  mongoose.Schema
var ObjectId = Schema.Types.ObjectId

const Comment = require('./subdoc/comment')

const Post = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  // markdown元数据
  content: {
    type: String,
    trim: true,
    required: true,
    default: ''
  },
  // 格式化好的html数据
  renderContent: {
    type: String,
    trim: true,
    required: true,
    default: ''
  },
  // 封面图
  thumb: {
    type: String
  },
  // 所属标签
  tag: {
    type: ObjectId,
    ref: 'Tag'
  },
  // 0正常，1草稿
  status: {
    type: Number,
    default: 0
  },
  // 点赞数
  like: {
    type: Number,
    default: 0
  },
  // 评论
  comments: [Comment]
}, {
  timestamps: true
})

module.exports = Post

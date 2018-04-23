const mongoose = require('mongoose')
const md = require('../../lib/markdown/md')
const postDal = require('../dal/post')
const struct = require('../../utils/struct')
const config = require('../../../config')

const Post = struct({
  title: 'string',
  content: 'string',
  tag: 'objectId?',
  status: 'number?'
})
const Comment = struct({
  nickname: 'string',
  email: 'email',
  content: 'string'
})

/**
 * 获取文章列表
 */
exports.getPostList = async (ctx) => {

}
/**
 * 创建文章
 */
exports.createPost = async (ctx) => {
  let post
  try {
    post = Post(ctx.request.body)
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: -1,
      msg: '参数错误'
    }
    return
  }
  post.renderContent = md.render(post.content)
  const result = await postDal.create(post)
  ctx.body = {
    code: 0,
    msg: '成功',
    data: result
  }
}
/**
 * 全量修改文章
 */
exports.putPost = async (ctx) => {
  const postId = ctx.params.postId
  let post
  try {
    post = Post(ctx.request.body)
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: -1,
      msg: '参数错误'
    }
    return
  }
  post.renderContent = md.render(post.content)
  const result = await postDal.findOneAndUpdate({
    _id: postId
  }, post)
  ctx.body = {
    code: 0,
    msg: '成功',
    data: result
  }
}
/**
 * 修改文章
 */
exports.patchPost = async (ctx) => {
  const postId = ctx.params.postId
  const updateData = {
    status: ctx.request.body.status === 0 ? 0 : 1
  }
  const result = await postDal.update({
    _id: postId
  }, updateData)
  if (result.ok) {
    ctx.body = {
      code: 0,
      msg: '成功'
    }
  } else {
    ctx.body = {
      code: 2,
      msg: '失败'
    }
  }
}
/**
 * 获取文章详情
 */
exports.getPostInfo = async (ctx) => {
  const postId = ctx.params.postId
  const result = await postDal.findById(postId)
  ctx.body = {
    code: 0,
    msg: '成功',
    data: result
  }
}
/**
 * 删除文章
 */
exports.deletePost = async (ctx) => {
  const postId = ctx.params.postId
  const force = ctx.query.force === 'true'
  // 如果不是强制删除
  if (!force) {
    const post = await postDal.findById(postId, 'like comments')
    if (post.like !== 0 || post.comments.length) {
      ctx.body = {
        code: -2,
        msg: '该文章有很多人喜欢',
        data: post.toObject()
      }
      return
    }
  }
  const result = await postDal.remove({
    _id: postId
  })
  if (result.result.ok) {
    ctx.body = {
      code: 0,
      msg: '成功'
    }
  } else {
    ctx.body = {
      code: 2,
      msg: '失败'
    }
  }
}
/**
 * 点赞
 */
exports.like = async (ctx) => {
  const postId = ctx.params.postId
  await postDal.update({
    _id: postId
  }, {
    $inc: {
      like: 1
    }
    })
  ctx.body = {
    code: 0,
    msg: '成功'
  }
}

/*------------------ 评论回复 ------------------ */

/**
 * 创建评论
 */
exports.createComment = async (ctx) => {
  const postId = ctx.params.postId
  let comment
  try {
    comment = Comment(ctx.request.body)
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: '参数错误'
    }
    return
  }
  comment.ip = ctx.ip
  const result = await postDal.findByIdAndUpdate(postId, {
    $push: {
      comments: comment
    }
  })
  ctx.body = {
    code: 0,
    msg: '成功',
    data: result
  }
}
/**
 * 删除评论
 */
exports.deleteComment = async (ctx) => {
  const { postId, commentId } = ctx.params
  const result = await postDal.findByIdAndUpdate(postId, {
    $pull: {
      comments: {
        _id: commentId
      }
    }
  })
  ctx.body = {
    code: 0,
    msg: '成功',
    data: result
  }
}
/**
 * 回复评论
 */
exports.reply = async (ctx) => {
  const { postId, commentId } = ctx.params
  let reply
  try {
    reply = Comment(ctx.request.body)
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: '参数错误'
    }
    return
  }
  const post = await postDal.findById(postId, 'comments')
  const comment = post.comments.id(commentId)
  if (!comment) {
    ctx.body = {
      code: 3,
      msg: '该评论已被删除'
    }
    return
  }
  // session判断是否是管理员
  const isAdmin = ctx.session &&
    config.admin.username === ctx.session.username &&
    config.admin.password === ctx.session.password
  Object.assign(reply, {
    ip: ctx.ip,
    isAdmin
  })
  const replyModel = comment.replies.create(reply)
  comment.replies.push(replyModel)
  await post.save()
  ctx.body = {
    code: 0,
    msg: '成功',
    data: comment
  }
}
/**
 * 删除回复
 */
exports.deleteReply = async (ctx) => {
  const { postId, commentId, replyId } = ctx.params
  const post = await postDal.findById(postId, 'comments')
  const comment = post.comments.id(commentId)
  comment.replies.pull(replyId)
  await post.save()
  ctx.body = {
    code: 0,
    msg: '成功',
    data: comment
  }
}

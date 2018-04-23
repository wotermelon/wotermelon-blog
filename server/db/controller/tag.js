const tagDal = require('../dal/tag')
const postDal = require('../dal/post')
const { struct } = require('superstruct')

const Tag = struct({
  name: 'string'
})
/**
 * 获取所有标签
 */
exports.getTags = async (ctx, next) => {
  const tagList = await tagDal.find()
  ctx.body = {
    code: 0,
    msg: '成功',
    data: tagList
  }
}
/**
 * 创建标签
 */
exports.createTag = async (ctx, next) => {
  let tag
  try {
    tag = Tag(ctx.request.body)
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: '参数错误'
    }
    return
  }
  const result = await tagDal.create(tag)
  ctx.body = {
    code: 0,
    msg: '成功',
    data: result
  }
}
/**
 * 更新标签
 */
exports.updateTag = async (ctx, next) => {
  const tagId = ctx.params.tagId
  let tag
  try {
    tag = Tag(ctx.request.body)
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: '参数错误'
    }
    return
  }
  const result = await tagDal.findByIdAndUpdate(tagId, tag)
  ctx.body = {
    code: 0,
    msg: '成功',
    data: result
  }
}
/**
 * 删除标签
 */
exports.deleteTag = async (ctx, next) => {
  const tagId = ctx.params.tagId
  await tagDal.remove({
    _id: tagId
  })
  ctx.body = {
    code: 0,
    msg: '成功'
  }
}
/**
 * 根据标签获取文章
 */
exports.getPostByTag= async (ctx, next) => {
  const tagId = ctx.request.params.tagId
  const postList = await postDal.find({
    tag: tagId
  }, undefined, {
    createdAt: -1
  })
  ctx.body = {
    code: 0,
    msg: '成功',
    data: postList
  }
}

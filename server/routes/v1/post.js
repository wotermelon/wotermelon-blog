const Router = require('koa-router')
const router = new Router()

const postCrl = require('../../db/controller/post')

/* 获取文章列表 */
router.get('/', postCrl.getPostList)
/* 创建文章 */
router.post('/', postCrl.createPost)
/* 全量修改文章 */
router.put('/:postId', postCrl.putPost)
/* 修改文章 */
router.patch('/:postId', postCrl.patchPost)
/* 获取文章详情 */
router.get('/:postId', postCrl.getPostInfo)
/* 删除文章 */
router.delete('/:postId', postCrl.deletePost)
// 点赞
router.get('/:postId/like', postCrl.like)

/*------------------ 评论回复 ------------------ */

// 评论
router.post('/:postId/comment', postCrl.createComment)
// 删除评论
router.delete('/:postId/comment/:commentId', postCrl.deleteComment)
// 回复评论
router.post('/:postId/comment/:commentId/reply', postCrl.reply)
// 删除回复
router.delete('/:postId/comment/:commentId/reply/:replyId', postCrl.deleteReply)

module.exports = router

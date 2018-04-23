const Router = require('koa-router')
const router = new Router()

const tagCrl = require('../../db/controller/tag')

/* 获取所有标签 */
router.get('/', tagCrl.getTags)
/* 新建标签 */
router.post('/', tagCrl.createTag)
/* 更新标签 */
router.put('/:tagId', tagCrl.updateTag)
/* 删除标签 */
router.delete('/:tagId', tagCrl.deleteTag)
/* 获取标签下的文章 */
router.get('/:tagId/post', tagCrl.getPostByTag)

module.exports = router

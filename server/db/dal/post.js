const BaseDal = require('../base-dal')

class PostDal extends BaseDal {
  constructor(...args) {
    super(...args)
  }
}

const postDal = new PostDal('Post')

module.exports = postDal
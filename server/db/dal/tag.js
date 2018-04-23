const BaseDal = require('../base-dal')

class TagDal extends BaseDal {
  constructor(...args) {
    super(...args)
  }
}

const tagDal = new TagDal('Tag')

module.exports = tagDal
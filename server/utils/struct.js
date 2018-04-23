const mongoose = require('mongoose')
const { superstruct } = require('superstruct')
const isEmail = require('is-email')

const struct = superstruct({
  types: {
    objectId: v => mongoose.Types.ObjectId.isValid(v),
    email: v => isEmail(v) && v.length < 256
  }
})

module.exports = struct

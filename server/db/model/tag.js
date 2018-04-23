const mongoose = require('mongoose')
const Schema =  mongoose.Schema
var ObjectId = Schema.Types.ObjectId

const Tag = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: false
})

module.exports = Tag

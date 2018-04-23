const mongoose = require('mongoose')
const PostSchema = require('./model/post')
const TagSchema = require('./model/tag')

mongoose.model('Post', PostSchema)
mongoose.model('Tag', TagSchema)

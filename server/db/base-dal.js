const mongoose = require('mongoose')

class BaseDal {
  constructor(modelName) {
    if (typeof modelName !== 'string') throw new Error('A model is required.')
    this.dbModel = mongoose.model(modelName)
  }
  create (model) {
    return new this.dbModel(model).save()
  }
  bulkCreate (models) {
    return this.dbModel.create(models)
  }
  findById (id, select, isLean = false) {
    let query = this.dbModel.findById(id).select(select)
    if (isLean) {
      query = query.lean()
    }
    return query.exec()
  }
  updateOrCreate (query, value) {
    return this.dbModel.findOneAndUpdate(query, value, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }).exec()
  }
  findOne (query, select, lean = false) {
    let querySql = this.dbModel.findOne(query).select(select)
    if (isLean) {
      querySql = querySql.lean()
    }
    return querySql.exec()
  }
  find (query, select, sort) {
    let querySql = this.dbModel.find(query).select(select).sort(sort)
    return querySql.exec()
  }
  update (query, updateValue, options = {}) {
    return this.dbModel.update(query, updateValue, options).exec()
  }
  findOneAndUpdate (query, updateValue, options = {}) {
    options.new = true
    return this.dbModel.findOneAndUpdate(query, updateValue, options).exec()
  }
  findByIdAndUpdate (id, updateValue, options = {}) {
    options.new = true
    return this.dbModel.findByIdAndUpdate(id, updateValue, options).exec()
  }
  remove (query) {
    return this.dbModel.remove(query).exec()
  }
  findOneAndRemove (query, options = {}) {
    return this.dbModel.findOneAndRemove(query, options).exec()
  }
  count (query) {
    return this.dbModel.count(query).exec()
  }
}

module.exports = BaseDal
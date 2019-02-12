'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  sector () {
    return this.belongsTo('App/Models/Sector')
  }
}

module.exports = Category

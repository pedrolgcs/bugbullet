'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Solicitation extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  category () {
    return this.belongsTo('App/Models/Category')
  }
}

module.exports = Solicitation

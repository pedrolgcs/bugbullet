'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sector extends Model {
  users () {
    return this.belongsToMany('App/Models/User')
  }
  categories () {
    return this.hasMany('App/Models/Category')
  }
  solicitations () {
    return this.hasMany('App/Models/Solicitation')
  }
}

module.exports = Sector

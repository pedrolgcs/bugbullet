'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sector extends Model {
  // one sector hasMany users
  users () {
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Sector

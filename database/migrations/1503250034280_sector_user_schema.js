'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectorUserSchema extends Schema {
  up () {
    this.create('sector_user', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('sector_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('sectors')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('sector_users')
  }
}

module.exports = SectorUserSchema

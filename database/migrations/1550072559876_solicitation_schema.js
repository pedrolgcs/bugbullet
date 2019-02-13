'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SolicitationSchema extends Schema {
  up () {
    this.create('solicitations', (table) => {
      table.increments()
      // maps
      table.decimal('latitude', 9, 6).nullable()
      table.decimal('longitude', 9, 6).nullable()
      // check
      table.boolean('isCheck').defaultTo(false)
      // category
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      // user auth
      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('solicitations')
  }
}

module.exports = SolicitationSchema

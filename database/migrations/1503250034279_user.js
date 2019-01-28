'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      // login data
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      // personal data
      table.string('name', 254).notNullable()
      table.string('phone', 11).nullable()
      table.string('cpf', 11).nullable()
      // address
      table.string('city', 80).nullable()
      table.string('neighborhood', 254).nullable()
      table.string('street', 254).nullable()
      table.string('number', 10).nullable()
      // sector
      table
        .integer('sector_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('sectors')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      // data time
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

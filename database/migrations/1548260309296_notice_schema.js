'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoticeSchema extends Schema {
  up () {
    this.create('notices', (table) => {
      table.increments()
      table.string('title').notNullable().unique()
      table.string('sub_title').nullable()
      table.text('notice').nullable()
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
    this.drop('notices')
  }
}

module.exports = NoticeSchema

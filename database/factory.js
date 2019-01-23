'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    name: data.name,
    email: data.email,
    password: data.password
  }
})

Factory.blueprint('Adonis/Acl/Role', (faker, i, data = {}) => {
  data = Object.assign({
    slug: 'administrator' || data.slug,
    name: 'Administrator' || data.name,
    description: 'Administrator system' || data.description
  }, data)
  return data
})

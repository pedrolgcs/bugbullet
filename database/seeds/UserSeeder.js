'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    // ----------------------------- Users -----------------------------
    const pedro = await Factory.model('App/Models/User').create({
      name: 'Pedro Henrique',
      email: 'pedro.lg.cs@gmail.com',
      password: 'pedro'
    })
    const jana = await Factory.model('App/Models/User').create({
      name: 'Janaina Luana',
      email: 'jana@gmail.com',
      password: 'jana'
    })

    // ----------------------------- Roles ---------------------------------
    const administrator = await Factory.model('Adonis/Acl/Role').create()
    const coordinator = await Factory.model('Adonis/Acl/Role').create({
      slug: 'coordinator',
      name: 'Coordinator',
      description: 'Coordinator system'
    })
    // ----------------------------- User Role ------------------------------
    await pedro.roles().save(administrator)
    await jana.roles().save(coordinator)

    // ----------------------------- Permission -----------------------------
    const readUsers = await Factory.model('Adonis/Acl/Permission').make(
      {
        slug: 'read_users',
        name: 'Ver usuários',
        description: 'Controle sobre os usuários do sistema'
      }
    )
    const createUser = await Factory.model('Adonis/Acl/Permission').make(
      {
        slug: 'create_users',
        name: 'Cadastro de usuário',
        description: 'Controle sobre os usuários do sistema'
      }
    )
    const updateUser = await Factory.model('Adonis/Acl/Permission').make(
      {
        slug: 'update_users',
        name: 'Atualização de usuário',
        description: 'Controle sobre os usuários do sistema'
      }
    )
    const deleteUser = await Factory.model('Adonis/Acl/Permission').make(
      {
        slug: 'delete_users',
        name: 'Remover usuário',
        description: 'Controle sobre os usuários do sistema'
      }
    )
    // ----------------------------- Roles Permission -----------------------
    await administrator.permissions().save(readUsers)
    await administrator.permissions().save(createUser)
    await administrator.permissions().save(updateUser)
    await administrator.permissions().save(deleteUser)

    // ----------------------------- Notices --------------------------------
    const noticePedro = await Factory.model('App/Models/Notice').make()
    await pedro.notices().save(noticePedro)
    const noticeJana = await Factory.model('App/Models/Notice').make()
    await jana.notices().save(noticeJana)

    // ----------------------------- Sector --------------------------------
    const zoonose = await Factory.model('App/Models/Sector').create({
      name: 'Zoonose',
      description: 'Setor responsavel por problemas de origem Animal'
    })
    await pedro.sectors().save(zoonose)
  }
}

module.exports = UserSeeder

'use strict'

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
class PermissionSeeder {
  async run () {
    const permissionsUser = [
      {
        slug: 'read_users',
        name: 'Ver usuários',
        description: 'Controle sobre os usuários do sistema'
      },
      {
        slug: 'create_users',
        name: 'Cadastro de usuário',
        description: 'Controle sobre os usuários do sistema'
      },
      {
        slug: 'update_users',
        name: 'Atualização de usuário',
        description: 'Controle sobre os usuários do sistema'
      },
      {
        slug: 'delete_users',
        name: 'Remover usuário',
        description: 'Controle sobre os usuários do sistema'
      }
    ]
    permissionsUser.forEach(async permission => {
      await Factory.model('Adonis/Acl/Permission').create(permission)
    })
  }
}

module.exports = PermissionSeeder

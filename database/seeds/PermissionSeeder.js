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
      // user
      {
        slug: 'read_users',
        name: 'Ver usuários',
        description: 'Ver usuários cadastrados no sistema'
      },
      {
        slug: 'create_users',
        name: 'Cadastrar usuário',
        description: 'Cadastrar novos usuários'
      },
      {
        slug: 'update_users',
        name: 'Atualizar usuário',
        description: 'Atualziar dados dos usuários cadastrados'
      },
      {
        slug: 'delete_users',
        name: 'Remover usuário',
        description: 'Deletar usuários do sistema'
      },
      // Notices
      {
        slug: 'create_notices',
        name: 'Criar notícia',
        description: 'Cadastrar novas noticias'
      },
      {
        slug: 'update_notices',
        name: 'Atualizar notícias',
        description: 'Cadastrar novas noticias'
      },
      {
        slug: 'delete_notices',
        name: 'Remover notícias',
        description: 'Remover notícias do siste,a'
      }
    ]
    permissionsUser.forEach(async permission => {
      await Factory.model('Adonis/Acl/Permission').create(permission)
    })
  }
}

module.exports = PermissionSeeder

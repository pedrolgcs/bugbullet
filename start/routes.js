'use strict'

const Route = use('Route')

// -------------------- Home -------------------- //
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
}).prefix('api/v1')

// -------------------- Login -------------------- //
Route.post('/sessions', 'SessionController.create').prefix('api/v1')

// -------------------- User Auth -------------------- //
Route.group(() => {
  Route.post('/user', 'UserController.store').as('user.store')
  Route.get('/user', 'UserController.show').as('user.show')
  Route.put('/user', 'UserController.update').as('users.update')
}).middleware(['auth']).prefix('api/v1')

// -------------------- Moderator -------------------- //
Route.group(() => {
  // ----- Users -----
  Route.resource('/users', 'UserController').apiOnly()
    .middleware(new Map([
      [['index', 'show'], ['auth:jwt', 'can:read_users']],
      [['store'], ['auth:jwt', 'can:create_users']],
      [['update'], ['auth:jwt', 'can:update_users']],
      [['destroy'], ['auth:jwt', 'can:delete_users']]
    ]))

  // ----- Notices -----
  Route.resource('/notices', 'NoticeController').apiOnly()
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth:jwt', 'can:notices']]
    ]))
}).namespace('Admin').prefix('api/v1')

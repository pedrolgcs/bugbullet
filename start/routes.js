'use strict'

const Route = use('Route')

// -------------------- Home -------------------- //
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
}).prefix('api/v1')

// -------------------- Login -------------------- //
Route.post('/sessions', 'SessionController.create').prefix('api/v1')

// User register
Route.post('/user', 'UserController.store').as('user.store')
// -------------------- User Auth -------------------- //
Route.group(() => {
  Route.get('/user', 'UserController.show').as('user.show')
  Route.put('/user', 'UserController.update').as('user.update')
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
      [['store'], ['auth:jwt', 'can:create_notices']],
      [['update'], ['auth:jwt', 'can:update_notices']],
      [['destroy'], ['auth:jwt', 'can:delete_notices']]
    ]))
  // ----- Sectors -----
  Route.resource('/sectors', 'SectorController').apiOnly()
    .middleware(new Map([
      [['index', 'show'], ['auth:jwt', 'can:read_sectors']],
      [['store'], ['auth:jwt', 'can:create_sectors']],
      [['update'], ['auth:jwt', 'can:update_sectors']],
      [['destroy'], ['auth:jwt', 'can:delete_sectors']]
    ]))
  // ----- Roles -----
  Route.resource('/roles', 'RoleController').apiOnly()
    .middleware(new Map([
      [['index', 'show'], ['auth:jwt', 'can:read_roles']],
      [['store'], ['auth:jwt', 'can:create_roles']],
      [['update'], ['auth:jwt', 'can:update_roles']],
      [['destroy'], ['auth:jwt', 'can:delete_roles']]
    ]))
}).namespace('Admin').prefix('api/v1')

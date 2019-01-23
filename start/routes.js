'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// -------------------- Login -------------------- //
Route.post('/sessions', 'SessionController.create')

// -------------------- User -------------------- //
Route.group(() => {
  Route.post('/user', 'UserController.store').as('user.store')
  Route.get('/user', 'UserController.show').as('user.show')
  Route.put('/user', 'UserController.update').as('users.update')
}).middleware(['auth'])

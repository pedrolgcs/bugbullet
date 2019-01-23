'use strict'
const User = use('App/Models/User')
/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Create/save a new user.
   * POST users
   */
  async store ({ request, response }) {
    const data = request.only([ 'name', 'email', 'password' ])
    try {
      const user = await User.create(data)
      return response.status(201).send(user)
    } catch (error) {
      return response.status(400).send({ error: `${error}` })
    }
  }

  /**
   * Display a single user.
   * GET user
   */
  async show ({ response, auth }) {
    try {
      const user = await auth.user
      await user.load('roles')
      return response.status(200).send(user)
    } catch (error) {
      return response.status(404).send({ error: `${error}` })
    }
  }

  /**
   * Update user details.
   * PUT or PATCH user
   */
  async update ({ request, response, auth }) {
    const data = request.only([
      'name', 'phone', 'cpf', 'city', 'neighborhood', 'street', 'number'
    ])
    try {
      const user = await auth.user
      user.merge(data)
      await user.save()
      return response.status(201).send(user)
    } catch (error) {
      return response.status(404).send({ error: `${error}` })
    }
  }
}

module.exports = UserController

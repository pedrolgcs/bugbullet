'use strict'
const Role = use('Adonis/Acl/Role')

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   */
  async index ({ request, response }) {
    const { page } = request.all()
    try {
      const roles = await Role.query()
        .paginate(page, 10)
      return response.status(200).send(roles)
    } catch (error) {
      return response.status(500).send({ error: `${error}` })
    }
  }

  /**
   * Create/save a new role.
   * POST roles
   */
  async store ({ request, response }) {
    const { permissions, ...data } = request.only([ 'slug', 'name', 'description', 'permissions' ])
    try {
      const role = await Role.create(data)
      if (permissions) {
        await role.permissions().attach(permissions)
      }
      await role.load(['permissions'])
      return response.status(201).send(role)
    } catch (error) {
      return response.status(400).send({ message: `${error}` })
    }
  }

  /**
   * Display a single role.
   * GET roles/:id
   */
  async show ({ params, request, response }) {
    try {
      const role = await Role.findOrFail(params.id)
      await role.load('permissions')
      return response.status(200).send(role)
    } catch (error) {
      return response.status(404).send({ error: `${error}` })
    }
  }

  /**
   * Update role details.
   * PUT or PATCH roles/:id
   */
  async update ({ params, request, response }) {
    const { permissions, ...data } = request.only([ 'slug', 'name', 'description', 'permissions' ])
    try {
      const role = await Role.findOrFail(params.id)
      role.merge(data)
      await role.save()
      if (permissions) {
        await role.permissions().sync(permissions)
      }
      await role.load('permissions')
      return response.status(201).send(role)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }

  /**
   * Delete a role with id.
   * DELETE roles/:id
   */
  async destroy ({ params, request, response }) {
    try {
      const role = await Role.findOrFail(params.id)
      await role.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
}

module.exports = RoleController

'use strict'
const Sector = use('App/Models/Sector')

/**
 * Resourceful controller for interacting with sectors
 */
class SectorController {
  /**
   * Show a list of all sectors.
   * GET sectors
   */
  async index ({ request, response }) {
    const { page } = request.all()
    try {
      const sectors = await Sector.query()
        .paginate(page, 10)
      return response.status(200).send(sectors)
    } catch (error) {
      return response.status(500).send({ error: `${error}` })
    }
  }

  /**
   * Create/save a new sector.
   * POST sectors
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'description'])
    try {
      const sector = await Sector.create(data)
      return response.status(201).send(sector)
    } catch (error) {
      return response.status(400).send({ error: `${error}` })
    }
  }

  /**
   * Display a single sector.
   * GET sectors/:id
   */
  async show ({ params, response }) {
    try {
      const sector = await Sector.findOrFail(params.id)
      return response.status(200).send(sector)
    } catch (error) {
      return response.status(404).send({ error: `${error}` })
    }
  }

  /**
   * Update sector details.
   * PUT or PATCH sectors/:id
   */
  async update ({ params, request, response }) {
    const data = request.only(['name', 'description'])
    try {
      const sector = await Sector.findOrFail(params.id)
      sector.merge(data)
      await sector.save()
      return response.status(201).send(sector)
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }

  /**
   * Delete a sector with id.
   * DELETE sectors/:id
   */
  async destroy ({ params, response }) {
    try {
      const sector = await Sector.findOrFail(params.id)
      await sector.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
}

module.exports = SectorController

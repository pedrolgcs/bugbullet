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
        .paginate(page, 20)
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
  }

  /**
   * Display a single sector.
   * GET sectors/:id
   */
  async show ({ params, request, response }) {
  }

  /**
   * Update sector details.
   * PUT or PATCH sectors/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a sector with id.
   * DELETE sectors/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SectorController

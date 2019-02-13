'use strict'
const Solicitation = use('App/Models/Solicitation')

/**
 * Resourceful controller for interacting with solicitations
 */
class SolicitationController {
  /**
   * Show a list of all solicitations.
   * GET solicitations
   */
  async index ({ request, response, auth }) {
    const { page } = request.all()
    try {
      const solicitations = await Solicitation.query()
        .where('user_id', auth.user.id)
        .orderBy('created_at', 'desc')
        .paginate(page, 20)
      return response.status(200).send(solicitations)
    } catch (error) {
      return response.status(500).send({ error: `${error}` })
    }
  }

  /**
   * Create/save a new solicitation.
   * POST solicitations
   */
  async store ({ request, response, auth }) {
    const data = request.only(['latitude', 'longitude', 'category_id'])
    try {
      const solicitation = await Solicitation.create({ ...data, user_id: auth.user.id })
      return response.status(201).send(solicitation)
    } catch (error) {
      return response.status(400).send({ error: `${error}` })
    }
  }

  /**
   * Display a single solicitation.
   * GET solicitations/:id
   */
  async show ({ params, response, auth }) {
    try {
      const solicitation = await Solicitation.findOrFail(params.id)
      console.log(solicitation.user_id)
      if (solicitation.user_id !== auth.user.id) {
        return response.status(403).send({ error: `Access denied to ${auth.user.name}` })
      }
      return response.status(200).send(solicitation)
    } catch (error) {
      return response.status(404).send({ error: `${error}` })
    }
  }
}

module.exports = SolicitationController

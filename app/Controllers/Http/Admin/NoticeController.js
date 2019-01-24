'use strict'
const Notice = use('App/Models/Notice')

/**
 * Resourceful controller for interacting with notices
 */
class NoticeController {
  /**
   * Show a list of all notices.
   * GET notices
   */
  async index ({ request, response }) {
    const { page } = request.all()
    try {
      const notices = await Notice.query()
        .with('user')
        .orderBy('created_at', 'desc')
        .paginate(page, 20)
      return response.status(200).send(notices)
    } catch (error) {
      return response.status(500).send({ error: `${error}` })
    }
  }

  /**
   * Create/save a new notice.
   * POST notices
   */
  async store ({ request, response, auth }) {
    const data = request.only(['title', 'sub_title', 'notice'])
    try {
      const notice = await Notice.create({ ...data, user_id: auth.user.id })
      return response.status(201).send(notice)
    } catch (error) {
      return response.status(400).send({ error: `${error}` })
    }
  }

  /**
   * Display a single notice.
   * GET notices/:id
   */
  async show ({ params, response }) {
    try {
      const notice = await Notice.findOrFail(params.id)
      await notice.load('user')
      return response.status(200).send(notice)
    } catch (error) {
      return response.status(404).send({ error: `${error}` })
    }
  }

  /**
   * Update notice details.
   * PUT or PATCH notices/:id
   */
  async update ({ params, request, response, auth }) {
    const data = request.only(['title', 'sub_title', 'notice'])
    try {
      const notice = await Notice.findOrFail(params.id)
      notice.merge({ ...data, user_id: auth.user.id })
      await notice.save()
      await notice.load('user')
      return response.status(201).send(notice)
    } catch (error) {
      return response.status(400).send({ error: `${error}` })
    }
  }

  /**
   * Delete a notice with id.
   * DELETE notices/:id
   */
  async destroy ({ params, response }) {
    try {
      const notice = await Notice.findOrFail(params.id)
      await notice.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
}

module.exports = NoticeController

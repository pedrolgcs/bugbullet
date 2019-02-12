'use strict'
const Category = use('App/Models/Category')

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   */
  async index ({ request, response }) {
    const { page } = request.all()
    try {
      const categories = await Category.query()
        .with('sector')
        .paginate(page, 20)
      return response.status(200).send(categories)
    } catch (error) {
      return response.status(500).send({ error: `${error}` })
    }
  }

  /**
   * Create/save a new category.
   * POST categories
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'sector_id'])
    try {
      const category = await Category.create(data)
      return response.status(201).send(category)
    } catch (error) {
      return response.status(400).send({ error: `${error}` })
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
   */
  async show ({ params, response }) {
    try {
      const category = await Category.findOrFail(params.id)
      await category.load('sector')
      return response.status(200).send(category)
    } catch (error) {
      return response.status(404).send({ error: `${error}` })
    }
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   */
  async update ({ params, request, response }) {
    const data = request.only(['name', 'sector_id'])
    try {
      const category = await Category.findOrFail(params.id)
      category.merge(data)
      await category.save()
      await category.load('sector')
      return response.status(201).send(category)
    } catch (error) {
      return response.status(400).send({ error: `${error}` })
    }
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   */
  async destroy ({ params, response }) {
    try {
      const category = await Category.findOrFail(params.id)
      await category.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(404).send({ message: `${error}` })
    }
  }
}

module.exports = CategoryController

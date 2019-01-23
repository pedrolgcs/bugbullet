'use strict'
const User = use('App/Models/User')

class SessionController {
  async create ({ request, response, auth }) {
    const { email, password } = request.all()
    try {
      const token = await auth.withRefreshToken().attempt(email, password)
      const user = await User.query().where('email', email).with('roles').first()
      return response.send({ token, user })
    } catch (error) {
      return response.send({ error: `${error}` })
    }
  }
}

module.exports = SessionController

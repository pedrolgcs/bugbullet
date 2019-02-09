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

  async redirect ({ ally }) {
    await ally.driver('facebook').redirect()
  }
  async callback ({ ally, auth }) {
    try {
      const fbUser = await ally.driver('facebook').getUser()

      // user details to be saved
      const userDetails = {
        email: fbUser.getEmail(),
        token: fbUser.getAccessToken(),
        login_source: 'facebook'
      }

      // search for existing user
      const whereClause = {
        email: fbUser.getEmail()
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      await auth.login(user)

      return 'Logged in'
    } catch (error) {
      return 'Unable to authenticate. Try again later'
    }
  }
}

module.exports = SessionController

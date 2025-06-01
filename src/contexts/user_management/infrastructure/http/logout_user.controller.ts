import { HttpContext } from '@adonisjs/core/http'

export default class LogoutUserController {
  async handle({ auth, response }: HttpContext) {
    await auth.use().logout()

    return response.redirect().toPath('/')
  }
}

import { AuthenticateWithEmailPasswordUseCase } from '#user_management/application/use_cases/authenticate_with_email_password.usecase'
import { HttpContext } from '@adonisjs/core/http'
import { AuthenticationRequestDTO } from '#user_management/application/dtos/authentication_request.dto'
import { InvalidCredentialsException } from '#user_management/application/exceptions/invalid_credentials.exception'

export default class AuthenticateWithEmailPasswordController {
  constructor(private useCase: AuthenticateWithEmailPasswordUseCase) {}

  async execute({ request, response, session }: HttpContext) {
    const payload = request.only(['email', 'password'])
    const dto = new AuthenticationRequestDTO(payload.email, payload.password)

    try {
      await this.useCase.execute(dto)
    } catch (error) {
      if (error instanceof InvalidCredentialsException) {
        session.flash('error', error.serialize())
        response.redirect().back()
      }
    }
  }
}

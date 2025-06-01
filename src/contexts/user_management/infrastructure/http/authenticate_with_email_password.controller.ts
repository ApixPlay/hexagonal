import { HttpContext } from '@adonisjs/core/http'
import { AuthenticationRequestDTO } from '#user_management/application/dtos/authentication_request.dto'
import { InvalidCredentialsException } from '#user_management/application/exceptions/invalid_credentials.exception'
import { UserManagementServiceManager } from '#user_management/infrastructure/user_management_service_manager'

export default class AuthenticateWithEmailPasswordController {
  //constructor(private useCase: AuthenticateWithEmailPasswordUseCase) {}

  async execute({ request, response, auth }: HttpContext) {
    const useCase = UserManagementServiceManager.getAuthenticateWithEmailPasswordUseCase()

    const payload = request.only(['email', 'password'])

    const dto = new AuthenticationRequestDTO(payload.email, payload.password)

    try {
      const user = await useCase.execute(dto)

      await auth.use('web').login(user)
    } catch (error) {
      if (error instanceof InvalidCredentialsException) {
        /*session.flash('error', error.serialize())
        response.redirect().back()*/

        response.unauthorized(error.serialize())
      }
    }
  }
}

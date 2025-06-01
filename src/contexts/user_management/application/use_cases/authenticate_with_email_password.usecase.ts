import type { AuthenticationRequestDTO } from '#user_management/application/dtos/authentication_request.dto'
import { AuthService } from '#user_management/application/services/auth.service'
import { inject } from '@adonisjs/core'

@inject()
export class AuthenticateWithEmailPasswordUseCase {
  constructor(private authService: AuthService) {}

  execute(payload: AuthenticationRequestDTO) {
    return this.authService.authenticate(payload)
  }
}

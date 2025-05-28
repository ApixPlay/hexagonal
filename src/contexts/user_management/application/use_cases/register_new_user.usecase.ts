import { AuthService } from '#user_management/application/services/auth.service'
import { RegisterRequestDTO } from '#user_management/application/dtos/register_request.dto'

export class RegisterNewUserUseCase {
  constructor(private authService: AuthService) {}

  execute(payload: RegisterRequestDTO) {
    return this.authService.register(payload)
  }
}

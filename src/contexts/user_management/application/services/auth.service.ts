import { AuthenticationRequestDTO } from '#user_management/application/dtos/authentication_request.dto'
import { UserRepository } from '#user_management/application/repositories/user.repository'
import { InvalidCredentialsException } from '#user_management/application/exceptions/invalid_credentials.exception'

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async authenticate(payload: AuthenticationRequestDTO) {
    const user = await this.userRepository.findByEmail(payload.email)

    if (!user) {
      throw new InvalidCredentialsException()
    }

    const isPasswordValid = await this.passwordhashingService.verify(
      payload.password,
      user.getPassword()
    )
  }
}

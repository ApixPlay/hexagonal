import { AuthenticationRequestDTO } from '#user_management/application/dtos/authentication_request.dto'
import { UserRepository } from '#user_management/application/repositories/user.repository'
import { InvalidCredentialsException } from '#user_management/application/exceptions/invalid_credentials.exception'
import { PasswordHashingContract } from '#user_management/application/contracts/password_hashing.contract'
import { SessionManagerContract } from '#user_management/application/contracts/session_manager.contract'

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private passwordHashingContract: PasswordHashingContract,
    private sessionManager: SessionManagerContract
  ) {}

  async authenticate(payload: AuthenticationRequestDTO) {
    const user = await this.userRepository.findByEmail(payload.email)

    if (!user) {
      await this.passwordHashingContract.fakeVerify()

      throw new InvalidCredentialsException()
    }

    const isPasswordValid = await this.passwordHashingContract.verify(
      payload.password,
      user.getPassword()
    )

    if (!isPasswordValid) {
      throw new InvalidCredentialsException()
    }

    await this.sessionManager.createSession(user.getIdentifier())
  }
}

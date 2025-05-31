import { AuthenticationRequestDTO } from '#user_management/application/dtos/authentication_request.dto'
import { UserRepository } from '#user_management/application/repositories/user.repository'
import { InvalidCredentialsException } from '#user_management/application/exceptions/invalid_credentials.exception'
import { PasswordHashingContract } from '#user_management/application/contracts/password_hashing.contract'
import { SessionManagerContract } from '#user_management/application/contracts/session_manager.contract'
import { AlreadyRegisteredException } from '#user_management/application/exceptions/already_registered.exception'
import { RegisterRequestDTO } from '#user_management/application/dtos/register_request.dto'

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

    console.log(await this.check())

    await this.sessionManager.createSession(user.getIdentifier())

    console.log(await this.check())
  }

  async register(payload: RegisterRequestDTO) {
    const user = await this.userRepository.findByEmail(payload.email)

    if (user) {
      throw new AlreadyRegisteredException()
    }

    await this.userRepository.createUser(payload)
  }

  async check(): Promise<boolean> {
    const user = await this.sessionManager.retrieveUserId()

    console.log(user)

    if (!user) {
      return false
    }

    return true
  }
}

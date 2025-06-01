import { AuthenticationRequestDTO } from '#user_management/application/dtos/authentication_request.dto'
import { UserRepository } from '#user_management/domain/repositories/user.repository'
import { InvalidCredentialsException } from '#user_management/application/exceptions/invalid_credentials.exception'
import { PasswordHashingContract } from '#user_management/application/contracts/password_hashing.contract'
import { AlreadyRegisteredException } from '#user_management/application/exceptions/already_registered.exception'
import { RegisterRequestDTO } from '#user_management/application/dtos/register_request.dto'
import { inject } from '@adonisjs/core'

@inject()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private passwordHashingContract: PasswordHashingContract
  ) {}

  async authenticate(payload: AuthenticationRequestDTO) {
    const user = await this.userRepository.findByEmail(payload.email)

    if (!user) {
      await this.passwordHashingContract.fakeVerify()

      throw new InvalidCredentialsException()
    }

    if (user.props.password) {
      const isPasswordValid = await this.passwordHashingContract.verify(
        payload.password,
        user.getPassword()!
      )

      if (!isPasswordValid) {
        throw new InvalidCredentialsException()
      }
    }

    //await this.sessionManager.createSession(user.getIdentifier())

    return user
  }

  async register(payload: RegisterRequestDTO) {
    const user = await this.userRepository.findByEmail(payload.email)

    if (user) {
      throw new AlreadyRegisteredException()
    }

    await this.userRepository.createUser(payload)
  }
}

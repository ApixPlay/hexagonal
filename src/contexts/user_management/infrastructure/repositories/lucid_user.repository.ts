import { UserRepository } from '#user_management/application/repositories/user.repository'
import { User as UserEntity } from '#user_management/domain/user'
import { Email } from '#user_management/domain/email'
import { RegisterRequestDTO } from '#user_management/application/dtos/register_request.dto'
import User from '#user_management/infrastructure/database/models/user'
import { PlainPassword } from '#user_management/domain/plain_password'

export class LucidUserRepository implements UserRepository {
  async findByEmail(email: Email): Promise<UserEntity | null> {
    const user = await User.findBy('email', email.toString())

    if (!user) {
      return null
    }

    return UserEntity.create({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: Email.fromString(user.email),
      password: PlainPassword.fromString(user.password),
    })
  }

  async createUser(payload: RegisterRequestDTO): Promise<UserEntity> {
    const user = await User.create({
      email: payload.email.toString(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: payload.password.toString(),
    })

    return UserEntity.create({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: Email.fromString(user.email),
      password: PlainPassword.fromString(user.password),
    })
  }
}

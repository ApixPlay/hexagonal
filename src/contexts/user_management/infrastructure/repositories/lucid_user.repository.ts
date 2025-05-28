import { UserRepository } from '#user_management/application/repositories/user.repository'
import { User as UserEntity } from '#user_management/domain/entity/user'
import { Email } from '#user_management/domain/entity/email'
import { RegisterRequestDTO } from '#user_management/application/dtos/register_request.dto'
import User from '#user_management/infrastructure/database/models/user'

export class LucidUserRepository implements UserRepository {
  async findByEmail(email: Email): Promise<UserEntity | null> {
    const user = await User.findBy('email', email)

    if (!user) {
      return null
    }

    return UserEntity.create({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    })
  }

  async createUser(payload: RegisterRequestDTO): Promise<UserEntity> {
    const user = await User.create(payload)

    return UserEntity.create({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    })
  }
}

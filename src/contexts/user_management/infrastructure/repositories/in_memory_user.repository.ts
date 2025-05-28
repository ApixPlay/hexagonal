import { UserRepository } from '#user_management/application/repositories/user.repository'
import { User } from '#user_management/domain/entity/user'
import { Email } from '#user_management/domain/entity/email'
import { RegisterRequestDTO } from '#user_management/application/dtos/register_request.dto'
import { UserIdentifier } from '#user_management/domain/user_identifier'

export class InMemoryUserRepository implements UserRepository {
  #users: User[] = []

  async findByEmail(email: Email): Promise<User | null> {
    return this.#users.find((user) => user.getEmail().equals(email)) ?? null
  }

  async createUser(payload: RegisterRequestDTO): Promise<User> {
    const user = User.create({
      id: UserIdentifier.generate(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    })

    this.#users.push(user)

    return user
  }
}

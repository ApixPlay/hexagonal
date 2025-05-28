import { Email } from '#user_management/domain/entity/email'
import { User } from '#user_management/domain/entity/user'
import { RegisterRequestDTO } from '#user_management/application/dtos/register_request.dto'

export abstract class UserRepository {
  abstract findByEmail(email: Email): Promise<User | null>

  abstract createUser(payload: RegisterRequestDTO): Promise<User>
}

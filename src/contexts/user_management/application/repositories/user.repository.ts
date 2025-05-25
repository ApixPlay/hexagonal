import { Email } from '#user_management/domain/entity/email'
import { User } from '#user_management/domain/entity/user'

export abstract class UserRepository {
  abstract findByEmail(email: Email): Promise<User | null>
}

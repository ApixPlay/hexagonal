import { Email } from '#user_management/domain/entity/email'
import { AggregateRoot } from '#shared_kernel/domain/aggregate_root'
import { UserIdentifier } from '#user_management/domain/user_identifier'
import { HashedPassword } from '#user_management/domain/entity/hashed_password'

interface Properties {
  id: UserIdentifier
  email: Email
  password: HashedPassword
}

export class User extends AggregateRoot<Properties> {
  getIdentifier(): UserIdentifier {
    return this.props.id
  }

  getPassword(): HashedPassword {
    return this.props.password
  }
}

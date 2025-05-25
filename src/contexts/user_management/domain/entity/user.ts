import { Email } from '#user_management/domain/entity/email'
import { PlainPassword } from '#user_management/domain/entity/plain_password'
import { AggregateRoot } from '#shared_kernel/domain/aggregate_root'
import { UserIdentifier } from '#user_management/domain/user_identifier'

interface Properties {
  id: UserIdentifier
  email: Email
  password: PlainPassword
}

export class User extends AggregateRoot<Properties> {
  getPassword(): PlainPassword {
    return this.props.password
  }
}

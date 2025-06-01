import { Email } from '#user_management/domain/email'
import { ValueObject } from '#shared_kernel/domain/value_object'

interface Properties {
  email: Email
  firstName: string
  lastName: string | null
}

export class SocialUser extends ValueObject<Properties> {
  getEmail(): Email {
    return this.props.email
  }
}

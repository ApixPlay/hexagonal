import { Email } from '#user_management/domain/entity/email'
import { PlainPassword } from '#user_management/domain/entity/plain_password'

export class AuthenticationRequestDTO {
  constructor(
    public email: Email,
    public password: PlainPassword
  ) {}
}

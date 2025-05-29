import { Email } from '#user_management/domain/email'
import { PlainPassword } from '#user_management/domain/plain_password'

export class AuthenticationRequestDTO {
  constructor(
    public email: Email,
    public password: PlainPassword
  ) {}
}

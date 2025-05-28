import { PlainPassword } from '#user_management/domain/entity/plain_password'
import { Email } from '#user_management/domain/entity/email'

export class RegisterRequestDTO {
  constructor(
    public email: Email,
    public firstName: string,
    public lastName: string | null,
    public password: PlainPassword
  ) {}
}

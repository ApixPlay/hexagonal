import { PlainPassword } from '#user_management/domain/plain_password'
import { HashedPassword } from '#user_management/domain/hashed_password'

export abstract class PasswordHashingContract {
  abstract hash(password: PlainPassword): Promise<HashedPassword>
  abstract fakeVerify(): Promise<void>
  abstract verify(password: PlainPassword, hashedPassword: HashedPassword): Promise<boolean>
}

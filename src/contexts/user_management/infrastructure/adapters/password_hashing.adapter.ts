import hash from '@adonisjs/core/services/hash'
import { PasswordHashingContract } from '#user_management/application/contracts/password_hashing.contract'
import { PlainPassword } from '#user_management/domain/plain_password'
import { HashedPassword } from '#user_management/domain/hashed_password'

export class PasswordHashingAdapter implements PasswordHashingContract {
  async hash(password: PlainPassword): Promise<HashedPassword> {
    const hashedPassword = await hash.make(password.toString())

    return HashedPassword.fromString(hashedPassword)
  }

  async fakeVerify(): Promise<void> {
    await hash.make('fake')
  }

  async verify(password: PlainPassword, hashedPassword: HashedPassword): Promise<boolean> {
    return hash.verify(hashedPassword.toString(), password.toString())
  }
}

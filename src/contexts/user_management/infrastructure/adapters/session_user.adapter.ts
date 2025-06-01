import { SessionGuardUser, SessionUserProviderContract } from '@adonisjs/auth/types/session'
import { User as UserEntity } from '#user_management/domain/user'
import { symbols } from '@adonisjs/auth'
import db from '@adonisjs/lucid/services/db'
import User from '#user_management/infrastructure/database/models/user'
import { Email } from '#user_management/domain/email'
import { PlainPassword } from '#user_management/domain/plain_password'

export class SessionUserAdapter implements SessionUserProviderContract<UserEntity> {
  declare [symbols.PROVIDER_REAL_USER]: UserEntity

  async createUserForGuard(user: UserEntity): Promise<SessionGuardUser<UserEntity>> {
    return {
      getId() {
        return user.getIdentifier().toString()
      },

      getOriginal() {
        return user
      },
    }
  }

  async findById(identifier: string): Promise<SessionGuardUser<UserEntity> | null> {
    const userRecord: User = await db
      .from('users')
      .select('*')
      .where('id', identifier.toString())
      .first()

    if (!userRecord) {
      return null
    }

    const user = UserEntity.create({
      id: userRecord.id,
      firstName: userRecord.firstName,
      lastName: userRecord.lastName,
      email: Email.fromString(userRecord.email),
      password: PlainPassword.fromString(userRecord.password),
    })

    return this.createUserForGuard(user)
  }
}

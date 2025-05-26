import { UserIdentifier } from '#user_management/domain/user_identifier'

export abstract class SessionManagerContract {
  abstract createSession(userId: UserIdentifier): Promise<void>
}

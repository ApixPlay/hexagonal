import { SessionManagerContract } from '#user_management/application/contracts/session_manager.contract'
import { UserIdentifier } from '#user_management/domain/user_identifier'

const kUserIdSessionKey = 'user_management::user_id'

export class InMemorySessionManagerAdapter implements SessionManagerContract {
  #session: Map<string, string> = new Map()

  async createSession(userId: UserIdentifier): Promise<void> {
    this.#session.set(kUserIdSessionKey, userId.toString())
  }

  /*async retrieveUserId(): Promise<UserIdentifier | null> {
    const raw = this.#session.get(kUserIdSessionKey)
    return raw ? UserIdentifier.fromString(raw) : null
  }

  async deleteSession(): Promise<void> {
    this.#session.delete(kUserIdSessionKey)
  }*/
}

import { SessionManagerContract } from '#user_management/application/contracts/session_manager.contract'
import { UserIdentifier } from '#user_management/domain/user_identifier'
import { HttpContext } from '@adonisjs/core/http'
import { Session } from '@adonisjs/session'

const kUserIdSessionKey = 'user_management::user_id'

export class SessionManagerAdapter implements SessionManagerContract {
  #session: Session

  constructor() {
    this.#session = HttpContext.getOrFail().session
  }

  #initiateSession() {
    return this.#session.initiate(false)
  }

  async createSession(userId: UserIdentifier): Promise<void> {
    await this.#initiateSession()

    this.#session.put(kUserIdSessionKey, userId.toString())
  }

  /*async retrieveUserId(): Promise<UserIdentifier | null> {
    await this.#initiateSession()

    const userId = await this.#session.get(kUserIdSessionKey)

    if (!userId) {
      return null
    }

    return UserIdentifier.fromString(userId)
  }*/

  /*async deleteSession(): Promise<void> {
    await this.#initiateSession()

    this.#session.forget(kUserIdSessionKey)
  }*/
}

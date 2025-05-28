import type { ApplicationService } from '@adonisjs/core/types'
import { SessionManagerContract } from '#user_management/application/contracts/session_manager.contract'
import { SessionManagerAdapter } from '#user_management/infrastructure/adapters/session_manager.adapter'
import { PasswordHashingContract } from '#user_management/application/contracts/password_hashing.contract'
import { PasswordHashingAdapter } from '#user_management/infrastructure/adapters/password_hashing.adapter'
import { UserRepository } from '#user_management/application/repositories/user.repository'
import { LucidUserRepository } from '#user_management/infrastructure/repositories/lucid_user.repository'

export default class UserManagementProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * The container bindings have booted
   */
  async boot() {
    this.app.container.bind(SessionManagerContract, () => {
      return this.app.container.make(SessionManagerAdapter)
    })

    this.app.container.bind(PasswordHashingContract, () => {
      return this.app.container.make(PasswordHashingAdapter)
    })

    this.app.container.bind(UserRepository, () => {
      return this.app.container.make(LucidUserRepository)
    })
  }

  /*async ready() {
    await import('#user_management/infrastructure/http/routes')
  }*/
}

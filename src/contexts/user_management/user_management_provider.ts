import type { ApplicationService } from '@adonisjs/core/types'
import { SessionManagerContract } from '#user_management/application/contracts/session_manager.contract'
import { SessionManagerAdapter } from '#user_management/infrastructure/adapters/session_manager.adapter'
import { PasswordHashingContract } from '#user_management/application/contracts/password_hashing.contract'
import { PasswordHashingAdapter } from '#user_management/infrastructure/adapters/password_hashing.adapter'

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
  }
}

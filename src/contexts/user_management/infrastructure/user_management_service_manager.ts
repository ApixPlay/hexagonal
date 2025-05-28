import { AuthService } from '#user_management/application/services/auth.service'
import { RegisterNewUserUseCase } from '#user_management/application/use_cases/register_new_user.usecase'
import { LucidUserRepository } from '#user_management/infrastructure/repositories/lucid_user.repository'
import { PasswordHashingAdapter } from '#user_management/infrastructure/adapters/password_hashing.adapter'
import { SessionManagerAdapter } from '#user_management/infrastructure/adapters/session_manager.adapter'

export class UserManagementServiceManager {
  private static authService: AuthService
  private static registerNewUserUseCase: RegisterNewUserUseCase

  static getAuthService(): AuthService {
    if (!this.authService) {
      this.authService = new AuthService(
        new LucidUserRepository(),
        new PasswordHashingAdapter(),
        new SessionManagerAdapter()
      )
    }
    return this.authService
  }

  static getRegisterNewUserUseCase(): RegisterNewUserUseCase {
    if (!this.registerNewUserUseCase) {
      this.registerNewUserUseCase = new RegisterNewUserUseCase(this.getAuthService())
    }
    return this.registerNewUserUseCase
  }
}

import { UserRepository } from '#user_management/domain/repositories/user.repository'
import { SocialAuthenticationRequestDTO } from '#user_management/application/dtos/social_authentication_request.dto'
import { SocialProviderContract } from '#user_management/application/contracts/social_provider.contract'
import { AuthService } from '#user_management/application/services/auth.service'

export class SocialService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
    private socialProviderContract: SocialProviderContract
  ) {}

  async getUser(payload: SocialAuthenticationRequestDTO) {
    const socialUser = await this.socialProviderContract.getUser(payload)

    const existingUser = this.userRepository.findByEmail(socialUser.getEmail())

    if (!existingUser) {
      await this.authService.register({
        email: socialUser.getEmail(),
        firstName: socialUser.props.firstName,
        lastName: socialUser.props.lastName,
        password: null,
        isEmailVerified: true,
      })
    }
  }
}

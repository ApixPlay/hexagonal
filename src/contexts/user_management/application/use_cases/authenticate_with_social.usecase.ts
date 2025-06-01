import { SocialAuthenticationRequestDTO } from '#user_management/application/dtos/social_authentication_request.dto'
import { SocialService } from '#user_management/application/services/social.service'

export class AuthenticateWithSocialUseCase {
  constructor(private socialService: SocialService) {}

  execute(payload: SocialAuthenticationRequestDTO) {
    return this.socialService.getUser(payload)
  }
}

import { SocialUser } from '#user_management/domain/social_user'
import { SocialAuthenticationRequestDTO } from '#user_management/application/dtos/social_authentication_request.dto'

export abstract class SocialProviderContract {
  abstract getUser(payload: SocialAuthenticationRequestDTO): Promise<SocialUser>
}

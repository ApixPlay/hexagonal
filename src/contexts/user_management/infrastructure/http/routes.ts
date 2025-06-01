import router from '@adonisjs/core/services/router'
import { middleware } from '#shared_kernel/infrastructure/http/kernel'

const AuthenticateWithEmailPasswordController = () =>
  import('#user_management/infrastructure/http/authenticate_with_email_password.controller')
const RegisterNewUserController = () =>
  import('#user_management/infrastructure/http/register_new_user.controller')

router
  .group(() => {
    router.post('/auth/register', [RegisterNewUserController, 'execute']).as('auth.register')
    router
      .post('/auth/login', [AuthenticateWithEmailPasswordController, 'execute'])
      .as('auth.login')
  })
  .middleware(middleware.guest())

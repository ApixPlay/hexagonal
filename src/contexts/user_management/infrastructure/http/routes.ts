import router from '@adonisjs/core/services/router'

const RegisterNewUserController = () =>
  import('#user_management/infrastructure/http/register_new_user.controller')

router.post('/auth/register', [RegisterNewUserController, 'execute']).as('auth.register')

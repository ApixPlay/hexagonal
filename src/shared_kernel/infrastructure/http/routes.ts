/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const RegisterNewUserController = () =>
  import('#user_management/infrastructure/http/register_new_user.controller')
//import('#user_management/infrastructure/http/routes')

router.on('/').renderInertia('home')

router.post('/auth/register', [RegisterNewUserController, 'execute']).as('auth.register')

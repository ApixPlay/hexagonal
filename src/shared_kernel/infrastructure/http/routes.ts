/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import '#user_management/infrastructure/http/routes'

import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')

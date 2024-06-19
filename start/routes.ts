/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const CategoryController = () => import('#controllers/category_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const CampaignController = () => import('#controllers/campaign_controller')

router.group(() => {
  // regular web router group
  router.group(() => {
    // root page
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })
  })

  // restful api router group
  router
    .group(() => {
      // restful api v1 router group
      router
        .group(() => {
          // restful api authentication router group
          router
            .group(() => {
              router.post('login', [AuthController, 'login'])
              router.post('register', [AuthController, 'register'])
              router.delete('logout', [AuthController, 'logout']).use(middleware.auth())
              router.get('me', [AuthController, 'me']).use(middleware.auth())
            })
            .prefix('auth')

          // restful api categories router group
          router.group(() => {
            router.get('categories', [CategoryController, 'index']).use(middleware.auth())
            router.post('categories', [CategoryController, 'store']).use(middleware.auth())
          })

          // restful api campaigns router group
          router.group(() => {
            router.get('campaigns', [CampaignController, 'index']).use(middleware.auth())
            router.post('campaigns', [CampaignController, 'store']).use(middleware.auth())
          })
        })
        .prefix('v1')
    })
    .prefix('api')
})

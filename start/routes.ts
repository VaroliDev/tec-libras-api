import router from '@adonisjs/core/services/router'

const UserController = () => import('#controllers/user_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return { hello: 'world' }
})
router.get('/ping', async () => {
  return { message: 'API está funcionando!' }
})
router.get('/users', [UserController, 'index'])
router.post('/user', [UserController, 'cadastrar'])
router.post('/login', [UserController, 'login'])
router.delete('/user/:id', [UserController, 'delete'])
router.get('/user/:id', [UserController, 'show']);
router.put('/user/:id',  [UserController, 'update']);

router.post('/tokenLogin', [AuthController, 'login'])
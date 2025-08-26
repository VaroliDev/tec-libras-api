import router from '@adonisjs/core/services/router'

const UserController = () => import('#controllers/user_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return { hello: 'world' }
})
router.get('/ping', async () => {
  return { message: 'API está funcionando!' }
})
//auth_controller routes
router.post('/user', [AuthController, 'cadastrar'])
router.post('/login', [AuthController, 'login'])
router.put('/user/:id',  [AuthController, 'update']);
router.delete('/user/:id', [AuthController, 'delete'])
router.post('/renewData', [AuthController, 'renewData'])
router.post('/doesExists', [AuthController, 'doesExists'])


//user_controller routes
router.get('/users', [UserController, 'index'])
router.get('/user/:id', [UserController, 'show']);
router.get('/user/:id/role', [UserController, 'getRole']);
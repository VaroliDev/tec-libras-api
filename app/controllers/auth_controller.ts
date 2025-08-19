import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async login({ request, auth, response }: HttpContext) {
    console.log('Iniciando o login com o usuário:')
    const { user_name, password } = request.only(['user_name', 'password'])
    console.log('user_name enviado:', user_name)
    console.log('Senha enviada:', password)

    try {
      const user = await User.findByOrFail('user_name', user_name)
      console.log('Usuário encontrado:', user)

      const isPasswordValid = await hash.verify(user.password, password)
      if (!isPasswordValid) {
        return response.unauthorized({ message: 'Credenciais inválidas' })
      }
      console.log('Senha verificada com sucesso')

      const token = await auth.use('api').createToken(user)
      return { user, token }
    } catch (err) {
      return response.unauthorized({ message: 'Credenciais inválidas' })
    }
  }
}

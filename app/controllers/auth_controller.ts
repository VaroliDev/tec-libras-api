import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async login({ request, auth, response }: HttpContext) {
    const { user_name, password } = request.only(['user_name', 'password'])
    if (!user_name || !password) {
      return response.badRequest({ message: 'Usuário e senha são obrigatórios' })
    }

    try {
  const user = await User.findBy('user_name', user_name)
  if (!user) return response.unauthorized({ message: 'Usuário não encontrado' })

  if (!user.password) return response.unauthorized({ message: 'Senha inválida' })

  const isPasswordValid = await hash.verify(user.password, password)
  if (!isPasswordValid) return response.unauthorized({ message: 'Senha incorreta' })

  if (!user.id) return response.unauthorized({ message: 'ID do usuário inválido' })

  let tokenString
  try {
    const token = await auth.use('api').createToken(user)
    tokenString = token.toJSON().token
  } catch (err) {
    console.error('Erro ao criar token:', err)
    return response.internalServerError({ message: 'Erro ao gerar token' })
  }

  return { user, token: tokenString }

} catch (err) {
  console.error('Erro geral no login:', err)
  return response.unauthorized({ message: 'Credenciais inválidas' })
}
  }
}
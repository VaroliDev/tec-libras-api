import type { HttpContext } from '@adonisjs/core/http'
import { nanoid } from 'nanoid'
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
      if (!user) {
        return response.unauthorized({ message: 'Usuário não encontrado' })
      }
      console.log(user);
      
      // Verifica se a senha está correta
      const isPasswordValid = await hash.verify(user.password, password)
      if (!isPasswordValid) {
        return response.unauthorized({ message: 'Credenciais inválidas' })
      }
      console.log('Senha:', isPasswordValid);

      // Verifica se já existe token
      const existingToken = await db.from('auth_access_tokens')
        .where('tokenable_id', user.id)
        .first()
        console.log('Token existente:', existingToken);

      if (existingToken) {
        const newToken = nanoid(64)

        await db.from('auth_access_tokens')
          .where('id', existingToken.id)
          .update({ hash: newToken })

        return { token: newToken, user: user, message: 'Token atualizado com sucesso' }
      }

      const token = await auth.use('api').createToken(user)
      const tokenString = token.toJSON().token
      return { token: tokenString, user }

    } catch (err) {
      console.error('Erro no login:', err)
      return response.unauthorized({ message: 'Credenciais inválidas' })
    }
  }

  public async renewData({ request, response }: HttpContext){
    const { token } = request.only(['token']);
    console.log(token)
    if(!token){
      return {message: 'Token Invalido',token};
    }

    const user = await db.from('auth_access_tokens').where('hash', token).first();
    console.log(user)
    if(!user){
      return response.badRequest({message: 'Token não encontrado',user})
    }

    const userData = await db.from('users').where('user_id', user.tokenable_id).first()
    console.log(userData)
    if(!userData){
      return response.badRequest({message: 'Usuario nao encontrado',userData})
    }

    return{
      message: 'Usuario achado'
    }
  }
}
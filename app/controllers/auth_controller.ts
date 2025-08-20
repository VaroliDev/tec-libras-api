import type { HttpContext } from '@adonisjs/core/http'
import { nanoid } from 'nanoid'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async cadastrar({request, response}: HttpContext) {
      const data = request.only(['full_name', 'user_name', 'password', 'email'])
      if (!data.user_name) {
        return response.status(400).send({ message: 'O nome de usuário é obrigatório' });
      }
      if (!data.password) {
        return response.status(400).send({ message: 'A senha é obrigatória' });
      }
      if (!data.email) {
        return response.status(400).send({ message: 'O email é obrigatório' });
      }

      const doesExist = await db.from('users').where('user_name', data.user_name).first()
      console.log(doesExist)
      const user = await User.create(data)
      const password = await hash.make('password')
      const token = await User.accessTokens.create(user)
      if(doesExist){
        console.log('Ta caindo na bola')
        return ({ user, token, password })
      }
      console.log('Nao ta')

      
      return response.created({ user, token, password })
    }

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
      console.log(user)
      
      // Verifica se a senha está correta
      const isPasswordValid = await hash.verify(user.password, password)
      if (!isPasswordValid) {
        return response.unauthorized({ message: 'Credenciais inválidas' })
      }

      // Verifica se já existe token
      const existingToken = await db.from('auth_access_tokens').where('tokenable_id', user.id).first()
      if (existingToken) {
        const newToken = nanoid(64)

        await db.from('auth_access_tokens')
          .where('id', existingToken.id)
           .update({ hash: newToken })

        return { 
          user: {
            id: user.id,
            user_name: user.user_name,
            fullName: user.full_name,
            token: newToken
          },
        message: 'Token atualizado com sucesso' 
        }
      }

      const token = await auth.use('api').createToken(user)
      const tokenString = token.toJSON().token
      return { 
        user: {
          id: user.id,
          user_name: user.user_name,
          fullName: user.full_name,
            oken: tokenString
        } 
      }

    } catch (err) {
      console.error('Erro no login:', err)
      return response.unauthorized({ message: 'Credenciais inválidas' })
    }
  }

  public async renewData({ request, response }: HttpContext){
    const { token } = request.only(['token']);
    if(!token){
      return {message: 'Token Invalido',token};
    }

    const userToken = await db.from('auth_access_tokens').where('hash', token).first();
    if(!userToken){
      return response.badRequest({message: 'Token não encontrado',userToken})
    }

    const userData = await db.from('users').where('id', userToken.tokenable_id).first()
    if(!userData){
      return response.badRequest({message: 'Usuario nao encontrado',userData})
    }
    return{
      user: {
        id: userData.id,
        user_name: userData.user_name,
        full_name: userData.full_name,
        token: userToken.hash
      }
    }
  }

  public async closeToken({auth}: HttpContext){
    await auth.use('api').invalidateToken()
  }

    async update({ request, response }: HttpContext) {
      const user = await User.find(request.param('id'))
      if (!user) {
        return response.status(400).send({ message: 'Dados inválidos' })
      }
      user.user_name = request.input('user_name')
      user.full_name = request.input('full_name')
      user.email = request.input('email')
      await user.save()
      return user
  }


  async delete({request, response}:HttpContext) {
      const userId = request.param('id');
      const user = await User.find(userId);
    if (!user) {
      return response.status(404).send({ message: 'Usuário não encontrado' })
    }
    await user.delete()
    return response.status(200).send({ message: 'Usuário deletado com sucesso' })
  }

  public async doesExists({request, response}: HttpContext) {
      const user_name = request.only([ 'user_name' ])
      if (user_name) {
        return response.status(400).send({ message: 'O nome de usuário é obrigatório' });
      }

      const doesExist = await db.from('users').where('user_name', user_name).first()
      console.log(doesExist)

      if(doesExist){
        console.log('Ta caindo na bola3')
        return true
      }

      console.log('Nao t12a') 
      return false
    }
}
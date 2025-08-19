import type { HttpContext } from '@adonisjs/core/http';
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash';
import User from '#models/user';

export default class UserController {
    async cadastrar({request, response}: HttpContext) {
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
    const user = await User.create(data)
    const password = await hash.make('password')
    const token = await User.accessTokens.create(user)
    return response.created({ user, token, password })
    }

    public async login({ request, response }: HttpContext) {
    const { user_name, password } = request.only(['user_name', 'password'])
    /*Encontrar o usuario pelo user. Retornar erro
       se o usuario nao existir.
    */
    const user = await User.findBy('user_name', user_name)
    if (!user) {
      return response.abort('Dados Invalidos')
    }
    /*Verificar a senha usando o serviço hash*/
    const isPasswordValid = await hash.verify(user.password, password)
    if (!isPasswordValid) {
      return response.abort('Dados Invalidos')
    }
    
    return {
      user: {
        id: user.id,
        user_name: user.user_name,
        fullName: user.full_name,
      },
    }
  }

  async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    return await auth.use('api').createToken(user)
  }

  async destroy({ request, auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
  }


  public async findUserByToken({ request, response }: HttpContext) {
    const { token } = request.only(['token'])

    if (!token) {
      return response.status(400).send({ message: 'Token é obrigatório' })
    }

    const accessToken = await db
      .from('auth_access_tokens')
      .where('hash', token)
      .first()

    if (!accessToken) {
      return response.status(404).send({ message: 'Token não encontrado' })
    }

    const user = await User.find(accessToken.user_id)

    if (!user) {
      return response.status(404).send({ message: 'Usuário não encontrado' })
    }

    return response.send({
      user: {
        id: user.id,
        user_name: user.user_name,
        fullName: user.full_name,
      }
    })
  }

  public async refreshData({request, response}: HttpContext) {
    const { token, user_name } = request.only(['token', 'user_name'])
    const accessToken = await User.accessTokens.verify(token)
    if (!accessToken) {
      return response.abort('Token inválido')
    }
    const user = await User.findBy('user_name', user_name)
    if (!user) {
      return response.abort('Usuário não encontrado')
    }
    return {
      user: {
        id: user.id,
        user_name: user.user_name,
        fullName: user.full_name,
      },
    }
  }

  async index() {
    const users = await User.all()
    return users
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

async show({ request, response }: HttpContext) {
    const userId = request.param('id'); 
    const user = await User.find(userId);  // Busca o usuário pelo ID

    if (!user) {
        return response.status(404).send({ message: 'Usuário não encontrado' });
    }

    return user;  // Retorna os dados do usuário
}
}
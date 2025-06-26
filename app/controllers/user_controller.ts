import type { HttpContext } from '@adonisjs/core/http';
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
    const token = await User.accessTokens.create(user)
    return {
      token: token.toJSON(),
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
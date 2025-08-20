import type { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';

export default class UserController {
  async index() {
    const users = await User.all()
    return users
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
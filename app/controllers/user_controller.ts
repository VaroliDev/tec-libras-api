import type { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';
import db from '@adonisjs/lucid/services/db';

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

  async getRole({ request, response }: HttpContext) {
    const user = request.param('id');
    if (!user) {
      return response.status(400).send({ message: 'ID do usuário é obrigatório' });
    }

    const userData = await User.find(user);
    if (!userData) {
      return response.status(404).send({ message: 'Usuário não encontrado' });
    }
    return { role: userData.role };
  }

  async changeRole({ request, response}: HttpContext){
    const user = request.param('id');
    if(!user){
      return response.status(400). send({ message: 'ID do usuário é obrigatório'})
    }

    const userData = await User.find(user);
    if(!userData){
      return response.status(400).send({ message: 'Usuários não encontrado'})
    }

    if(userData.role === 'default'){
      await db.from('users').where('id', userData.id).update({role: 'admin'})
    }else{
      await db.from('users').where('id', userData.id).update({role: 'default'})
    }
  }
}
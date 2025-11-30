import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import UserLevelUnlock from '#models/user_level_unlock';
import { DateTime } from 'luxon';

export default class UserUnlockController {
    public async desbloquearNivel({request, response}: HttpContext) {
        const data = request.only(['user_id', 'level_id']);

        if(!data){
            return response.status(400).send({ message: 'Id de usuario nescessario' });
        }

        const desbloqueioExistente = await db.from('user_level_unlocks').where({
            'user_id': data.user_id, 'level_id': data.level_id}).first()

        if(desbloqueioExistente){
            return response.status(409).send({ message: 'Nível já desbloqueado para este usuário' });
        }

        const unlocked_at = DateTime.now();

        await UserLevelUnlock.create({
            user_id: data.user_id,
            level_id: data.level_id,
            unlocked_at: unlocked_at
        });
        return response.status(201).send({ message: 'Nível desbloqueado com sucesso' });
    }

    public async visualizarDesbloqueios({ request, response }: HttpContext) {
        const user_id = request.only(['user_id']).user_id;
        if (!user_id) {
            return response.status(400).send({ message: 'O ID do usuário é obrigatório' })
        }
        const desbloqueios = await db
        .from('user_level_unlocks')
        .where({ 'user_id': user_id })
        return response.status(200).send({ desbloqueios })
    }
}
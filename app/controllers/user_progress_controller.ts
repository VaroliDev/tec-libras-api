import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import UserProgress from '#models/user_progress'
import { DateTime } from 'luxon';

export default class UserProgressController {
    public async cadastrarProgresso({request, response}: HttpContext) {
        const data = request.only(['user_id', 'level_id', 'subject_id', 'topic_id', 'is_completed'])

        //verificações dos campos obrigatórios
        if(!data.user_id){
            return response.status(400).send({ message: 'O ID do usuário é obrigatório' });
        }
        if(!data.level_id){
            return response.status(400).send({ message: 'O ID do nível é obrigatório' });
        }

        if(!data.subject_id){
            return response.status(400).send({ message: 'O ID da matéria é obrigatório' });
        }

        if(!data.topic_id){
            return response.status(400).send({ message: 'O ID do tópico é obrigatório' });
        }

        const progressoExistente = await db.from('user_progress').where({
            'user_id': data.user_id, 'level_id': data.level_id, 'subject_id': data.subject_id, 'topic_id': data.topic_id}).first()
        
        if(progressoExistente){
            return response.status(409).send({ message: 'Progresso já cadastrado para este usuário e tópico' });
        }

        const completion_date = DateTime.now();
        
        await UserProgress.create({
            user_id: data.user_id,
            level_id: data.level_id,
            subject_id: data.subject_id,
            topic_id: data.topic_id,
            is_completed: data.is_completed,
            completion_date: completion_date
        });
        return response.status(201).send({ message: 'Progresso cadastrado com sucesso' });
    }

        public async vizualizarProgresso({ request, response }: HttpContext) {
        const user_id = request.only(['user_id']).user_id;
        
        if (!user_id) {
            return response.status(400).send({ message: 'O ID do usuário é obrigatório' })
        }

        const progresso = await db
        .from('user_progress')
        .where({ 'user_id': user_id })

        return response.status(200).send({ progresso })
    }
}
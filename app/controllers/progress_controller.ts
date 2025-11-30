import UserProgress from '#models/user_progress'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProgressController {
  public async createProgress({ request, response }: HttpContext) {
    try {
      const { user_id, /*level_id, subject_id, topic_id*/ } = request.only([
        'user_id',
        'level_id',
        'subject_id',
        'topic_id',
      ])
      /*
      const existing = await UserProgress.query()
        .where({ user_id, level_id, subject_id, topic_id })
        .first()

      if (existing) {
        return response.status(200).json({
          message: 'Progresso já existe.',
          progress: existing,
        })
      }*/

      const progress = await UserProgress.create({
        user_id,
        /*level_id,
        subject_id,
        topic_id,*/
        is_completed: false,
        score: 0,
        finished_lessons: 0,
      })

      return response.status(201).json({
        message: 'Progresso criado com sucesso.',
        progress,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'Erro ao criar progresso.',
        error: error.message,
      })
    }
  }
}

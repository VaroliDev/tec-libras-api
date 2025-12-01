import type { HttpContext } from '@adonisjs/core/http';
import UserAchievement from '#models/user_achievement';
import db from '@adonisjs/lucid/services/db';
import { DateTime } from 'luxon';

export default class AchievementsController {
    async addAchievement({ request, response }: HttpContext) {
        const data = request.only(['user_id', 'achievement']);

        if(!data){
            return response.badRequest({ messagem: 'Invalid data' });
        }

        try {
            const date = DateTime.now()

            const achievement = await UserAchievement.create(
                {
                    user_id: data.user_id,
                    achievement: data.achievement,
                    date: date
                }
            )
            return response.created(achievement);
        }
    }

    async getAchievements({ request, response }: HttpContext) {
        const userId = request.param('id');
        if(!userId){
            return response.badRequest({ messagem: 'User ID is required' });
        }

        const data = await db
            .from('user_achievements')
            .where('user_id', userId)

        if(data.length === 0){
            return response.notFound({ messagem: 'No achievements found for this user' });
        }

        return response.ok(data);
    }
}
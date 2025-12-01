import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Achievement from './achievement.js'

export default class UserAchievement extends BaseModel {
  public static table = 'user_achievements'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare achievementId: number

  @column.dateTime({ autoCreate: true })
  declare dateAchieved: DateTime

  // 🔹 Relacionamentos
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Achievement)
  declare achievement: BelongsTo<typeof Achievement>
}

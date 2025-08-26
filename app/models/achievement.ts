import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import UserAchievement from './user_achievement.js'

export default class Achievement extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare iconUrl: string | null

  @column()
  declare criteria: any | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // 🔹 Relacionamento: um achievement pode ter vários "user_achievements"
  @hasMany(() => UserAchievement)
  declare userAchievements: HasMany<typeof UserAchievement>
}

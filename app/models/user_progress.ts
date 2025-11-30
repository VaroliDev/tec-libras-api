import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from './user.js'
 
export default class UserProgress extends BaseModel {
  public static table = 'user_progress'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare level_id: number

  @column()
  declare subject_id: number

  @column()
  declare topic_id: number

  @column()
  declare is_completed: boolean

  @column.dateTime()
  declare completion_date: DateTime | null
 
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}

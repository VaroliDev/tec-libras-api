import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo} from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from './user.js'
import Level from './level.js'
import Subject from './subject.js'
import Topic from './topic.js'
 
export default class UserProgress extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
 
 @belongsTo(() => User)
  declare user_id: BelongsTo<typeof User>
 
  @belongsTo(() => Level)
  declare level_id: BelongsTo<typeof Level>
 
  @belongsTo(() => Subject)
  declare subject_id: BelongsTo<typeof Subject>
 
  @belongsTo(() => Topic)
  declare topic_id: BelongsTo<typeof Topic>
 
  @column()
  declare is_completed: boolean
 
  @column.dateTime()
  declare completion_date: DateTime | null
 
  @column()
  declare score: number
 
  @column()
  declare finished_lessons: number
 
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
 
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
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
 
  @column()
  declare score: number
 
  @column()
  declare finished_lessons: number
 
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
 
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
 
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
 
  @belongsTo(() => Level)
  declare level: BelongsTo<typeof Level>
 
  @belongsTo(() => Subject)
  declare subject: BelongsTo<typeof Subject>
 
  @belongsTo(() => Topic)
  declare topic: BelongsTo<typeof Topic>
}
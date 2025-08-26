import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Subject from './subject.js'
 
export default class UserSubjectUnlock extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
 
  @column()
  declare user_id: number
 
  @column()
  declare subject_id: number
 
  @column.dateTime()
  declare unlocked_at: DateTime
  
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
 
  @belongsTo(() => Subject)
  declare subject: BelongsTo<typeof Subject>
}
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Subject from './subject.js'

export default class Topic extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare subject_id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare order: number

  @column()
  declare type: 'theory' | 'practice' | 'test' | 'demonstration' | 'curiosity'

  @column()
  declare content: string | null

  @column()
  declare video_url: string | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime | null

  // Relacionamento com Subject
  @belongsTo(() => Subject)
  declare subject: any
}

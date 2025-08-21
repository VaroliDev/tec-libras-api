import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Topic from './topic.js'
import Sign from './sign.js'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare topic_id: number

  @column()
  declare question_text: string

  @column()
  declare question_type: 'multiple_choice' | 'true_false' | 'matching' | 'practice'

  @column()
  declare options: any | null  // JSON, pode ser object

  @column()
  declare correct_answer: string

  @column()
  declare explanation: string | null

  @column()
  declare sign_id: number | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime | null

  // Relacionamento com Topic
  @belongsTo(() => Topic)
  declare topic: any

  // Relacionamento com Sign (opcional)
  @belongsTo(() => Sign)
  declare sign: any
}

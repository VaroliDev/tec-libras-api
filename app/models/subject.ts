import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Level from './level.js'

export default class subject extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare level_id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare icon: string

  @column()
  declare order: number

  @column()
  declare required_subject_id: number | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime | null

  // Relacionamento com Level
  @belongsTo(() => Level)
  declare level: any  // deixa como 'any' ou não declare o tipo, o Lucid vai inferir

  // Relacionamento com Subject (pré-requisito)
  @belongsTo(() => subject, { foreignKey: 'required_subject_id' })
  declare required_subject: any  // mesma coisa
}

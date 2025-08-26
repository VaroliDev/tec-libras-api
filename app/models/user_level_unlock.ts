import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
 
export default class UserLevelUnlock extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
 
  @column()
  declare user_id: number
 
  @column()
  declare level_id: number
 
  @column.dateTime()
  declare unlocked_at: DateTime
}
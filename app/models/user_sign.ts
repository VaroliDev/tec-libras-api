import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from './user.js'
import Sign from './sign.js'
 
export default class UserSign extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
 
  @column()
  declare user_id: number
 
  @column()
  declare sign_id: number
 
  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
 
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
 
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
 
  @belongsTo(() => Sign)
  declare sign: BelongsTo<typeof Sign>
}
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

import Level from './level.js'
import Subject from './subject.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export type UserRole = 'admin' | 'default'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare full_name: string | null

  @column()
  declare user_name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: UserRole // 🔹 agora tipado com UserRole

  @column()
  declare current_level: number | null

  @column()
  declare current_subject: number | null

  @belongsTo(() => Level, {
    foreignKey: 'current_level',
  })
  declare level: BelongsTo<typeof Level>

  @belongsTo(() => Subject, {
    foreignKey: 'current_subject',
  })
  declare subject: BelongsTo<typeof Subject>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}

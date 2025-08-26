import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UserAchievementsSchema extends BaseSchema {
  protected tableName = 'user_achievements'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('achievement_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('achievements')
        .onDelete('CASCADE')

      table.timestamp('date_achieved').notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

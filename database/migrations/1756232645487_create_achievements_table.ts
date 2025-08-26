import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AchievementsSchema extends BaseSchema {
  protected tableName = 'achievements'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 100).notNullable()
      table.text('description').nullable()
      table.string('icon_url', 255).nullable()
      table.json('criteria').nullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

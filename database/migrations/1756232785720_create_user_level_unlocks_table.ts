import { BaseSchema } from '@adonisjs/lucid/schema'
 
export default class CreateUserLevelUnlocksTable extends BaseSchema {
  protected tableName = 'user_level_unlocks'
 
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('level_id').unsigned().notNullable().references('id').inTable('levels').onDelete('CASCADE')
      table.timestamp('unlocked_at', { useTz: true }).defaultTo(this.now())

    })
  }
 
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
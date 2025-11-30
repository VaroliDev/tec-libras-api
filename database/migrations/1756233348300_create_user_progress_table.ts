import { BaseSchema } from '@adonisjs/lucid/schema'
 
export default class CreateUserProgressTable extends BaseSchema {
  protected tableName = 'user_progress'
 
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('level_id').unsigned().notNullable()
      table.integer('subject_id').unsigned().notNullable()
      table.integer('topic_id').unsigned().notNullable()
      table.boolean('is_completed').defaultTo(false)
      table.timestamp('completion_date', { useTz: true }).nullable()
    })
  }
 
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
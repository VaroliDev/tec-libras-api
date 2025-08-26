import { BaseSchema } from '@adonisjs/lucid/schema'
 
export default class CreateUserProgressTable extends BaseSchema {
  protected tableName = 'user_progress'
 
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('level_id').unsigned().notNullable().references('id').inTable('levels').onDelete('CASCADE')
      table.integer('subject_id').unsigned().notNullable().references('id').inTable('subjects').onDelete('CASCADE')
      table.integer('topic_id').unsigned().notNullable().references('id').inTable('topics').onDelete('CASCADE')
      table.boolean('is_completed').defaultTo(false)
      table.timestamp('completion_date', { useTz: true }).nullable()
      table.integer('score').defaultTo(0)
      table.integer('finished_lessons').defaultTo(0)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }
 
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
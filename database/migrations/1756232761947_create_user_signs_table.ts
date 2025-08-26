import { BaseSchema } from '@adonisjs/lucid/schema'
 
export default class CreateUserSignsTable extends BaseSchema {
  protected tableName = 'user_signs'
 
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('sign_id').unsigned().notNullable().references('id').inTable('signs').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }
 
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
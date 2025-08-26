import { BaseSchema } from '@adonisjs/lucid/schema'
 
export default class CreateUserSubjectUnlocksTable extends BaseSchema {
  protected tableName = 'user_subject_unlocks'
 
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('subject_id').unsigned().notNullable().references('id').inTable('subjects').onDelete('CASCADE')
      table.timestamp('unlocked_at', { useTz: true }).defaultTo(this.now())
    })
  }
 
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
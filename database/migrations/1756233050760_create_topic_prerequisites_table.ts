import { BaseSchema } from '@adonisjs/lucid/schema'
 
export default class CreateTopicPrerequisitesTable extends BaseSchema {
  protected tableName = 'topic_prerequisites'
 
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('topic_id').unsigned().notNullable().references('id').inTable('topics').onDelete('CASCADE')
      table.integer('required_topic_id').unsigned().notNullable().references('id').inTable('topics').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }
 
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
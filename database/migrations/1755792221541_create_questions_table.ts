import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateQuestionsTable extends BaseSchema {
  protected tableName = 'questions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('topic_id').unsigned().notNullable()
      table.text('question_text').notNullable()
      table.enum('question_type', ['multiple_choice', 'true_false', 'matching', 'practice']).notNullable()
      table.json('options').nullable()
      table.string('correct_answer', 255).notNullable()
      table.text('explanation').nullable()
      table.integer('sign_id').unsigned().nullable()

      table.foreign('topic_id').references('id').inTable('topics').onDelete('CASCADE')
      table.foreign('sign_id').references('id').inTable('signs').onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

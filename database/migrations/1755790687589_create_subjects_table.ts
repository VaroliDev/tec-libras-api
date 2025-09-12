import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateSubjectsTable extends BaseSchema {
  protected tableName = 'subjects'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('level_id').unsigned().notNullable()
      table.string('title', 100).notNullable()
      table.string('subtitle',).notNullable()
      table.text('description').nullable()
      table.integer('order').notNullable()
      table.integer('required_subject_id').unsigned().nullable()

      table.foreign('level_id').references('id').inTable('levels').onDelete('CASCADE')
      table.foreign('required_subject_id').references('id').inTable('subjects').onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

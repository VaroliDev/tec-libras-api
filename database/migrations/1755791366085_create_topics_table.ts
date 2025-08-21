import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateTopicsTable extends BaseSchema {
  protected tableName = 'topics'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('subject_id').unsigned().notNullable()
      table.string('title', 100).notNullable()
      table.text('description').nullable()
      table.integer('order').notNullable()
      table.enum('type', ['theory', 'practice', 'test', 'demonstration', 'curiosity']).notNullable()
      table.text('content').nullable()
      table.string('video_url', 255).nullable()

      table.foreign('subject_id').references('id').inTable('subjects').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

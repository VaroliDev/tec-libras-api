import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateSignsTable extends BaseSchema {
  protected tableName = 'signs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.text('description').nullable()
      table.text('history').nullable()
      table.string('video_url', 255).notNullable()
      table.string('image_url', 255).nullable()
      table.string('category', 50).nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("words", table =>{
    table.bigIncrements("id"),
    table.string("title").notNullable()
    table.string("non_latin_title")
    table.string("author")
    table.text("authorPicture")
    table.text("definition").notNullable()
    table.string("speech").notNullable()
    table.string("video")
    table.integer("entry")
    table.integer("hasQuotes")

    table.bigInteger('userId')
    .notNullable()
    .unsigned()
    .index()
    .references('users.id')

    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())

  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("words")
}

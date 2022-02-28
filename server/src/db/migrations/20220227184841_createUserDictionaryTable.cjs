/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("dictionaries", table =>{
    table.bigIncrements("id")
    table.integer("userId")
    .notNullable()
    .unsigned()
    .index()
    .references('users.id')
    table.integer("folderId")
    .notNullable()
    .unsigned()
    .index()
    .references('folders.id')
    table.integer("wordId")
    .notNullable()
    .unsigned()
    .index()
    .references('words.id')

    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("dictionaries")
}

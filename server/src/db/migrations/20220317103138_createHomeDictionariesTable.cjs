/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
 exports.up = async (knex) => {
  return knex.schema.createTable("homeDictionaries", table =>{
    table.bigIncrements("id")
    table.integer("userId")
    .notNullable()
    .unsigned()
    .index()
    .references('users.id')

    table.integer("homeFolderId")
    .notNullable()
    .unsigned()
    .index()
    .references('homeFolders.id')

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
  return knex.schema.dropTableIfExists("homeDictionaries")
}

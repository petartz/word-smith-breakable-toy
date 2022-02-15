/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("categorizations", table =>{
    table.bigIncrements("id")
    table.bigInteger("wordId")
      .unsigned()
      .notNullable()
      .index()
      .references("words.id")
    table.bigInteger("tagId")
      .unsigned()
      .notNullable()
      .index()
      .references("tags.id")

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("categorizations")
}

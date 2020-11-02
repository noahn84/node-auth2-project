exports.up = async function(knex) {
  await knex.schema.createTable("departments", (table) => {
    table.increments("id")
    table.text("name").notNull().unique()
  })

  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("username").notNull().unique()
    table.text("password").notNull()
    table.integer("department_id")
      .notNull()
      .references("id")
      .inTable("departments")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE")
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users")
  await knex.schema.dropTableIfExists("departments")
}
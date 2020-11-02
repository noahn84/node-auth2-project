exports.seed = async function(knex) {
  await knex("departments").insert([
    { name: "backend" },
    { name: "frontend" },
    { name: "fullstack" },
  ])
}
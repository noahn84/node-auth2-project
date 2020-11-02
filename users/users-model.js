const db = require("../database/config")

async function add(user) {
  const [id] = await db("users").insert(user)
  return findById(id)
}

function find() {
  return db("users as u")
    .innerJoin("departments as d", "d.name", "u.department")
    .select("u.id", "u.username", "d.name as department")
}

function findByDepartment() {
  return db("users as u")
    .innerJoin("departments as d", "d.name", "u.department")
    .select("u.id", "u.username", "d.name as department")
}

function findById(id) {
  return db("users as u")
    .where("u.id", id)
    .innerJoin("departments as d", "d.name", "u.department")
    .select("u.id", "u.username", "d.name as department")
}

function findByUsername(username) {
  return db("users as u")
    .innerJoin("departments as d", "d.name", "u.department")
    .where("u.username", username)
    .first("u.id", "u.username", "u.password", "d.name as department")
}

module.exports = {
  add,
  find,
  findByDepartment,
  findById,
  findByUsername,
}
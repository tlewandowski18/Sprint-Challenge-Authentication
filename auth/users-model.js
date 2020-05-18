const bcrypt = require("bcryptjs")
const db = require("../database/dbConfig")

function findBy(filter) {
    return db("users")
        .where(filter)
        .first()
}

function findById(id) {
    return db("users")
        .where("id", id)
        .select("id", "username")
        .first()
}

async function add(data){
    data.password = await bcrypt.hash(data.password, 13)
    const [id] = await db("users").insert(data)
    return findById(id) 
}

module.exports = {
    findBy,
    findById,
    add
}
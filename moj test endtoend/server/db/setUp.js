const fs = require("fs")
const client = require("./connection")

const agentsSchema = fs.readFileSync('./db/agents.sql').toString()
const seedData = fs.readFileSync("./db/seed.sql").toString()

const setUpDB = async() => {
    await client.query(agentsSchema)
    await client.query(seedData)
    console.log("database ready")
}
setUpDB()

const dotenv = require ("dotenv").config()
const {Pool} = require("pg")

const client = new Pool({
    connectionString: process.env.DBCONNECTIONSSTRING
})

module.exports = client

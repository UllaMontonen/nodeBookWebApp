require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_USER,
    host: "localhost",
    port: "5432",
    database: "book",
    password: process.env.DB_PASSWORD
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}

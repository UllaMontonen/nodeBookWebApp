require('dotenv').config()
const { Pool } = require('pg')
const env = process.env.NODE_ENV || 'development';


const pool = new Pool({
    user: process.env.DB_USER,
    host: "localhost",
    port: "5432",
    database: env === 'test' ? 'test_book' :"book",
    password: process.env.DB_PASSWORD
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}

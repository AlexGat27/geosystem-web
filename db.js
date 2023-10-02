const pool = require('pg').Pool

client = new pool({
    user: "postgres",
    password: "Shurikgat2704",
    host: "localhost",
    port: 5432,
    database: "clients"
})

module.exports = client
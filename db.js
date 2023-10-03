const {Client} = require('pg')

client = new Client({
    user: "postgres",
    password: "1qaz2wsx",
    host: "localhost",
    port: 5432,
    database: "clients"
})

client.connect()

module.exports = client
const app = require('./app')
// const port = process.env.PORT || 5000
const port = 80
const hostname = '0.0.0.0'

app.listen(port, hostname, () => {console.log('Server has been started')})
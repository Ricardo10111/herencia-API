require('dotenv').config()
const server = require('./src/server')
const db = require('./src/lib/db')

const PORT = process.env.PORT || 8080

db.connect()
  .then(() => {
    console.log('Database connected successfully')
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Database connection failed:', error)
  })

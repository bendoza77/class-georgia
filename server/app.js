const express = require('express')
const cors = require('cors')
require('dotenv').config()

const chatRouter = require('./routers/chatRouter')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/chat', chatRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app

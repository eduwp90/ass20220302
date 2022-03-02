require('dotenv').config()
require('./config/DatabaseConfig')
const express = require('express')
const app = express()
const cors = require('cors')

const apiVersion = process.env.API_VERSION || 'v1'

const router = require(`./api/${apiVersion}/routes/router`)

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(router)

const server = app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

module.exports = { app, server }

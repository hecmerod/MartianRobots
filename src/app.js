const express = require('express')
const app = express()

const gridRoutes = require('./routes/gridRoutes')

app.get('/', (req, res) => {
  res.send('<h2>RESTFUL API</h2>')
})

app.use('/grid', gridRoutes)

module.exports = app

const express = require('express')
const app = express()

const gridRoutes = require('./routes/gridRoutes')
const robotRoutes = require('./routes/robotRoutes')

app.get('/', (req, res) => {
  res.send('<h2>RESTFUL API</h2>')
})

app.use('/grid', gridRoutes)
app.use('/robot', robotRoutes)

module.exports = app

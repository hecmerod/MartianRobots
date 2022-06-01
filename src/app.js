const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('<h2>RESTFUL API</h2>')
})

module.exports = app

const port = process.env.PORT

const app = require('./src/app')

app.listen(port,
  () => console.log('App listening on port' + port + ' :)')
)

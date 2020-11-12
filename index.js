require('dotenv').config()
const express = require('express')
// const db = require('./src/helpers/db')
const bodyParser = require('body-parser')
const app = express()
const projectRouter = require('./src/routers/project')
const port = process.env.PORT

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/project', projectRouter)

app.get('/', (_request, response) => {
  response.send('Backend by Android2!')
})
app.listen(port, () => {
  console.log(`Listen app backend on port ${port}`)
})

import express from 'express'
import logger from 'morgan'

const app = express()

app.use(logger('dev'))

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello World from the magnificent test-app!')
}) 

app.get('/error', (req, res) => {
  process.exit(1)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
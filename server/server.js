const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/hidden-notes'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/auth', require('./api/routes/auth'))
app.use('/posts', require('./api/routes/posts'))
app.use('/friends', require('./api/routes/friends'))
app.use('/users', require('./api/routes/users'))

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const connection = mongoose.connection
connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.listen(PORT, () => console.log('app listening on port', PORT))

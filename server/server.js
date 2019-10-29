require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/hidden-notes';

var socketConnections = {};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));
// socket middleware
app.use((req, res, next) => {
  req.io = io;
  req.sockets = socketConnections;
  next();
});
app.use('/auth', require('./api/routes/auth'));
app.use('/posts', require('./api/routes/posts'));
app.use('/friends', require('./api/routes/friends'));
app.use('/users', require('./api/routes/users'));

// connect db
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const mongoConnection = mongoose.connection;
mongoConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Websockets
io.sockets.on('connection', socket => {
  console.log('user connected');
  socket.on('authenticate', ({ token }) => {
    try {
      const user = jwt.verify(token, process.env.API_KEY);
      socketConnections[user.uid] = socket.id;
      socket.on('disconnect', () => {
        console.log('user disconnected');
        delete socketConnections[user.uid];
      });
    } catch (err) {
      console.log(err);
      socket.disconnect(true);
      return;
    }
  });
});

http.listen(PORT, () => console.log('app listening on port', PORT));

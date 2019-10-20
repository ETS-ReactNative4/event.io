const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./routes/api')(app);
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/hidden-notes';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(PORT, () => console.log('app listening on port', PORT));

module.exports = {
  PORT: process.env.PORT || 3000,
  API_KEY: process.env.API_KEY || 'secret',
  MONGODB_URI:
    process.env.MONGODB_URI || 'mongodb://127.0.0.1/hidden-notes',
}

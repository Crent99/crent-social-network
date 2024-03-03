const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/socialDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
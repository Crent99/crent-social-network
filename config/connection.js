const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/socialDB';

connect(process.env.MONGODB_URI || connectionString, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;
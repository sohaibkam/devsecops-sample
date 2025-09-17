const mongoose = require('mongoose');

async function connectDB(uri = process.env.MONGO_URI || 'mongodb://mongo:27017/devsecops') {
        await mongoose.connect(uri);        // no deprecated options
    console.log('MongoDB connected');
}

module.exports = { connectDB };

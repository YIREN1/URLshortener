const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    })
    console.log('\u001b[1;32m connect to db');
    } catch (err) {
      console.error('\u001b[1;31m',err.message);
      process.exit(1);
  }
}

module.exports = connectDB;
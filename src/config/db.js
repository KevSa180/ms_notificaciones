const mongoose = require('mongoose');

async function connectMongo() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('[MongoDB] Connected to', process.env.MONGODB_URI);
}

module.exports = { connectMongo };

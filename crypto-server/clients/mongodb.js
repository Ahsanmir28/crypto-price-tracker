const mongoose = require('mongoose')

const mongodb_client = mongoose.connect(process.env.MONGODB_URI)

module.exports = mongodb_client
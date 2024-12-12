const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
    favourites: [{type: String}]
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
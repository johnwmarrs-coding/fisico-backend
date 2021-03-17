const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password_hash: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

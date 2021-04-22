const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password_hash: String,
    height: Number,
    weight: Number,
    age: Number,
    socket_id: String,
    gender: { type: String, enum: ['m','f'] }
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

module.exports = User;

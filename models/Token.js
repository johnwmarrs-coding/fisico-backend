const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token_hash: String,
    created_at: Date,
    expiration_date: Date
});

var Token = mongoose.model('Token', TokenSchema);

module.exports = Token;

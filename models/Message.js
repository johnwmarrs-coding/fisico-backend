const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    to: String, // email address
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content_type: { type: String, enum: ['Text', 'Workout'] },
    content: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;

const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    name: String, // email address
    message: String, // message string (or stringified json)
    group: String, // group id string
    message_type: {type : String, default: 'text' } // Either text or workout
    
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;

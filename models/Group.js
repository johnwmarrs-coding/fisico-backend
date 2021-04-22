const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    recipients: Array,
    name: String,
    
}, { timestamps: true });

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
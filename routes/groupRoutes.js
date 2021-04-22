const express = require('express');
const MessageController = require('../controllers/MessageController');
const router = express.Router();
const User = require('../models/User');
const Group = require('../models/Group');
const Message = require('../models/Message');

// Send message
router.post('/', async function (req, res, next) {
    try {
        let group = new Group(req.body);
        let savedgroup = await group.save();
        console.log('Saved group');
        res.send({success: true, group: savedgroup})
    
    }catch (error) {
        //res.sendStatus(500);
        res.send({success: false})
        console.log('Error');
    }
});


module.exports = router;
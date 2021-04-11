const express = require('express');
const MessageController = require('../controllers/MessageController');
const router = express.Router();

// Send message
router.post('/send', async function (req, res, next) {
    const { token_hash, message } = req.body;
    const email = message.to;
    const senderUserID = message.from;

    const receiverVerification = await MessageController.verifyReceiver(email);
    const senderVerification = await MessageController.verifySender(token_hash, senderUserID);

    const recipientVerified = receiverVerification.success;
    const senderVerified = senderVerification.success;

    if (recipientVerified && senderVerified) {

    }

});


module.exports = router;

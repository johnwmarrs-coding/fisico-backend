const express = require('express');
const TokenController = require('../controllers/TokenController');
const router = express.Router();

// Get token
router.get('/:user_id', async function (req, res, next) {
    const { user_id } = req.params;
    const { success, msg, token } = await TokenController.getByUserID(user_id);

    if (!success || !token) {
        console.error(`Not able to find token belonging to user with ID ${user_id}`);
        res.status(404);
    }

    res.json({ success, msg, token });
});

// Create token
router.post('/', async function (req, res, next) {
    const { success, msg, token } = await TokenController.createToken(req.body);

    if (!success || !token) {
        console.error(`Failed to create new token for user ID ${token.user_id}`);
        res.status(400);
    } else {
        res.status(201);
    }

    res.json({ success, msg, token });
});

// Update token
router.put('/:user_id', async function (req, res, next) {
    const { user_id } = req.params;
    const { success, msg, token } = await TokenController.updateToken(user_id, req.body);

    if (!success || !token) {
        console.error(`Failed to update token for user ID ${token.user_id}`);
        res.status(400);
    }

    res.json({ success, msg, token });
});

// Delete token
router.delete('/:user_id', async function (req, res, next) {
    const { user_id } = req.params;
    const { success, msg, token } = await TokenController.deleteToken(user_id);

    if (!success || !token) {
        console.error(`Failed to delete token for user with ID ${user_id}`);
        res.status(400);
    }

    res.json({ success, msg, token });
});

module.exports = router;

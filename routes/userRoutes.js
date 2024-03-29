const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

// Get user
router.post('/', async function (req, res, next) {
    const { user_id } = req.body;
    const { success, msg, user } = await UserController.getByID(user_id);

    if (!success || !user) {
        console.error(`Not able to find user with ID ${user_id}`);
        res.status(404);
    }

    res.json({ success, msg, user });
});

// Create user (sign-up)
router.post('/signup', async function(req, res, next) {
    const { success, msg, token_hash, user } = await UserController.createUser(req.body);

    if (!success || !user) {
        console.error("Failed to create new user");
        res.status(400);
    } else {
        res.status(201);
    }

    let data = {
        token_hash,
        "user_id": user._id
    }

    res.json({ success, msg, data });
});

// Update user
router.put('/', async function(req, res, next) {
    const { user_id, update_fields } = req.body;
    const { success, msg, user } = await UserController.updateUser(user_id, update_fields);

    if (!success || !user) {
        console.error("Failed to update user");
        res.status(400);
    }

    res.json({ success, msg, user });
});

// Delete user
router.delete('/', async function(req, res, next) {
    const { user_id } = req.body;
    const { success, msg, user } = await UserController.deleteUser(user_id);

    if (!success || !user) {
        console.error(`Failed to delete user with ID ${user_id}`);
        res.status(400);
    }

    res.json({ success, msg, user });
});

// User login
router.post('/login', async function(req, res, next) {
    const { email, password_hash } = req.body;
    const { success, msg, token_hash, user } = await UserController.login(email, password_hash);

    if (!success || !user) {
        console.error(`Login failed for user with email ${email}`);
        res.status(400);
    }

    let data = {
        token_hash,
        "user_id": user._id
    }

    res.json({ success, msg, data });
})

// User logoff
router.post('/logoff', async function(req, res, next) {
    const { user_id } = req.body;
    const { success, msg, token } = await UserController.logoff(user_id);

    if (!success || !token) {
        console.error(`Logoff failed for user with ID ${user_id}`);
        res.status(400);
    }

    res.json({ success, msg, token });
})

module.exports = router;

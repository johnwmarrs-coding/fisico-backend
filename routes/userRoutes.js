const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

// Get user
router.get('/:user_id', async function (req, res, next) {
    const { user_id } = req.params;
    const { success, msg, user } = await UserController.getByID(user_id);

    if (!success || !user) {
        console.error(`Not able to find user with ID ${user_id}`);
        res.status(404);
    }

    res.json({ success, msg, user });
});

// Create user
router.post('/', async function(req, res, next) {
    const { success, msg, user } = await UserController.createUser(req.body);

    if (!success || !user) {
        console.error("Failed to create new user");
        res.status(400);
    } else {
        res.status(201);
    }

    res.json({ success, msg, user });
});

// Update user
router.put('/:user_id', async function(req, res, next) {
    const { user_id } = req.params;
    const { success, msg, user } = await UserController.updateUser(user_id, req.body);

    if (!success || !user) {
        console.error("Failed to update user");
        res.status(400);
    }

    res.json({ success, msg, user });
});

// Delete user
router.delete('/:user_id', async function(req, res, next) {
    const { user_id } = req.params;
    const { success, msg, user } = await UserController.deleteUser(user_id);

    if (!success || !user) {
        console.error(`Failed to delete user with ID ${user_id}`);
        res.status(400);
    }

    res.json({ success, msg, user });
});

module.exports = router;

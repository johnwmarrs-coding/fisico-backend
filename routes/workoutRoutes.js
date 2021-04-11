const express = require('express');
const WorkoutController = require('../controllers/WorkoutController');
const router = express.Router();

// Get workout(s)
router.post('/get', async function (req, res, next) {
    let { user_id, completed, days, past } = req.body;

    if (completed == undefined) {
        completed = false;
    }

    if (days == undefined) {
        days = 0;
    }

    if (past == undefined) {
        past = false;
    }

    const { success, msg, workout } = await WorkoutController.getByUserID(user_id, completed, days, past);

    if (!success || !workout) {
        console.error(`Not able to find workout(s) belonging to user with ID ${user_id}`);
        res.status(404);
    }

    res.json({ success, msg, workout });
});



//get duration workout analytics
router.post('/analytics/duration', async function (req, res, next) {
    let { user_id, days} = req.body;

    if (days == undefined) {
        days = 0;
    }

    const { success, msg, data } = await WorkoutController.getWorkoutDurationAnalytics(user_id, days);

    if (!success) {
        console.error(`Not able to find workout(s) belonging to user with ID ${user_id} to analyze`);
        res.status(404);
    }

    res.json({ success, msg, data});
});




// Create workout
router.post('/', async function (req, res, next) {
    const { success, msg, workout } = await WorkoutController.createWorkout(req.body);

    if (!success || !workout) {
        console.error("Failed to create new workout");
        res.status(400);
    } else {
        res.status(201);
    }

    res.json({ success, msg, workout });
});

// Update workout
router.put('/', async function (req, res, next) {
    const { user_id, update_fields, workout_id } = req.body;
    const { success, msg, workout } = await WorkoutController.updateWorkout(user_id, workout_id, update_fields);

    if (!success || !workout) {
        console.error(`Failed to update workout for user ID ${user_id}`);
        res.status(400);
    }

    res.json({ success, msg, workout });
});

// Delete workout
router.delete('/', async function (req, res, next) {
    const { user_id, workout_id } = req.body;
    const { success, msg, workout } = await WorkoutController.deleteWorkout(user_id, workout_id);

    if (!success || !workout) {
        console.error(`Failed to delete workout with ID ${workout_id}`);
        res.status(400);
    }

    res.json({ success, msg, workout });
});

module.exports = router;

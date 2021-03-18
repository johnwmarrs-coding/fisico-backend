const express = require('express');
const WorkoutController = require('../controllers/WorkoutController');
const router = express.Router();

// Get workout(s)
router.get('/:user_id', async function (req, res, next) {
    const { user_id } = req.params;
    let data;

    if (!req.query.completed) {
        data = await WorkoutController.getByUserID(user_id);
    } else {
        data = await WorkoutController.getCompletedWorkoutsByUserID(user_id);
    }

    const success = data.success;
    const msg = data.msg;
    const workout = data.workout;

    if (!success || !workout) {
        console.error(`Not able to find workout(s) belonging to user with ID ${user_id}`);
        res.status(404);
    }

    res.json({ success, msg, workout });
});

// Create workout
router.post('/', async function (req, res, next) {
    const { success, msg, workout } = await WorkoutController.createWorkout(req.body);

    if (!success || !workout) {
        console.error(`Failed to create new workout for user ID ${workout.user_id}`);
        res.status(400);
    } else {
        res.status(201);
    }

    res.json({ success, msg, workout });
});

// Update workout
router.put('/:user_id/:workout_id', async function (req, res, next) {
    const { user_id, workout_id } = req.params;
    const { success, msg, workout } = await WorkoutController.updateWorkout(user_id, workout_id, req.body);

    if (!success || !workout) {
        console.error(`Failed to update workout for user ID ${workout.user_id}`);
        res.status(400);
    }

    res.json({ success, msg, workout });
});

// Delete workout
router.delete('/user_id/:workout_id', async function (req, res, next) {
    const { user_id } = req.params;
    const { success, msg, workout } = await WorkoutController.deleteWorkout(user_id);

    if (!success || !workout) {
        console.error(`Failed to delete workout for user with ID ${user_id}`);
        res.status(400);
    }

    res.json({ success, msg, workout });
});

module.exports = router;

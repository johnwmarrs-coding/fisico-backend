const express = require('express');
const WorkoutCycleController = require('../controllers/WorkoutCycleController');
const WorkoutController = require('../controllers/WorkoutController');
const router = express.Router();

// Get workout cycle
router.get('/:user_id', async function (req, res, next) {
    const { user_id } = req.params;
    const { success, msg, workoutCycle } = await WorkoutCycleController.getByUserID(user_id);

    if (!success || !workoutCycle) {
        console.error(`Not able to find workoutCycle belonging to user with ID ${user_id}`);
        res.status(404);
    }

    res.json({ success, msg, workoutCycle });
});

// Create workout cycle
router.post('/', async function (req, res, next) {
    const { success, msg, workoutCycle } = await WorkoutCycleController.createWorkoutCycle(req.body);

    if (!success || !workoutCycle) {
        console.error("Failed to create new workoutCycle");
        res.status(400);
    } else {
        res.status(201);
    }

    res.json({ success, msg, workoutCycle });
});

// Update workout cycle
router.put('/:user_id', async function (req, res, next) {
    const { user_id } = req.params;
    // update workoutCycle
    const workoutCycle_id = req.query.workout_id;
    const { success, msg, workoutCycle } = await WorkoutCycleController.updateWorkoutCycle(user_id, workoutCycle_id, req.body);

    if (!success || !workoutCycle) {
        console.error(`Failed to update workoutCycle for user ID ${user_id}`);
        res.status(400);
    }

    res.json({ success, msg, workoutCycle });
});

// Delete workout cycle 
// needs to be updated
router.delete('/user_id', async function (req, res, next) {
    const { user_id } = req.params;
    const workoutCycle_id = req.query.workout_id; 
    const { success, msg, workoutCycle } = await WorkoutCycleController.deleteWorkout(user_id, workoutCycle_id);

    if (!success || !workoutCycle) {
        console.error(`Failed to delete workoutCycle with ID ${workoutCycle_id}`);
        res.status(400);
    }

    res.json({ success, msg, workoutCycle });
});

module.exports = router;

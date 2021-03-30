const express = require('express');
const WorkoutController = require('../controllers/WorkoutController');
const router = express.Router();

// Get workout(s)
router.post('/get', async function (req, res, next) {
    const { user_id, sync, completed } = req.body;
    let data;
    // if statement kicks in even if completed is false
    // add days query, grab within a set of days
    // console.log(comp)
    if (sync != "empty")
    {
        if(sync == "true")
        {
            data = await WorkoutController.getsyncstart(user_id);
        }
        else if(sync == "false")
        {
            data = await WorkoutController.getplannedahead(user_id);
        }

    }
    else if ("false" == completed) {
        data = await WorkoutController.getByUserID(user_id);
    } else if ("true" == completed){
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
        console.error("Failed to create new workout");
        res.status(400);
    } else {
        res.status(201);
    }

    res.json({ success, msg, workout });
});

// Update workout
router.put('/:user_id', async function (req, res, next) {
    const { user_id } = req.params;
    const workout_id = req.query.workout_id;
    const { success, msg, workout } = await WorkoutController.updateWorkout(user_id, workout_id, req.body);

    if (!success || !workout) {
        console.error(`Failed to update workout for user ID ${user_id}`);
        res.status(400);
    }

    res.json({ success, msg, workout });
});

// Delete workout
router.delete('/user_id/', async function (req, res, next) {
    const { user_id } = req.params;
    const workout_id = req.query.workout_id;
    const { success, msg, workout } = await WorkoutController.deleteWorkout(user_id, workout_id);

    if (!success || !workout) {
        console.error(`Failed to delete workout with ID ${workout_id}`);
        res.status(400);
    }

    res.json({ success, msg, workout });
});

module.exports = router;

const WorkoutCycle = require('../models/WorkoutCycle');
const WorkoutController = require('../controllers/WorkoutController');

const getByUserID = async (user_id) => {
    let workoutCycle, msg;
    let success = false;

    try {
        workoutCycle = await WorkoutCycle.find({ user_id: user_id }).populate('workout_cycle').exec();

        if (!workoutCycle) {
            msg = "WorkoutCycle(s) not found";
        } else {
            success = true;
            msg = `Found workoutCycle(s) for user ID ${user_id}`;
        }
    } catch (err) {
        msg = "WorkoutCycle(s) not found";
    }

    return {
        workoutCycle,
        msg,
        success,
    };
}

const createWorkoutCycle = async (workout_cycle_body) => {
    let workoutCycle, msg;
    let success = false;

    try {
        workoutCycle = new WorkoutCycle(workout_cycle_body);

        const doc = await workoutCycle.save();

        if (!doc) {
            msg = `Failed to create new workoutCycle for user ID ${workoutCycle.user_id}`;
        } else {
            success = true;
            msg = `New workoutCycle for user ID ${workoutCycle.user_id} created`;
        }
    } catch (err) {
        msg = `Failed to create new workoutCycle for user ID ${workoutCycle.user_id}`;
    }

    return {
        workoutCycle,
        msg,
        success,
    };
}

const updateWorkoutCycle = async (user_id, workout_id, update_fields) => {
    let workoutCycle, msg;
    let success = false;

    try {
        workoutCycle = await WorkoutCycle.findOneAndUpdate({ _id: workout_id, user_id: user_id }, { $set: update_fields }, { new: true }).exec();

        if (!workoutCycle) {
            msg = "Failed to update workoutCycle";
        } else {
            success = true;
            msg = `WorkoutCycle for user ID ${workoutCycle.user_id} updated`;
        }
    } catch (err) {
        msg = "Failed to update workoutCycle";
    }

    return {
        workoutCycle,
        msg,
        success,
    };
}

const deleteWorkoutCycle = async (user_id, workout_id) => {
    let workoutCycle, msg;
    let success = false;

    try {
        workoutCycle = await WorkoutCycle.findOneAndDelete({ _id: workout_id, user_id: user_id }).exec()

        if (!workoutCycle) {
            msg = `Failed to delete workoutCycle for user ID ${user_id}`;
        } else {
            success = true;
            msg = `WorkoutCycle for user ID ${workoutCycle.user_id} deleted`;
        }
    } catch (err) {
        msg = `Failed to delete workoutCycle for user ID ${user_id}`;
    }

    return {
        workoutCycle,
        msg,
        success,
    };
}

module.exports = {
    getByUserID,
    createWorkoutCycle,
    updateWorkoutCycle,
    deleteWorkoutCycle
}

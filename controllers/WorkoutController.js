const Workout = require('../models/Workout');

const getByUserID = async (user_id, completed = false, days = 0, past = null) => {
    let workout, msg;
    let success = false;

    try {
        if (days && past) { // Get past completed workouts from the last n days
            console.log("Get past workouts");
            workout = await Workout.find({ user_id: user_id, completed: true, date: { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) } }).exec();
            msg = `Found completed workout(s) for user with ID ${user_id} from the past ${days} days`;
        } else if (days && !past) { // Get future workouts that will happen in n days
            console.log("Get future workouts");
            workout = await Workout.find({ user_id: user_id, date: { $gte: new Date(Date.now() + days * 24 * 60 * 60 * 1000) } }).exec();
            msg = `Found future workout(s) for user with ID ${user_id} from the next ${days} days`;
        } else if (completed) { // Get completed workouts
            console.log("Get completed workouts");
            workout = await Workout.find({ user_id: user_id, completed: true }).exec();
            msg = `Found completed workout(s) for user with ID ${user_id}`;
        } else { // Get all workouts
            console.log("Get all workouts");
            workout = await Workout.find({ user_id: user_id }).exec();
            msg = `Found all workout(s) for user with ID ${user_id}`;
        }

        if (!workout) {
            msg = "Workout(s) not found";
        } else {
            success = true;
        }
    } catch (err) {
        msg = "Workout(s) not found";
    }

    return {
        workout,
        msg,
        success,
    };
}

const getWorkoutByID = async (id) => {
    let workout, msg;
    let success = false;

    try {
        workout = await Workout.findById(id).exec();

        if (!workout) {
            msg = `Failed to find workout with ID ${id}`;
        } else {
            success = true;
            msg = "Found workout";
        }
    } catch (err) {
        msg = `Failed to find workout with ID ${id}`;
    }

    return {
        workout,
        msg,
        success
    };
}

const createWorkout = async (workout_body) => {
    let workout, msg;
    let success = false;

    try {
        workout = new Workout(workout_body);

        const doc = await workout.save();

        if (!doc) {
            msg = `Failed to create new workout for user ID ${workout.user_id}`;
        } else {
            success = true;
            msg = `New workout for user with ID ${workout.user_id} created`;
        }
    } catch (err) {
        msg = `Failed to create new workout for user ID ${workout.user_id}`;
    }

    return {
        workout,
        msg,
        success,
    };
}

const updateWorkout = async (user_id, workout_id, update_fields) => {
    let workout, msg;
    let success = false;

    try {
        workout = await Workout.findOneAndUpdate({ _id: workout_id, user_id: user_id }, { $set: update_fields }, { new: true }).exec();

        if (!workout) {
            msg = `Failed to update workout with ID ${workout_id}`;
        } else {
            success = true;
            msg = `Workout with ID ${workout._id} updated`;
        }
    } catch (err) {
        msg = "Failed to update workout";
    }

    return {
        workout,
        msg,
        success,
    };
}

const deleteWorkout = async (user_id, workout_id) => {
    let workout, msg;
    let success = false;

    try {
        workout = await Workout.findOneAndDelete({ _id: workout_id, user_id: user_id }).exec()

        if (!workout) {
            msg = `Failed to delete workout with ID ${workout_id}`;
        } else {
            success = true;
            msg = `Workout with ID ${workout._id} deleted`;
        }
    } catch (err) {
        msg = `Failed to delete workout for user ID ${user_id}`;
    }

    return {
        workout,
        msg,
        success,
    };
}

module.exports = {
    getByUserID,
    getWorkoutByID,
    createWorkout,
    updateWorkout,
    deleteWorkout
}

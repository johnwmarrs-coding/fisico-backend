const Workout = require('../models/Workout');

const getByUserID = async (user_id) => {
    let workout, msg;
    let success = false;

    try {
        workout = await Workout.find({ user_id: user_id }).exec();

        if (!workout) {
            msg = "Workout(s) not found";
        } else {
            success = true;
            msg = `Found workout(s) for user ID ${user_id}`;
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

const getCompletedWorkoutsByUserID = async (user_id) => {
    let workout, msg;
    let success = false;

    try {
        workout = await Workout.find({ user_id: user_id, completed: true }).exec();

        if (!workout) {
            msg = "Workout(s) not found";
        } else {
            success = true;
            msg = `Found workout(s) for user ID ${user_id}`;
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
            msg = `New workout for user ID ${workout.user_id} created`;
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
            msg = "Failed to update workout";
        } else {
            success = true;
            msg = `Workout for user ID ${workout.user_id} updated`;
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
            msg = `Failed to delete workout for user ID ${user_id}`;
        } else {
            success = true;
            msg = `Workout for user ID ${workout.user_id} deleted`;
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

const getsyncstart = async (user_id) => {
    let workout, msg;
    let success = false;

    try {
        workout = await Workout.find({ user_id: user_id, date: {$lt: new Date(), $gt: new Date(new Date().getTime() - (24*60*60*1000*14))}}).exec();

        if (!workout) {
            msg = "Workout(s) not found in the last 14 days";
        } else {
            success = true;
            msg = `Found workout(s) for user ID ${user_id} but they did not meet criteria.`;
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

const getplannedahead = async (user_id) => {
    let workout, msg;
    let success = false;

    try {
        workout = await Workout.find({ user_id: user_id, date: {$lt: new Date(new Date().getTime() + (24*60*60*1000*14)), $gt: new Date()}}).exec();

        if (!workout) {
            msg = "Workout(s) not found in the next 14 days";
        } else {
            success = true;
            msg = `Found workout(s) for user ID ${user_id} but they did not meet criteria.`;
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


module.exports = {
    getByUserID,
    getCompletedWorkoutsByUserID,
    getWorkoutByID,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    getsyncstart,
    getplannedahead
}

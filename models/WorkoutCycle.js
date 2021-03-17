const mongoose = require('mongoose');

const WorkoutCycleSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    workout_cycle: { type: [mongoose.Schema.Types.ObjectId], ref: 'Workout' },
    start_date: Date
});

var WorkoutCycle = mongoose.model('WorkoutCycle', WorkoutCycleSchema);

module.exports = WorkoutCycle;

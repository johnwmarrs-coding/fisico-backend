const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    workout_type: { type: String, enum: ['Distance', 'Weight Lifting', 'Rest'] },
    date: Date,
    start_time: Date,
    plan: [mongoose.Schema.Types.Mixed],
    results: [mongoose.Schema.Types.Mixed]
});

var Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;

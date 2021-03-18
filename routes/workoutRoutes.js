const express = require('express');
const WorkoutController = require('../controllers/WorkoutController');
const router = express.Router();

// Get workout
router.get('/:user_id', async function (req, res, next) {

});

// Create workout
router.post('/', async function (req, res, next) {

});

// Update workout
router.put('/:user_id', async function (req, res, next) {

});

// Delete workout
router.delete('/user_id', async function (req, res, next) {

});

module.exports = router;

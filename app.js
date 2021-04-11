const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to db
const uri = "mongodb+srv://fisico:1234@fisico.pi8ot.mongodb.net/fisico-db?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function(err) {
  if (err) console.log(err);

  console.log("Connection successful");
});

// Import routes
const userRouter = require('./routes/userRoutes');
const tokenRouter = require('./routes/tokenRoutes');
const workoutRouter = require('./routes/workoutRoutes');
const workoutCycleRouter = require('./routes/workoutCycleRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/user', userRouter);
app.use('/token', tokenRouter);
app.use('/workout', workoutRouter);
app.use('/workoutCycle', workoutCycleRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

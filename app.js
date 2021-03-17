var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Connect to db
const uri = "mongodb+srv://fisico:1234@fisico.pi8ot.mongodb.net/fisico-db?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
  if (err) console.log(err);

  console.log("Connection successful");
});

// Import routes
var indexRouter = require('./routes/index'); // TODO: Remove later
// var usersRouter = require('./routes/users'); // TODO: Remove later
var userRouter = require('./routes/userRoutes');

var app = express();

// view engine setup // TODO: Remove later
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // TODO: Remove later
app.use('/user', userRouter);

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
// module.exports = User;
// module.exports = Token;
// module.exports = Workout;
// module.exports = WorkoutCycle;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var movieRouter=require("./routes/movies");

var app = express();

var swaggerUi = require('swagger-ui-express');
var swaggerdocumet = require('./swager.json')
//const swaggerJsDoc = require('swagger-jsdoc')//version 6.1.0
//const swaggerDocument = require('./swagger.json');
/*
var app = express();

var swaggerOptions = {
  swaggerDefinition: {
    info:{
      title :  'Movies Api document',
      description : 'Movie info',
      version : '1.0.0'
    }
  },
  apis:['app.js', './routes/movies.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  */
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerdocumet))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
//app.use('/users', usersRouter);
app.use('/movies',movieRouter);

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

//modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');
var cors = require('cors');
var bodyParser = require('body-parser');

//routes
var drinksRouter = require('/routes/drinks');

//express app
var app =  express();

//database setup
const connectionConfig = {
  host: process.env.MYSQL_HOST || 'sql',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'my-secret-pw',
  database: process.env.MYSQL_DATABASE || 'my_database'
}; 

let connection;

function connectToDatabase() {
  connection = mysql.createConnection(connectionConfig);

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
    } else {
      console.log('Connected to database.');
      clearInterval(intervalID);
    }
  });
}


let intervalID;
function checkDatabaseConnection() {
  if (connection && connection.state === 'authenticated') {
    clearInterval(intervalID);
    return;
  }
  
  connectToDatabase();
}

const interval = 5000; // 5 seconds
intervalID = setInterval(checkDatabaseConnection, interval);


//middleware for passing database connection to routes
app.use((req, res, next) => {
  req.dbConnection = connection;
  next(); 
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//some express stuff
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()) //use cors
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes calls
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html
});

//main routers calls
app.use('/drinks', drinksRouter);

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

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var api = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../dist')));

// define routes
app.use('/api', api);

// catch 404 and forward to angular2
app.use((req, res) => {
  console.log(`Redirecting Server 404 request: ${req.originalUrl}`);
  res.status(200).sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// error handler
app.use(function(err, req, res, next) {
  // only providing error details in development
  err = req.app.get('env') === 'development'
    ? { message: err.message, stack: err.stack }
    : { message: 'Internal Server Error' };

  // send error json
  res.json({ err: err });
});

module.exports = app;

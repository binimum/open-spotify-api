var express = require('express');

var indexRouter = require('./routes/index');
var spotifyRouter = require('./routes/spotify');
var songlinkRouter = require('./routes/songlink');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/spotify', spotifyRouter);
app.use('/songlink', songlinkRouter);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;

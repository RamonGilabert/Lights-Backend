var express = require('express');
var pg = require('pg');
var app = express();
var database = require('./app/database/schema.js');
var lights = require('./app/models/lights.js');

app.use(express.static(__dirname + '/public'));

app.set('bookshelf', database.bookshelf);
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.json({ message: 'Hello! Welcome to Lights.' });
});

app.get('/lights', function(request, response) {
  new Light().fetchAll().then(function() {
    console.log("SUP");
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var express = require('express');
var pg = require('pg');
var app = express();

var database = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex, public'
};

var knex = require('knex')(database);
var bookshelf = require('bookshelf')(knex);

app.use(express.static(__dirname + '/public'));

app.set('bookshelf', bookshelf);
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.json({ message: 'Hello! Welcome to Lights.' });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

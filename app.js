var express = require('express');
var pg = require('pg');
var app = express();
var databaseAddress = process.env.DATABASE_URL || 'postgres://localhost';
var bookshelf = require('./app/database/schema.js')(databaseAddress);

require('./app/routes/lights.js')(app, bookshelf);
require('./app/routes/controllers.js')(app, bookshelf);

app.use(express.static(__dirname + '/public'));

app.set('bookshelf', bookshelf);
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var express = require('express');
var pg = require('pg');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.json({ message: 'Hello! Welcome to Lights.' });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

pg.connect(process.env.DATABASE_URL, function(error, client) {
  if (error) throw error;
  
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

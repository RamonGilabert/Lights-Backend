var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

/* Define the routes */

router.get('/', function(req, res) {
    res.json({ message: "Welcome to the Lights API!" });
});

/* Use the routes */

app.use('/api', router);

app.listen(port);

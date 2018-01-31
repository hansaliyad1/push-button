const express       = require('express');
const path          = require('path');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const cors          = require('cors');

const app       = express();
const router    = express.Router();

// Require all routes into the application.
const index = require('./server/routes/index')(router);

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// Use all routes into the application.
app.use('/api', index);

// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

module.exports = app;

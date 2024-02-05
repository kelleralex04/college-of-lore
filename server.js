const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const app = express();
const s3Router = require('./s3upload.js')

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/checkToken'));
app.use('/api/users', require('./routes/api/users'));

const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/campaigns', ensureLoggedIn, require('./routes/api/campaigns'));
app.use('/api/categories', ensureLoggedIn, require('./routes/api/categories'));
app.use('/api/subjects', ensureLoggedIn, require('./routes/api/subjects'));
app.use('/api/notes', ensureLoggedIn, require('./routes/api/notes'));
app.use('/image', s3Router)

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;
	
app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});
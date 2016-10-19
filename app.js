"use strict";

var express = require('express');
var app = express();

app.set('view engine', 'pug');

var view = require('./view');
var api = require('./api');

app.use('/api', api());
app.use(view);

app.listen(3000, function() {
    console.log('File Server listening on port 3000');
});

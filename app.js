"use strict";

var express = require('express');
var app = express();

var api = require('./api');

app.use('/api', api());

app.listen(3000, function() {
    console.log('File Server listening on port 3000');
});

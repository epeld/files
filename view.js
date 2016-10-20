"use strict";

var express = require('express');
var router = express.Router();
var serveStatic = require('serve-static');
var pug = require('pug');

module.exports = router;

router.get('/', function(req, rep) {
    rep.render('index');
});

router.get('/partials/:name', function(req, rep) {
    rep.render('partials/' + req.params.name);
});

router.use('/public', serveStatic('./public'));

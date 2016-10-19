"use strict";

var express = require('express');
var bodyparser = require('body-parser');
var files = require('./files');

function api() {
    /*
     *  Router Setup
     */
    var router = express.Router();
    router.use(bodyparser.urlencoded({
	extended : true
    }));

    /*
     *  Commands
     */
    router.get('/ls', function(req, res) {
	res.json(files.readSubdir([req.query.path]));
    });

    router.get('/cat', function(req, res) {
	res.json(files.readFile([req.query.path]));
    });
    
    return router;
};

module.exports = api;

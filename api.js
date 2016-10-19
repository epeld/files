"use strict";

var express = require('express');
var bodyparser = require('body-parser');
var files = require('./files');

function api(baseDir) {
    baseDir = baseDir || './';

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
	res.json(files.readSubdir([baseDir, req.query.path], baseDir));
    });

    router.get('/cat', function(req, res) {
	res.json(files.readFile([baseDir, req.query.path], baseDir));
    });
    
    return router;
};

module.exports = api;

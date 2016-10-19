"use strict";

var p = require('path');
var fs = require('fs');
var _ = require('underscore');

function isBelowBasedir(path) {
    return !p.relative('', path).startsWith('..');
};

function resolvePath(components) {
    var path = p.resolve.apply(null, components);
    console.log('Resolved', path);
    if(!isBelowBasedir(path)) {
	throw 'Cannot access directories below basedir';
    }
    return path;
};


function statToObject(stat) {
    if(stat.isDirectory()) {
	return {
	    type : 'directory'
	};
    }
    else {
	return {
	    type : 'file'
	};
    }
};

function readSubdir(components) {
    var path = resolvePath(components);
    var files = fs.readdirSync(path);
    
    return _.map(files, function(file) {
	var absolute = p.join(path, file);
	var stat = fs.statSync(absolute);
	
	return _.extend({
	    name : file,
	    path : p.relative('', absolute)
	}, statToObject(stat));
    });
};

function readFile(components) {
    var path = resolvePath(components);
    return fs.readFileSync(path).toString();
};

module.exports = {
    readSubdir : readSubdir,
    readFile : readFile
};

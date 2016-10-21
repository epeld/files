"use strict";

var p = require('path');
var fs = require('fs');
var _ = require('underscore');

function isBelowBasedir(path, baseDir) {
    return !p.relative(baseDir, path).startsWith('..');
};

function resolvePath(components, baseDir) {
    baseDir = baseDir || './';
    var path = p.join.apply(null, components);
    console.log('Resolved', path);
    if(!isBelowBasedir(path, baseDir)) {
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

function readSubdir(components, baseDir) {
    var path = resolvePath(components, baseDir);
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

function readFile(components, baseDir) {
    var path = resolvePath(components, baseDir);
    return fs.readFileSync(path).toString();
};

module.exports = {
    readSubdir : readSubdir,
    readFile : readFile
};

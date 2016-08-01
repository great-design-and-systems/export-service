'use strict';
var CSV_DIR = process.env.CSV_DIR || 'csv';
var fs = require('node-fs');

function execute(callback) {
  fs.exists(CSV_DIR, function(exists) {
    if (!exists) {
      fs.mkdir(CSV_DIR, function(err) {
        console.error('get-directory', err);
        callback(undefined, CSV_DIR);
      });
    } else {
      callback(undefined, CSV_DIR);
    }
  });
}

module.exports = execute;
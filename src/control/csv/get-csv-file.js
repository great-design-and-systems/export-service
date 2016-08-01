'use strict';
var GetDirectory = require('./get-directory');
var path = require('path');

function execute(exportId, callback) {
  new GetDirectory(function(errDirectory, dir) {
    if (errDirectory) {
      callback(errDirectory);
    } else {
      callback(undefined, {
        path: path.join(dir, exportId + '.csv')
      });
    }
  });
}

module.exports = execute;
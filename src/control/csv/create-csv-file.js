'use strict';
var GetDirectory = require('./get-directory');
var fs = require('node-fs');
var path = require('path');

function execute(exportId, callback) {
  new GetDirectory(function(errDirectory, dir) {
    if (errDirectory) {
      callback(errDirectory);
    } else {
      var filePath = path.join(dir, exportId + '.csv');
      fs.writeFile(filePath, '', function(errCsvFile) {
        if (errCsvFile) {
          console.error('create-csv-file', errCsvFile);
          callback({
            message: 'Error creating csv file'
          });
        } else {
          callback(undefined, {
            path: filePath
          });
        }
      });
    }
  });
}
module.exports = execute;
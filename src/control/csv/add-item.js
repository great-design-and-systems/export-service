'use strict';
var GetCSVFile = require('./get-csv-file');
var CSVWriter = require('csv-write-stream');
var fs = require('node-fs');

function execute(exportId, data, callback) {
  new GetCSVFile(exportId, function (errCsvFile, csvPath) {
    if (errCsvFile) {
      console.error('add-item', errCsvFile);
      callback(errCsvFile);
    } else {
      try {
        var header = !fs.existsSync(csvPath.path);
        var writer = CSVWriter({ sendHeaders: header });
        writer.pipe(fs.createWriteStream(csvPath.path, { flags: 'a' }));
        writer.write(data);
        writer.end();
        callback(undefined, {
          path: csvPath,
          data: data
        });
      } catch (err) {
        console.error('add-item', err);
        callback({
          message: 'Error writing data ' + data
        });
      }
    }
  });
}

module.exports = execute;
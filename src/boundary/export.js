'use strict';
var CreateExportTracker = require('../control/create-export-tracker');
var CreateItemColumns = require('../control/create-item-columns');
var AddExportProgress = require('../control/add-export-progress');
var AddItemCSV = require('../control/csv/add-item');
var GetCSVFile = require('../control/csv/get-csv-file');
var fs = require('fs-extra');
module.exports = {
  createExportCSV: createExportCSV,
  addExportItemCSV: addExportItemCSV
};

function createExportCSV(description, limit, columns, callback) {
  new CreateExportTracker({
    description: description,
    type: 'csv_exporter',
    progressLimit: limit
  }, function (errCreateExport, resultCreateExport) {
    if (errCreateExport) {
      callback(errCreateExport);
    } else {
      new CreateItemColumns(resultCreateExport._id, columns, function (errCreateItemColumns) {
        if (errCreateItemColumns) {
          callback(errCreateItemColumns);
        } else {
          callback(undefined, {
            exportId: resultCreateExport._id
          });
        }
      });
    }
  });
}

function addExportItemCSV(exportId, item, callback) {
  new AddItemCSV(exportId, item, function (errAddItem) {
    if (errAddItem) {
      callback(errAddItem);
    } else {
      new AddExportProgress(exportId, function (errExportProgress, resultExportProgress) {
        if (errExportProgress) {
          callback(errExportProgress);
        } else {
          if (resultExportProgress.status === 'COMPLETED') {
            new GetCSVFile(exportId, function (errCSVFile, csvFilePath) {
              if (errCSVFile) {
                callback(errCSVFile);
              } else {
                resultExportProgress.stream = fs.createReadStream(csvFilePath.path);
                resultExportProgress.fileName = exportId + '.csv';
                resultExportProgress.removeFile = function () {
                  fs.remove(csvFilePath.path);
                };
                callback(undefined, resultExportProgress);
              }
            });
          } else {
            callback(undefined, resultExportProgress);
          }
        }
      });
    }
  });
}
'use strict';
var CreateExportTracker = require('../control/create-export-tracker');
var CreateItemColumns = require('../control/create-item-columns');
var CreateCSVFile = require('../control/csv/create-csv-file');
var AddExportProgress = require('../control/add-export-progress');
var AddItemCSV = require('../control/csv/add-item');
module.exports = {
  createExportCSV: createExportCSV,
  addExportItemCSV: addExportItemCSV
};

function createExportCSV(description, limit, columns, callback) {
  new CreateExportTracker({
    description: description,
    type: 'csv_exporter',
    progressLimit: limit
  }, function(errCreateExport, resultCreateExport) {
    if (errCreateExport) {
      callback(errCreateExport);
    } else {
      new CreateItemColumns(resultCreateExport._id, columns, function(errCreateItemColumns) {
        if (errCreateItemColumns) {
          callback(errCreateItemColumns);
        } else {
          new CreateCSVFile(resultCreateExport._id, function(errCreateCSVFile, tempFilePath) {
            if (errCreateCSVFile) {
              callback(errCreateCSVFile);
            } else {
              callback(undefined, {
                exportId: resultCreateExport._id,
                tempFile: tempFilePath.path
              });
            }
          });
        }
      });
    }
  });
}

function addExportItemCSV(exportId, item, callback) {
  new AddItemCSV(exportId, item, function(errAddItem) {
    if (errAddItem) {
      callback(errAddItem);
    } else {
      console.log('AddItemCSV');
      new AddExportProgress(exportId, function(errExportProgress, resultExportProgress) {
        if (errExportProgress) {
          callback(errExportProgress);
        } else {
          console.log('resultExportProgress', resultExportProgress);
          callback(undefined, resultExportProgress);
        }
      });
    }
  });
}
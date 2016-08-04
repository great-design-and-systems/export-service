'use strict';
var CreateExportTracker = require('../control/create-export-tracker');
var AddExportProgress = require('../control/add-export-progress');
var AddItemCSV = require('../control/csv/add-item');
var GetCSVFile = require('../control/csv/get-csv-file');
var fs = require('fs-extra');
var UpdateExportFileInfo = require('../control/csv/update-export-file-info');
var GetExportCompleted = require('../control/get-export-completed');
var GetExportInProgress = require('../control/get-export-inprogress');
var RemoveExportTrackerById = require('../control/remove-export-tracker-by-id');
var RemoveCompletedTracker = require('../control/remove-completed-tracker');
var FailExportTracker = require('../control/fail-export-tracker');
module.exports = {
  createExportCSV: createExportCSV,
  addExportItemCSV: addExportItemCSV,
  updateExportCSVFileInfo: updateExportCSVFileInfo,
  getExportCompleted: getExportCompleted,
  getExportInProgress: getExportInProgress,
  removeExportTrackerById: removeExportTrackerById,
  removeCompletedExportTracker: removeCompletedExportTracker,
  failExportTracker: failExportTracker
};

function createExportCSV(description, limit, callback) {
  new CreateExportTracker({
    description: description,
    type: 'csv_exporter',
    progressLimit: limit
  }, function (errCreateExport, resultCreateExport) {
    if (errCreateExport) {
      callback(errCreateExport);
    } else {
      callback(undefined, {
        exportId: resultCreateExport._id
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
                resultExportProgress.stream.on('end', function () {
                  fs.remove(csvFilePath.path);
                });
                fs.stat(csvFilePath.path, function (errStat, fileStat) {
                  if (errStat) {
                    callback({
                      message: 'Error getting file status.'
                    });
                  } else {
                    resultExportProgress.fileSize = fileStat.size;
                    callback(undefined, resultExportProgress);
                  }
                });
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

function updateExportCSVFileInfo(exportId, fileId, callback) {
  new UpdateExportFileInfo(exportId, fileId, function (err, result) {
    if (err) {
      callback(err);
    } else {
      callback(undefined, result);
    }
  });
}

function getExportCompleted(callback) {
  new GetExportCompleted(callback);
}

function getExportInProgress(callback) {
  new GetExportInProgress(callback);
}

function removeExportTrackerById(exportId, callback) {
  new RemoveExportTrackerById(exportId, function (err, result) {
    if (err) {
      callback(err);
    } else {
      callback(undefined, result);
    }
  });
}

function removeCompletedExportTracker(callback) {
  new RemoveCompletedTracker(function (err, result) {
    if (err) {
      callback(err);
    } else {
      callback(undefined, result);
    }
  });
}

function failExportTracker(exportId, callback) {
  new FailExportTracker(exportId, callback);
}
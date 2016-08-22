'use strict';
var ExportTracker = require('../entity/export-tracker');
var logger = require('./get-logger');

function execute(exportId, callback) {
  ExportTracker.findById(exportId, function (errExportTracker, exportTracker) {
    if (errExportTracker) {
    	logger.error('add-export-progress', errExportTracker);
      callback({
        message: 'Error finding exportId ' + exportId
      });
    } else {
      if (exportTracker.progressCount < exportTracker.progressLimit) {
        exportTracker.progressCount++;
        if (exportTracker.progressCount === 1) {
          exportTracker.status = 'INPROGRESS';
        }
        if (exportTracker.progressCount === exportTracker.progressLimit) {
          exportTracker.status = 'COMPLETED';
        }
      }
      ExportTracker.update({
        _id: exportId
      }, exportTracker, function (errUpdateTracker, updatedTracker) {
        if (errUpdateTracker) {
          logger.error('add-export-progress', errUpdateTracker);
          callback({
            message: 'Error updating exportId ' + exportId
          });
        } else {
          updatedTracker.status = exportTracker.status;
          updatedTracker.progressCount = exportTracker.progressCount;
          callback(undefined, updatedTracker);
        }
      });
    }
  });
}

module.exports = execute;
'use strict';
var ExportTracker = require('../entity/export-tracker');

function execute(exportId, callback) {
  ExportTracker.findById(exportId, function (errExportTracker, exportTracker) {
    if (errExportTracker) {
      console.error('add-export-progress', errExportTracker);
      callback({
        message: 'Error finding exportId ' + exportId
      });
    } else {
      if (exportTracker.progressCount < exportTracker.progressLimit) {
        exportTracker.progressCount++;
        if (exportTracker.progressCount === 1) {
          exportTracker.status = 'INPROGRESS';
        } else if (exportTracker.progressCount === exportTracker.progressLimit) {
          exportTracker.status = 'COMPLETED';
        }
      }
      ExportTracker.update({
        _id: exportId
      }, exportTracker, function (errUpdateTracker, updatedTracker) {
        if (errUpdateTracker) {
          console.error('add-export-progress', errUpdateTracker);
          callback({
            message: 'Error updating exportId ' + exportId
          });
        } else {
          updatedTracker.status = exportTracker.status;
          updatedTracker.processCount = exportTracker.processCount;
          callback(undefined, updatedTracker);
        }
      });
    }
  });
}

module.exports = execute;
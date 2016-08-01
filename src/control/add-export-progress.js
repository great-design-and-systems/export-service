'use strict';
var ExportTracker = require('../entity/export-tracker');

function execute(exportId, callback) {
  ExportTracker.findById(exportId, function(errExportTracker, exportTracker) {
    if (errExportTracker) {
      console.error('add-export-progress', errExportTracker);
      callback({
        message: 'Error finding exportId ' + exportId
      });
    } else {
      exportTracker.progressCount++;
      ExportTracker.findOneAndUpdate({
        _id: exportId
      }, exportTracker, function(errUpdateTracker, updatedTracker) {
        if (errUpdateTracker) {
          console.error('add-export-progress', errUpdateTracker);
          callback({
            message: 'Error updating exportId ' + exportId
          });
        } else {
          callback(undefined, updatedTracker);
        }
      });
    }
  });
}

module.exports = execute;
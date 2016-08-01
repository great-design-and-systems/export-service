'use strict';
var CreateExportTracker = require('../control/create-export-tracker');
module.exports = {
  createExport: createExport
};

function createExport(description, type, limit, callback) {
  new CreateExportTracker({
    description: description,
    type: type,
    progressLimit: limit
  }, function(errCreateExport, resultCreateExport) {
    if (errCreateExport) {
      callback(errCreateExport);
    } else {
      callback(undefined, {
        exportId: resultCreateExport._id
      });
    }
  });
}
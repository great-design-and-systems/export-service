'use strict';
var CreateExportTracker = require('../control/create-export-tracker');
var CreateItemColumns = require('../control/create-item-columns');
module.exports = {
  createExportCSV: createExportCSV
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
          callback(undefined, {
            exportId: resultCreateExport._id
          });
        }
      });
    }
  });
}
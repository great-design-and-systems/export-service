'use strict';
var ExportItemColumn = require('../entity/export-item-column');

function execute(exportId, columns, callback) {
  ExportItemColumn.create({
    exportId: exportId,
    columns: columns
  }, function(err, createdTrackerItemColumns) {
    if (err) {
      console.error('create-item-columns', err);
      callback({
        message: 'Failed creating new export item columns.'
      });
    } else {
      callback(undefined, createdTrackerItemColumns);
    }
  });
}

module.exports = execute;
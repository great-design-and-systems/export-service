'use strict';
var ExportTracker = require('../../entity/export-tracker');

function execute(exportId, fileId, callback) {
    ExportTracker.findById(exportId, function (errExportTracker, exportTracker) {
        if (errExportTracker) {
            console.error('update-export-file', errExportTracker);
            callback({
                message: 'Error finding exportId ' + exportId
            });
        } else {
            exportTracker.fileId = fileId;
            ExportTracker.update({
                _id: exportId
            }, exportTracker, function (errUpdateTracker, updatedTracker) {
                if (errUpdateTracker) {
                    console.error('update-export-file', errUpdateTracker);
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
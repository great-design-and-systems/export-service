'use strict';
var ExportTracker = require('../entity/export-tracker');

function execute(exportId, callback) {
    ExportTracker.findByIdAndRemove(exportId, function (err, exportTracker) {
        if (err) {
            console.error('remove-export-tracker-by-id', err);
            callback({
                message: 'Failed to remove export tracker.'
            });
        } else {
            callback(undefined, {
                message: 'Export ' + exportId + ' has been removed.',
                fileId: exportTracker.fileId
            });
        }
    });
}

module.exports = execute;

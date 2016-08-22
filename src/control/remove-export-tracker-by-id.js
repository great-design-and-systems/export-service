'use strict';
var ExportTracker = require('../entity/export-tracker');
var logger = require('./get-logger');

function execute(exportId, callback) {
    ExportTracker.findByIdAndRemove(exportId, function (err, exportTracker) {
        if (err) {
        	logger.error('remove-export-tracker-by-id', err);
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

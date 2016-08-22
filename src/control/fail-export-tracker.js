'use strict';
var ExportTracker = require('../entity/export-tracker');
var logger = require('./get-logger');

function execute(exportId, callback) {
    ExportTracker.findById(exportId, function (errExportTracker, exportTracker) {
        if (errExportTracker) {
            logger.error('fail-export-tracker', errExportTracker);
            callback({
                message: 'Error finding exportId ' + exportId
            });
        } else {
           exportTracker.status = 'FAILED';
            ExportTracker.update({
                _id: exportId
            }, exportTracker, function (errUpdateTracker, updatedTracker) {
                if (errUpdateTracker) {
                    logger.error('fail-export-tracker', errUpdateTracker);
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
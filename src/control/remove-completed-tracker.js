'use strict';
var ExportTracker = require('../entity/export-tracker');

function execute(callback) {
    ExportTracker.remove({ status: 'COMPLETED' }, function (err) {
        if (err) {
            console.error('remove-completed-tracker', err);
            callback({
                message: 'Failed to remove completed tracker.'
            });
        } else {
            callback(undefined, {
                message: 'All completed export has been removed.'
            });
        }
    });
}

module.exports = execute;
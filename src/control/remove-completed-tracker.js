'use strict';
var ExportTracker = require('../entity/export-tracker');
var logger = require('./get-logger');

function execute(callback) {
    ExportTracker.remove({ status: 'COMPLETED' }, function (err) {
        if (err) {
            logger.error('remove-completed-tracker', err);
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
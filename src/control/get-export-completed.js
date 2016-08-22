'use strict';
var ExportTracker = require('../entity/export-tracker');
var logger = require('./get-logger');

function execute(callback) {
    ExportTracker.find()
        .where('status').equals('COMPLETED')
        .sort('-createdOn')
        .exec(function (err, data) {
            if (err) {
                logger.error('get-export-completed', err);
                callback({
                    message: 'Failed to get export completed'
                });
            } else {
                callback(undefined, data);
            }
        });
}

module.exports = execute;
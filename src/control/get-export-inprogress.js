'use strict';
var ExportTracker = require('../entity/export-tracker');
var logger = require('./get-logger');

function execute(callback) {
    ExportTracker.find()
        .where('status').equals('INPROGRESS')
        .sort('-createdOn')
        .exec(function (err, data) {
            if (err) {
                logger.error('get-export-inprogress', err);
                callback({
                    message: 'Failed to get export in progress'
                });
            } else {
                callback(undefined, data);
            }
        });
}

module.exports = execute;
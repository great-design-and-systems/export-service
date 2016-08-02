'use strict';
var ExportTracker = require('../entity/export-tracker');

function execute(callback) {
    ExportTracker.find()
        .where('status').equals('COMPLETED')
        .sort('-createdOn')
        .exec(function (err, data) {
            if (err) {
                console.error('get-export-completed', err);
                callback({
                    message: 'Failed to get export completed'
                });
            } else {
                callback(undefined, data);
            }
        });
}

module.exports = execute;
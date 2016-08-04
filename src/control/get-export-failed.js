'use strict';
var ExportTracker = require('../entity/export-tracker');

function execute(callback) {
    ExportTracker.find()
        .where('status').equals('FAILED')
        .sort('-createdOn')
        .exec(function (err, data) {
            if (err) {
                console.error('get-export-failed', err);
                callback({
                    message: 'Failed to get export failed'
                });
            } else {
                callback(undefined, data);
            }
        });
}

module.exports = execute;
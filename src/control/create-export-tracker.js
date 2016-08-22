'use strict';
var ExportTracker = require('../entity/export-tracker');
var logger = require('./get-logger');

function execute(trackerData, callback) {
  ExportTracker.create(trackerData, function(err, createdTracker) {
    if (err) {
      logger.error('create-export-tracker', err);
      callback({
        message: 'Failed creating new export tracker.'
      });
    } else {
      callback(undefined, createdTracker);
    }
  });
}

module.exports = execute;
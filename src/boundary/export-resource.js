'use strict';
var API = process.env.API_NAME || '/api/export/';
var Export = require('./export');
module.exports = function (app) {
  app.post(API + 'create-export-csv', function (req, res) {
    Export.createExportCSV(req.body.description,
      req.body.limit,
      function (err, result) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send({
            message: 'Export tracker is created with id: ' + result.exportId,
            exportId: result.exportId,
            links: {
              put: {
                addExportItemCSV: 'http://' + req.headers.host + API + 'add-export-item-csv/' + result.exportId,
                updateExportCSVFileInfo: 'http://' + req.headers.host + API + 'update-export-csv-file-info/' + result.exportId
              }
            }
          });
        }
      });
  });

  app.put(API + 'add-export-item-csv/:exportId', function (req, res) {
    Export.addExportItemCSV(req.params.exportId, req.body, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.status === 'COMPLETED') {
          res.setHeader('Content-type', 'text/csv');
          res.setHeader('Content-length', result.fileSize);
          result.stream.pipe(res);
        } else {
          res.status(200).send(result);
        }
      }
    });
  });

  app.put(API + 'update-export-csv-file-info/:exportId', function (req, res) {
    Export.updateExportCSVFileInfo(req.params.exportId, req.body.fileId, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  app.get(API + 'get-export-completed', function (req, res) {
    Export.getExportCompleted(function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  app.get(API + 'get-export-inprogress', function (req, res) {
    Export.getExportInProgress(function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  app.delete(API + ':exportId', function (req, res) {
    Export.removeExportTrackerById(req.params.exportId, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  app.delete(API + 'all/completed-export-tracker', function (req, res) {
    Export.removeCompletedExportTracker(function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  app.put(API + 'fail-export-tracker/:exportId', function (req, res) {
    Export.failExportTracker(req.params.exportId, function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    })
  });

  app.get('/', function (req, res) {
    res.status(200).send({
      domain: process.env.DOMAIN_NAME || 'Export',
      links: {
        post: {
          createExportCSV: 'http://' + req.headers.host + API + 'create-export-csv',
        },
        put: {
          addExportItemCSV: 'http://' + req.headers.host + API + 'add-export-item-csv/{exportId}',
          updateExportCSVFileInfo: 'http://' + req.headers.host + API + 'update-export-csv-file-info/{exportId}',
          failExportTracker: 'http://' + req.headers.host + API + 'fail-export-tracker/{exportId}'
        },
        get: {
          getExportCompleted: 'http://' + req.headers.host + API + 'get-export-completed',
          getExportInProgress: 'http://' + req.headers.host + API + 'get-export-inprogress'
        },
        delete: {
          removeExportTrackerById: 'http://' + req.headers.host + API + '{exportId}',
          removeCompletedExportTracker: 'http://' + req.headers.host + API + 'completed-export-tracker'
        }
      }
    });
  });

};
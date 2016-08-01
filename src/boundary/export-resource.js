'use strict';
var API = process.env.API_NAME || '/api/export/';
var Export = require('./export');
module.exports = function (app) {
  app.post(API + 'create-export-csv', function (req, res) {
    Export.createExportCSV(req.body.description,
      req.body.limit, req.body.columns,
      function (err, result) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send({
            message: 'Export tracker is created with id: ' + result.exportId,
            links: {
              put: {
                addExportItemCSV: 'http://' + req.headers.host + API + 'add-export-item-csv/' + result.exportId
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
          result.stream.on('end', function () {
            result.removeFile();
          });
          result.stream.pipe(res);
        } else {
          res.status(200).send(result);
        }
      }
    });
  });
};
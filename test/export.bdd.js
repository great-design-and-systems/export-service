(function() {
  'use strict';
  var Export = require('../src/boundary/export');
  var Database = require('./config/database');
  var sinon = require('sinon');
  var chai = require('chai');
  var expect = chai.expect;
  var fs = require('node-fs');
  describe('Export Service BDD', function() {
    var db = new Database();

    beforeEach(function(done) {
      return db.connect(done);
    });

    describe('GIVEN: I have export tracker info', function() {

      var exportTracker = {};

      beforeEach(function() {
        exportTracker.description = 'Smple tracker 1';
        exportTracker.progressLimit = 10;
        exportTracker.columns = ['when', 'fullname'];
      });

      describe('WHEN: creating new export csv', function() {
        var createdExportId;
        var tempFile;
        beforeEach(function(done) {
          Export.createExportCSV(exportTracker.description, exportTracker.progressLimit, exportTracker.columns, function(err, result) {
            if (err) {
              console.error('Creating new export', err);
            }
            createdExportId = result.exportId;
            tempFile = result.tempFile;
            done();
          });
        });
        it('THEN: export tracker is created', function() {
          expect(createdExportId).to.not.be.null;
        });
        it('THEN: export {exportId}.csv file is created', function() {
          expect(fs.existsSync(tempFile)).to.be.true;
        });


        describe('GIVEN: I have export items', function() {
          var data;
          beforeEach(function() {
            data = [];
            data.push({
              when: 123456789,
              fullname: 'Jerico Pogi'
            });
            data.push({
              when: 1234234789,
              fullname: 'Nica Bebe'
            });
          });
          describe('WHEN: adding export item csv', function() {
            var addExportResult1st;
            beforeEach(function(done) {
              Export.addExportItemCSV(createdExportId, data[0], function(err, result) {
                addExportResult1st = result;
                done();
              });
            });
            it('THEN: export tracker count is incremented', function() {
             
            });
          });
        });
      });

    });

    afterEach(function(done) {
      return db.disconnect(done);
    });
  });
})();
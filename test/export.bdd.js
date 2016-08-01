(function() {
  'use strict';
  var Export = require('../src/boundary/export');
  var Database = require('./config/database');
  var sinon = require('sinon');
  var chai = require('chai');
  var expect = chai.expect;
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
        beforeEach(function(done) {
          Export.createExportCSV(exportTracker.description, exportTracker.progressLimit, exportTracker.columns, function(err, result) {
            if (err) {
              console.error('Creating new export', err);
            }
            createdExportId = result.exportId;
            done();
          });
        });

        it('THEN: export tracker is created', function() {
          expect(createdExportId).to.not.be.null;
        });
      });

    });

    afterEach(function(done) {
      return db.disconnect(done);
    });
  });
})();
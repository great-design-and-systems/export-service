(function () {
  'use strict';
  var Export = require('../src/boundary/export');
  var Database = require('./config/database');
  var sinon = require('sinon');
  var chai = require('chai');
  var expect = chai.expect;
  var fs = require('fs-extra');
  describe('Export Service BDD', function () {
    var db = new Database();

    beforeEach(function (done) {
      return db.connect(done);
    });

    describe('GIVEN: I have export tracker info', function () {

      var exportTracker = {};

      beforeEach(function () {
        exportTracker.description = 'Smple tracker 1';
        exportTracker.progressLimit = 2;
        exportTracker.columns = ['when', 'fullname'];
      });

      describe('WHEN: creating new export csv', function () {
        var createdExportId;
        beforeEach(function (done) {
          Export.createExportCSV(exportTracker.description, exportTracker.progressLimit, exportTracker.columns, function (err, result) {
            if (err) {
              console.error('Creating new export', err);
            }
            createdExportId = result.exportId;
            done();
          });
        });
        it('THEN: export tracker is created', function () {
          expect(createdExportId).to.not.be.null;
        });
        describe('GIVEN: I have export items', function () {
          var data;
          beforeEach(function () {
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
          describe('WHEN: adding export item csv', function () {
            var addExportResult1st;
            beforeEach(function (done) {
              Export.addExportItemCSV(createdExportId, data[0], function (err, result) {
                addExportResult1st = result;
                done();
              });
            });

            it('THEN: export tracker count is incremented', function () {
              expect(addExportResult1st.nModified === 1).to.be.true;
            });

            describe('WHEN: adding another export item csv', function () {
              var addExportResult2nd;
              beforeEach(function (done) {
                Export.addExportItemCSV(createdExportId, data[1], function (err, result) {
                  addExportResult2nd = result;
                  done();
                });
              });
              it('THEN: export tracker is completed', function () {
                expect(addExportResult2nd.status === 'COMPLETED').to.be.true;
              });
            });
            describe('GIVEN: I have uploaded file ID', function () {
              var fileID;
              beforeEach(function () {
                fileID = '00001';
              });
              describe('WHEN: updating export csv info', function () {
                var fileInfoResult;
                beforeEach(function (done) {
                  Export.updateExportCSVFileInfo(createdExportId, fileID, function (err, result) {
                    fileInfoResult = result;
                    done();
                  });
                });
                it('THEN: export tracker fileID is updated', function () {
                  expect(fileInfoResult.ok === 1).to.be.true;
                });
              });
            });
          });
        });
      });
    });

    afterEach(function (done) {
      fs.remove('csv', function (err) {
        if (err) {
          console.error('afterEach', err);
        }
        db.disconnect(done);
      });
    });
  });
})();
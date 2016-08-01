(function () {
    'use strict';
    var File = require('../src/boundary/file');
    var Database = require('./config/database');
    var sinon = require('sinon');
    var chai = require('chai');
    var expect = chai.expect;
    describe('File Service BDD', function () {
        var db = new Database();

        beforeEach(function (done) {
            return db.connect(done);
        });

        afterEach(function (done) {
            return db.disconnect(done);
        });
    });
})();
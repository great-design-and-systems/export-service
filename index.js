var Database = require('./src/config/database');
var Server = require('./src/config/server');
var LoggerServer = require('./src/config/logger-server');
var express = require('express');
var app = express();
var http = require('http');
var ExportResource = require('./src/boundary/export-resource');
(function () {
    new Database();
    new Server(app);
    new LoggerServer(app);
    new ExportResource(app);
})();

module.exports = app;

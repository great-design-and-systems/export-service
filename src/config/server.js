'use strict';
var bodyParser = require('body-parser');
var morgan = require('morgan');
var ENV = process.env.APP_ENV || 'dev';
var PORT = process.env.PORT || '3005';
var UPLOAD_LIMIT = process.env.UPLOAD_LIMIT || '4000kb';
module.exports = function (app) {
    app.set('port', PORT);
    app.use(morgan(ENV));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.raw({
        limit: UPLOAD_LIMIT
    }));
    app.use(bodyParser.json({
        type: 'application/vnd.api+json'
    }));
    app.listen(app.get('port'), function () {
        console.log('Node app is running on port', app.get('port'));
    });
};
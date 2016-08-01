'use strict';
var mongoose = require('mongoose');
var exportTrackerSchema = new mongoose.Schema({
    description: {type: String, required: [true, 'Description is required']},
    status: {type: String, default: 'NEW', enum: ['NEW', 'STARTED', 'INPROGRESS', 'CANCELLED', 'COMPLETED']},
    progressCount: {type: Number, default: 0},
    progressLimit: {type: String, required: [true, 'Progress limit is required.']},
    updatedOn: Date,
    type: String,
    fileId: String,
    createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ExportTracker', exportTrackerSchema);
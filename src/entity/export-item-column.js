'use strict';
var mongoose = require('mongoose');
var exportItemColumnSchema = new mongoose.Schema({
  exportId: {
    type: String,
    required: [true, 'Export ID is required']
  },
  columns: {
    type: Array,
    required: [true, 'Columns for export are required']
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ExportItemColumn', exportItemColumnSchema);
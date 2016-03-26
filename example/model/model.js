"use strict";

let model = [
  {
    name: 'code',
    mapping: 'id',
    convert: function () {
      return 1;
    },
    value: 4
  },
  {
    name: 'name',
    mapping: 'code'
  },
  {
    name: 'taskId',
    mapping: 'jobId'
  },
  {
    name: 'taskName',
    mapping: 'jobName'
  }
];

module.exports = model;

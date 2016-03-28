"use strict";

var model = [
  {
    name: 'code',
    mapping: 'id',
    value: 4,
    convert: function (val) {
      return val + 1;
    }
  },
  {
    name: 'name',
    value: 'yyl',
    convert: function (val, obj) {
      return val + ' ' + obj.taskId;
    }
  },
  {
    name: 'taskId',
    mapping: 'jobId',
    convert: function (val, obj) {
      return Math.random();
    }
  },
  {
    name: 'taskName',
    mapping: 'jobName'
  }
];

module.exports = model;

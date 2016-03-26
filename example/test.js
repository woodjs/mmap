var MMap = require('../src/es5/mmap');
var model = require('./model/model');

var data = [
  {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
  {id: 2, app: 2, name: 'abc13', jobId: '1233', jobName: 'dddfdd'}
];


console.log(MMap.mapping(model, data));

var MMap = require('../src/es5/mmap');
var model = require('./model/model');

var data = {
  abc: {
    ddd: [
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: {aa: 1, bb: 2}},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: 'dddd'},
    ]
  }
};

var mmap = new MMap({root: '*.abc.ddd'});

console.log(mmap);

console.log(mmap.mapping(model, data));

var MMap = require('../src/es5/mmap');
var expect = require('chai').expect;

var data = {
  abc: {
    ddd: [
      {id: 1, app: 2, name: 'abc', jobId: '123', jobName: {aa: 1, bb: 2}}
    ]
  }
};

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
    value: 'yyl'
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


describe('测试mmap es5部分', function () {
    it('mmap es5 测试用例', function () {

      var mmap = new MMap({root: '*.abc.ddd'});
      var result = [{
        code: 5,
        name: 'yyl',
        taskId: '123',
        taskName: {aa: 1, bb: 2}
      }];

      expect(mmap.mapping(model, data)).to.be.deep.equal(result);

    });
});

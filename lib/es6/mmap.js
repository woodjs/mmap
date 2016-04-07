'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MMap = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MMap = exports.MMap = function () {
  function MMap(configMap) {
    _classCallCheck(this, MMap);

    this.configMap = configMap && (typeof configMap === 'undefined' ? 'undefined' : _typeof(configMap)) === 'object' ? configMap : {};
  }

  _createClass(MMap, [{
    key: 'mapping',
    value: function mapping(model, data) {

      if (!model || data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') return data;

      var modelMap = reorganizeModel(model);

      if (!this.configMap.root) return mappingData(modelMap, data);

      var keyList = this.configMap.root.split('.');

      if (keyList[0] !== '*') return mappingData(modelMap, data);

      try {

        return mappingData(modelMap, MMap.getObj(data, keyList.slice(1)));
      } catch (e) {

        return mappingData(modelMap, data);
      }
    }
  }], [{
    key: 'getObj',
    value: function getObj(obj, keyList) {

      if (keyList.length === 0) return obj;

      if (keyList.length > 0) {

        var key = keyList.shift();

        if (key in obj) {

          var curObj = obj[key];

          return MMap.getObj(curObj, keyList);
        } else {

          return new Error({
            message: 'MMap未找到匹配对象！'
          });
        }
      }
    }
  }]);

  return MMap;
}();

/**
 * 重构原始model
 *
 * @param {Object} model
 * @return {Object}
 */


function reorganizeModel(model) {

  if (!_utils2.default.isArray(model)) return {};

  var modelMap = {
    nameMap: {},
    mappingMap: {},
    valueMap: {},
    convertMap: {}
  };

  for (var i = 0; i < model.length; i++) {

    var temp = model[i];

    if (!('name' in temp)) continue;

    modelMap.nameMap[temp['name']] = true;

    if ('mapping' in temp) modelMap.mappingMap[temp['mapping']] = temp['name'];

    if ('convert' in temp) modelMap.convertMap[temp['name']] = temp['convert'];

    if ('value' in temp) modelMap.valueMap[temp['name']] = temp['value'];
  }

  return modelMap;
}

/**
 * 映射数据
 *
 * @param {Object} modelMap
 */
function mappingData(modelMap, data) {

  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') return data;

  if (_utils2.default.isArray(data)) {

    var result = [];

    for (var i = 0; i < data.length; i++) {

      result.push(rebuildObj(modelMap, data[i]));
    }

    return result;
  } else {

    return rebuildObj(modelMap, data);
  }
}

/**
 * 重构对象
 *
 * @param {Object} modelMap
 * @param {Object} obj
 * @return {Object}
 */
function rebuildObj(modelMap, obj) {

  var result = {};

  if (modelMap.mappingMap) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

      for (var _iterator = Object.keys(modelMap.mappingMap)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var originKey = _step.value;


        var targetKey = modelMap.mappingMap[originKey];

        if (originKey in obj) obj[targetKey] = obj[originKey];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  if (modelMap.valueMap) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {

      for (var _iterator2 = Object.keys(modelMap.valueMap)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;


        var value = modelMap.valueMap[key];

        obj[key] = value;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  if (modelMap.convertMap) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {

      for (var _iterator3 = Object.keys(modelMap.convertMap)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _key = _step3.value;


        var fn = modelMap.convertMap[_key];

        if (typeof fn !== 'function') continue;

        obj[_key] = fn(obj[_key], obj);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  if (modelMap.nameMap) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {

      for (var _iterator4 = Object.keys(modelMap.nameMap)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _key2 = _step4.value;


        result[_key2] = obj[_key2];
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }

  return result;
}
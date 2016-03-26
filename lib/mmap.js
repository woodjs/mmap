'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MMap = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils).utils;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MMap = exports.MMap = function () {
  function MMap() {
    _classCallCheck(this, MMap);
  }

  _createClass(MMap, null, [{
    key: 'mapping',
    value: function mapping(model, data) {

      if (!model) return data;

      if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {

        var modelMap = reorganizeModel(model);

        return mappingData(modelMap, data);
      } else {

        return data;
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

  if (!utils.isArray(model)) return {};

  var modelMap = {
    nameMap: {},
    mappingMap: {},
    convertMap: {},
    valueMap: {}
  };

  for (var i = 0; i < model.length; i++) {

    var temp = modle[i];

    if (!('name' in temp)) continue;

    modelMap.nameMap[temp['name']] = true;

    if ('mapping' in temp) {

      modelMap.mappingMap[temp['mapping']] = temp['name'];
    }

    if ('convert' in temp) {

      modelMap.convertMap[temp['name']] = temp['convert'];
    }

    if ('value' in temp) {

      modelMap.valueMap[temp['name']] = temp['value'];
    }
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

  if (utils.isArray(data)) {

    var result = [];

    for (var i = 0; i < data.length; i++) {

      result.push(rebuildObj(modelMap, data[i]));
    }
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

  var clonedObj = Object.create(obj);
  var result = {};

  if (modelMap.mappingMap) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

      for (var _iterator = modelMap.mappingMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _step.value;
        var orginPropName = _step$value.orginPropName;
        var targetPropName = _step$value.targetPropName;


        if (orginPropName in obj) {

          obj[targetPropName] = obj[originPropName];
        }
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

  if (modelMap.convertMap) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {

      for (var _iterator2 = modelMap.convertMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _step2.value;
        var targetPropName = _step2$value.targetPropName;
        var fn = _step2$value.fn;


        if (typeof fn !== 'funciton') continue;

        obj[targetPropName] = fn(obj[targetPropName], obj);
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

  if (modelMap.valueMap) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {

      for (var _iterator3 = modelMap.valueMap[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _step3$value = _step3.value;
        var targetPropName = _step3$value.targetPropName;
        var value = _step3$value.value;


        obj[targetPropName] = value;
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

      for (var _iterator4 = nameMap.keys()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var targetPropName = _step4.value.targetPropName;


        result[targetPropName] = obj[targetPropName];
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
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MMap = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var utils = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MMap = exports.MMap = function () {
	  function MMap() {
	    _classCallCheck(this, MMap);
	  }

	  _createClass(MMap, [{
	    key: 'construct',
	    value: function construct(configMap) {

	      if (configMap && (typeof configMap === 'undefined' ? 'undefined' : _typeof(configMap)) === 'object') {

	        this.configMap = configMap;
	      }
	    }
	  }, {
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
	    value: function (_getObj) {
	      function getObj(_x, _x2) {
	        return _getObj.apply(this, arguments);
	      }

	      getObj.toString = function () {
	        return _getObj.toString();
	      };

	      return getObj;
	    }(function (obj, keyList) {

	      if (keyList.length === 0) return obj;

	      if (keyList.length > 0) {

	        var key = keyList.shift();

	        if (key in obj) {

	          var curObj = obj[key];

	          return getObj(curObj, keyList);
	        } else {

	          return new Error({
	            message: 'MMap未找到匹配对象！'
	          });
	        }
	      }
	    })
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

	  if (utils.isArray(data)) {

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

	      for (var _iterator = modelMap.mappingMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var _step$value = _step.value;
	        var originKey = _step$value.originKey;
	        var targetKey = _step$value.targetKey;


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

	      for (var _iterator2 = modelMap.valueMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var _step2$value = _step2.value;
	        var key = _step2$value.key;
	        var value = _step2$value.value;


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

	      for (var _iterator3 = modelMap.convertMap[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	        var _step3$value = _step3.value;
	        var key = _step3$value.key;
	        var fn = _step3$value.fn;


	        if (typeof fn !== 'function') continue;

	        obj[key] = fn(obj[key], obj);
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

	      for (var _iterator4 = modelMap.nameMap.keys()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	        var key = _step4.value.key;


	        result[key] = obj[key];
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var utils = exports.utils = function () {
	  function utils() {
	    _classCallCheck(this, utils);
	  }

	  _createClass(utils, null, [{
	    key: 'isArray',
	    value: function isArray(obj) {

	      var toString = {}.toString;

	      return toString.apply(obj) === '[object Array]';
	    }
	  }]);

	  return utils;
	}();

/***/ }
/******/ ]);
"use strict";

function MMap(configMap) {

  var me = this;

  this.configMap = {};

  this.mapping = function (model, data) {

    if (!model || data && typeof data !== 'object') return data;

    var modelMap = reorganizeModel(model);

    if (!this.configMap.root) return mappingData(modelMap, data);

    var keyList = this.configMap.root.split('.');

    if (keyList[0] !== '*') return mappingData(modelMap, data);

    try {

      return mappingData(modelMap, getObj(data, keyList.slice(1)));

    } catch (e) {

      return mappingData(modelMap, data);
    }
  };

  configMap && typeof configMap === 'object' && setConfig(configMap);


  function setConfig(configMap) {

    me.configMap = configMap;

  }


  function getObj(obj, keyList) {

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
  }
}


/**
 * 重构原始model
 *
 * @param {Object} model
 * @return {Object}
 */
function reorganizeModel(model) {

  if (!isArray(model)) return {};

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

  if (typeof data !== 'object') return data;

  if (isArray(data)) {

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

  traversalObj(modelMap.mappingMap, function (originKey, targetKey) {

    if (originKey in obj) obj[targetKey] = obj[originKey];

  });

  traversalObj(modelMap.valueMap, function (key) {

    obj[key] = modelMap.valueMap[key];

  });

  traversalObj(modelMap.convertMap, function (key) {

    var fn = modelMap.convertMap[key];

    if (typeof fn !== 'function') return;

    obj[key] = fn(obj[key], obj);

  });

  traversalObj(modelMap.nameMap, function (key) {

    result[key] = obj[key];

  });

  return result;
}


function traversalObj(obj, callback) {

  if (!obj) return;

  for (var key in obj) {

    if (obj.hasOwnProperty(key)) {

      callback(key, obj[key], obj);
    }
  }
}


function isArray(obj) {

  var toString = {}.toString;

  return toString.apply(obj) === '[object Array]';
}


module.exports = MMap;

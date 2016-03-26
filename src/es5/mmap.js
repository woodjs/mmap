"use strict";


function MMap() {

  this.mapping = function (model, data) {

    if (!model) return data;

    if (data && typeof data === 'object') {

      let modelMap = reorganizeModel(model);

      return mappingData(modelMap, data);

    } else {

      return data;

    }
  };
}


/**
 * 重构原始model
 *
 * @param {Object} model
 * @return {Object}
 */
function reorganizeModel(model) {

  if (!isArray(model)) return {};

  let modelMap = {
    nameMap: {},
    mappingMap: {},
    convertMap: {},
    valueMap: {}
  };


  for (let i = 0; i < model.length; i++) {

    let temp = model[i];

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

  if (typeof data !== 'object') return data;


  if (isArray(data)) {

    let result = [];

    for (let i = 0; i < data.length; i++) {

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

  let result = {};
  let clonedObj = Object.create(obj);

  if (modelMap.mappingMap) {

    for (let originPropName in modelMap.mappingMap) {

      let targetPropName = modelMap.mappingMap[originPropName];

      if (originPropName in obj) {

        obj[targetPropName] = obj[originPropName];

      }
    }
  }

  if (modelMap.convertMap) {

    for (let targetPropName in modelMap.convertMap) {

      let fn = modelMap.convertMap[targetPropName];

      if (typeof fn !== 'function') continue;

      obj[targetPropName] = fn(obj[targetPropName], obj);
    }
  }

  if (modelMap.valueMap) {

    for (let targetPropName in modelMap.valueMap) {

      let value = modelMap.valueMap[targetPropName];

      obj[targetPropName] = value;
    }
  }

  if (modelMap.nameMap) {

    for (let targetPropName in modelMap.nameMap) {

      result[targetPropName] = obj[targetPropName];
    }
  }

  return result;
}


function isArray(obj) {

  var toString = {}.toString;

  return toString.apply(obj) === '[object Array]';
}

module.exports = new MMap();
import * as utils from './utits';

export class MMap {

  static mapping(model, data) {

    if (!model) return data;

    if (data && typeof data === 'object') {

        let modelMap = reorganizeModel(model);

        return mappingData(modelMap, data);

    } else {

      return data;

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

  if (!utils.isArray(model)) return {};

  let modelMap = {
    nameMap: {},
    mappingMap: {},
    convertMap: {},
    valueMap: {}
  };


  for (let i = 0; i < model.length; i++) {

    let temp = modle[i];

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


  if (utils.isArray(data)) {

    let result = [];

    for (let i = 0; i < data.length; i++) {

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

  let clonedObj = Object.create(obj);
  let result = {};

  if (modelMap.mappingMap) {

    for (let {orginPropName, targetPropName} of modelMap.mappingMap) {

      if (orginPropName in obj) {

        obj[targetPropName] = obj[originPropName];

      }
    }
  }

  if (modelMap.convertMap) {

    for (let {targetPropName, fn} of modelMap.convertMap) {

      if (typeof fn !== 'funciton') continue;

      obj[targetPropName] = fn(obj[targetPropName], obj);
    }
  }

  if (modelMap.valueMap) {

    for (let {targetPropName, value} of modelMap.valueMap) {

      obj[targetPropName] = value;
    }
  }

  if (modelMap.nameMap) {

    for (let {targetPropName} of nameMap.keys()) {

      result[targetPropName] = obj[targetPropName];
    }
  }

  return result;
}

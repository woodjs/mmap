import * as utils from './utils';

export class MMap {

  construct(configMap) {

    if (configMap && typeof configMap === 'object') {

       this.configMap = configMap;

    }
  }

  mapping(model, data) {

    if (!model || data && typeof data !== 'object') return data;

    let modelMap = reorganizeModel(model);

    if (!this.configMap.root) return mappingData(modelMap, data);

    let keyList = this.configMap.root.split('.');

    if (keyList[0] !== '*') return mappingData(modelMap, data);

    try {

      return mappingData(modelMap, MMap.getObj(data, keyList.slice(1)));

    } catch (e) {

      return mappingData(modelMap, data);
    }
  }

  static getObj(obj, keyList) {

    if (keyList.length === 0) return obj;

    if (keyList.length > 0) {

      let key = keyList.shift();

      if (key in obj) {

        let curObj = obj[key];

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

  if (!utils.isArray(model)) return {};

  let modelMap = {
    nameMap: {},
    mappingMap: {},
    valueMap: {},
    convertMap: {}
  };

  for (let i = 0; i < model.length; i++) {

    let temp = model[i];

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

  if (utils.isArray(data)) {

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

  if (modelMap.mappingMap) {

    for (let {originKey, targetKey} of modelMap.mappingMap) {

      if (originKey in obj) obj[targetKey] = obj[originKey];

    }
  }

  if (modelMap.valueMap) {

    for (let {key, value} of modelMap.valueMap) {

      obj[key] = value;

    }
  }

  if (modelMap.convertMap) {

    for (let {key, fn} of modelMap.convertMap) {

      if (typeof fn !== 'function') continue;

      obj[key] = fn(obj[key], obj);

    }
  }

  if (modelMap.nameMap) {

    for (let {key} of modelMap.nameMap.keys()) {

      result[key] = obj[key];

    }
  }

  return result;
}

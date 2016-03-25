import * as utils from './utits';

class MMap {

  static mapping(model, data) {

    if (!model) return data;

    if (data && typeof data === 'object') {

        reorganizeModel(model);

    } else {

      return data;

    }
  },

}

/**
 *
 *
 */
function reorganizeModel(model) {

  if (!utils.isArray(model)) return {};

  let modelMap = {
    nameMap: {},
    mappingMap: {},
    convertMap: {}
  };


  for (let i = 0; i < model.length; i++) {

    let temp = modle[i];

    if (!('name' in temp)) continue;

    modelMap.nameMap.[temp['name']] = true;

    if (temp['mapping']) {

      modelMap.mappingMap[temp['mapping']] = temp['name'];

    }

    if (temp['convert']]) {

      modelMap.convertMap[temp['name']] = temp['convert'];

    }
  }
}

function mappingData(modelMap, data) {

  if (typeof data !== 'object') return data;

  if (utils.isArray(data)) {



  } else {

  }
}

function mappingObj(modelMap, obj) {

  let temp = {};
  let cloneObj = Object.create(obj);

  for (let {key, value} of modelMap.mappingMap) {

  }

  for (let {key, value} of cloneObj) {

    if (key in modelMap.nameMap) {
      temp[key] = obj[key];
    }

  }
}


export MMap;


function reorganizeModel2(model) {

  if (!utils.isArray(model)) return {};

  let modelMap = {};

  for (let i = 0; i < model.length; i++) {

    let temp = model[i];

    if (!('name' in temp)) continue;

    modelMap[temp['name']] = {};

    Object.assign(modelMap[temp['name']], temp);

  }

  return modelMap;
}


function rebuildObj2(modelMap, obj) {

  let temp = {};
  let clonedObj = Object.create(obj);

  for (let {key, value} of clonedObj) {

    if (!(key in modelMap)) continue;

    let curModelObj = modelMap[key];

    for (let {prop, data} of curModelObj) {

      if (prop === 'value') {


      }

    }
  }

}

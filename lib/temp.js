'use strict';

function reorganizeModel2(model) {

  if (!utils.isArray(model)) return {};

  var modelMap = {};

  for (var i = 0; i < model.length; i++) {

    var temp = model[i];

    if (!('name' in temp)) continue;

    modelMap[temp['name']] = {};

    Object.assign(modelMap[temp['name']], temp);
  }

  return modelMap;
}

function rebuildObj2(modelMap, obj) {

  var temp = {};
  var clonedObj = Object.create(obj);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = clonedObj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value;
      var key = _step$value.key;
      var value = _step$value.value;


      if (!(key in modelMap)) continue;

      var curModelObj = modelMap[key];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = curModelObj[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _step2.value;
          var prop = _step2$value.prop;
          var data = _step2$value.data;


          if (prop === 'value') {}
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
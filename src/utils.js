let utils = {

  isArray(obj) {

    let toString = {}.toString;

    return toString.apply(obj) === '[object Array]';
  }
};

module.exports = utils;

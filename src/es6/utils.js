export default class utils {

  static isArray(obj) {

    let toString = {}.toString;

    return toString.apply(obj) === '[object Array]';

  }
}

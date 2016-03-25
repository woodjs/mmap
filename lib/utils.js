export class utils {
  static isArray(obj) {

    return obj ? (obj.join && obj.length ? true : false) : false;

  }
}

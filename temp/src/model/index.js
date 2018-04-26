export default class {
  toString () {
    return JSON.stringify(this)
  }

  toJSON() {
    return Object.assign({}, this)
  }
}

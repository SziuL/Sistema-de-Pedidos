class LocalToken {
  constructor() {
    this._localtoken = {};
  }

  // insert a key with a value
  setInLocal(key, value) {
    return (this._localtoken[key] = value);
  }

  // get the value of a key
  getInLocal(key) {
    return this._localtoken[key];
  }

  // remove object with key
  removeLocal(key) {
    return delete this._localtoken[key];
  }
}

module.exports = new LocalToken();

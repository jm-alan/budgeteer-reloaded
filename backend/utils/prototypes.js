/* eslint-disable no-extend-native */

String.prototype.upperCaseFirst = function () {
  return `${this[0].toUpperCase()}${this.slice(1)}`;
};

String.prototype.truncateUntil = function (pattern) {
  let out = this.toString();
  while (!out.match(pattern)) out = out.slice(0, out.length - 1);
  return out;
};

Array.prototype.toMappedObject = function (key) {
  return this.reduce((acc, next) => (acc[next[key]] = next) && acc, {});
};

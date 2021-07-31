/* eslint-disable no-extend-native */

String.prototype.upperCaseFirst = function () {
  return `${this[0].toUpperCase()}${this.slice(1)}`;
};

String.prototype.truncateUntil = function (pattern = /^$/) {
  const patternTest = pattern.toString();
  if (
    typeof pattern !== 'object' ||
    patternTest.length < 5 ||
    !patternTest[0] === '/' ||
    !(patternTest[patternTest.length - 1] === patternTest[0]) ||
    patternTest[1] !== '^' ||
    patternTest[patternTest.length - 2] !== '$'
  ) throw new TypeError('Value provided must be a valid regular expression with a defined beginning (^) and end ($) and with at least 1 non-control character to match');
  let out = this.toString();
  while (out.length && !out.match(pattern)) out = out.slice(0, out.length - 1);
  return out;
};

Array.prototype.toMappedObject = function (key) {
  return this.reduce((acc, next) => (acc[next[key]] = next) && acc, {});
};

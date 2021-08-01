/* eslint-disable no-extend-native */
Date.prototype.toShortUTCString = function () {
  return [this.getUTCMonth(), this.getUTCDate(), this.getUTCFullYear()]
    .map((n, i) =>
      (!i &&
        (n >= 9 ? n + 1 : `0${n + 1}`)
      ) || (n >= 10 ? n : `0${n}`))
    .join('/');
};

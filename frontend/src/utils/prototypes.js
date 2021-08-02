/* eslint-disable no-extend-native */
Date.prototype.toShortUTCString = function () {
  return [this.getUTCMonth(), this.getUTCDate(), this.getUTCFullYear()]
    .map((n, i) =>
      (!i &&
        (n >= 9 ? n + 1 : `0${n + 1}`)
      ) || (n >= 10 ? n : `0${n}`))
    .join('/');
};

Date.prototype.toEnumeratedMonthObject = function () {
  const date = new Date(Date.UTC(this.getUTCFullYear(), this.getUTCMonth(), 1));
  const enumerated = {};
  enumerated[date.toShortUTCString()] = date.getUTCDay();
  date.setUTCDate(2);
  while (date.getUTCDate() !== 1) {
    enumerated[date.toShortUTCString()] = date.getUTCDay();
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return enumerated;
};

/* eslint-disable no-extend-native */
Date.prototype.toShortString = function () {
  return [this.getMonth(), this.getDate(), this.getFullYear()]
    .map((n, i) =>
      (!i &&
        (n >= 9 ? n + 1 : `0${n + 1}`)
      ) || (n >= 10 ? n : `0${n}`))
    .join('/');
};

Date.prototype.toEnumeratedMonthObject = function () {
  const date = new Date(this.getTime());
  const enumerated = {};
  date.setDate(1);
  enumerated[date.toShortString()] = date.getDay();
  date.setDate(2);
  while (date.getDate() !== 1) {
    enumerated[date.toShortString()] = date.getDay();
    date.setDate(date.getDate() + 1);
  }
  return enumerated;
};

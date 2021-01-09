export const convertArrayToObject = (arr = [], key) => {
  return arr.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, {});
};

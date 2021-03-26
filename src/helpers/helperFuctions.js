export const groupBy = (array, object, key) => {
  const property = Object.keys(object).find((el) => el === key);
  const groups = array.reduce(
    (groups, item) => ({
      ...groups,
      [item[`${property}`]]: [...(groups[item[`${property}`]] || []), item],
    }),
    {}
  );

  const arrOfDays = Object.keys(groups).map((element) => groups[element]);

  return arrOfDays;
};

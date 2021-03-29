export const groupBy = (array, key) => {
  const groups = array.reduce(
    (groups, item) => ({
      ...groups,
      [item[`${key}`]]: [...(groups[item[`${key}`]] || []), item],
    }),
    {}
  );

  const arrOfDays = Object.keys(groups).map((element) => groups[element]);

  return arrOfDays;
};

export const roundedAvg = (array) => {
  const result = Math.round(
    array.reduce((acc, current) => acc + current, 0) / array.length
  );
  return result;
};

export const isLoggedIn = () => {
  const isLoggedIn = localStorage.getItem("LoggedIn");

  return isLoggedIn;
};

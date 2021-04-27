import ErrorText from "../components/ErrorText";

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

  return isLoggedIn === "true" ? true : false;
};

export const errorHandlerForInput = (value, error) => {
  if (error && error.message) {
    if (
      error.message === "This email already has an account" &&
      value === "email"
    ) {
      return "errorInput";
    } else if (
      error.message === "Email or password is wrong" &&
      (value === "email" || value === "password")
    ) {
      return "errorInput";
    }
  } else if (error && error.errors) {
    for (let i = 0; i < error.errors.length; i++) {
      if (error.errors[i].path === value) return "errorInput";
    }
  } else {
    return "";
  }
};

export const errorHandlerText = (value, error) => {
  if (error && error.errors) {
    for (let i = 0; i < error.errors.length; i++) {
      if (error.errors[i].path === value)
        return <ErrorText text={error.errors[i].message} />;
    }
  }
};

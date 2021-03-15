export const loginUser = async (body) => {
  const response = await fetch(
    `${process.env.REACT_APP_BE_URL}/api/users/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    }
  );
  return response;
};

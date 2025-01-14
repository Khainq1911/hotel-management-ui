import apiInstances from "./axios";

export const checkLoginService = async (username, password) => {
  const response = await apiInstances.post("/auth/login", {
    username: username,
    password: password,
  });
  return response.data;
};

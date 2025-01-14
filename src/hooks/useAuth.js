import { jwtDecode } from "jwt-decode";

const isAuthentication = () => {
  return localStorage.getItem("accessToken") !== null;
};

const getUser = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  }

  const payload = jwtDecode(token);
  return payload;
};

const isAdmin = () => {
  const user = getUser();
  return user && user.role === "admin";
};

export { isAuthentication, getUser, isAdmin };

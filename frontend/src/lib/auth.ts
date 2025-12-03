import {jwtDecode} from "jwt-decode";

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decoded: any = jwtDecode(token);
  return decoded?.exp * 1000 > Date.now();
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

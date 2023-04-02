import http from "./httpService";
import config  from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiUrl+"/auth";
const tokenKey = "token";
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);

  } catch (error) {
    // console.log(error)
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getjwt() {
  return localStorage.getItem(tokenKey);
}
http.setJwt(getjwt());
export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getjwt,
};


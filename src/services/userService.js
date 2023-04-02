import http from "./httpService";
import config  from "../config.json";

const apiEndpoint = config.apiUrl+"/users";
export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.username,
    password: user.password,
  });
}

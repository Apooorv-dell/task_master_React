import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/spaces";

export  function getSpaceById(id) {
  return http.get(apiEndpoint + "/" + id);
}
export function getSpace(user) {
  return http.post(apiEndpoint + "/member", {
    email: user.email,
  });
}

export function setSpace(data, user) {
  return http.post(apiEndpoint, {
    title: data.title,
    createdBy: user.email,
    member: [user.email],
  });
}

export function deleteSpace(spaceid) {
  return http.delete(apiEndpoint + "/" + spaceid);
}

export function joinSpace(user, code) {
  return http.post(apiEndpoint + "/joinspace", {
    email: user.email,
    code: code,
  });
}

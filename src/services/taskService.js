import http from "./httpService";
import config from "../config.json";
import { getCurrentUser } from "./authService";
const user = getCurrentUser();
const apiEndpoint = config.apiUrl + "/tasks";

export function setTask(title, stitle) {
  return http.post(apiEndpoint, {
    title: title,
    takenBy:"will@gmail.com",
    createdBy: user.email,
    inSpace: stitle,
  });
}

export function getTask(space) {
  return http.post(apiEndpoint + "/gettasks", {
    inSpace: space,
  });
}
export function deleteTask(taskid) {
    return http.delete(apiEndpoint + "/" + taskid);
  }
export function completeTask(taskid) {
  
    return http.get(apiEndpoint + "/complete/" +taskid );
  }
export function takeTask(taskid) {
  
    return http.post(apiEndpoint + "/taken/" +taskid ,{
      email:user.email
    });
  }
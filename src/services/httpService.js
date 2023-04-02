import axios from "axios";
import { toast } from "react-toastify";

// http make show add this header
// with this we can set header for al kind of requests

// axios.defaults.headers.common["×-auth-token"] = auth.getJwt();
axios.interceptors.response.use(null, (error) => {
  // to pass this to catch we need to return a rejected promise
  const expectedError =
    error.response &&
    error.response.status > 400 &&
    error.response.status < 500;
  if (!expectedError) {
    // console.log("loggin the error", error);
    toast(error);
    // alert("an unexpected error occured");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

import axios from "axios";
import store from "../store/store";
const url = {
  baseUrl: "https://restfulapi.dnd-group.net/api",
  login: "/login",
  majors: "/majors",
  instructors: "/instructors",
  student: "/students",
};
const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
instance.interceptors.request.use((request) => {
  const state = store.getState();
  if (state.auth.token) {
    request.headers.Authorization = `Bearer ${state.auth.token}`;
  }
  return request;
});
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      window.location.href = "/no-internet";
    } else {
      switch (error.response.status) {
        case 401:
          window.location.href = "/login";
          break;
        case 403:
          window.location.href = "/no-permission";
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }
  }
);

const api = {
  url: url,
  instance: instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};
export default api;

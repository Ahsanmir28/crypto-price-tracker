import axios from "axios";
import constants from "../utils/constants";

const apiClient = axios.create({
  baseURL: `${constants.BASE_URL}`,
  headers: {
    "Content-type": "application/json",
    "x-request-from": "internal",
  },
});

apiClient.interceptors.request.use(function (config) {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    console.log('No token found')
  } finally {
    return config;
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      window.location.href = "/login";
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

export default apiClient;
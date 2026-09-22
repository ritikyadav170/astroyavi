// src/config/axios.ts
import Axios from "axios";

// Helper to get consistent API base URL pointing to /api/user
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return "/api/user";
  }
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "http://160.187.87.138:9859";
  const cleanUrl = envUrl.replace(/\/+$/, "");
  if (cleanUrl.endsWith("/api/user")) {
    return cleanUrl;
  }
  return `${cleanUrl}/api/user`;
};

// Create an Axios instance with default settings.
const axios = Axios.create({
  baseURL: getBaseURL(),
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// Request interceptor to automatically attach Authorization token
axios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("astroyavi_token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken");

      if (token) {
        config.headers.Authorization = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;
        config.headers["token"] = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor to handle auth expiration (401) redirects.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/auth")
      ) {
        // window.location.replace("/auth/login");
      }
    }
    return Promise.reject(error);
  },
);

export default axios;

// const axios = Axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error?.response?.status === 401) {
//       if (
//         typeof window !== "undefined" &&
//         !window.location.pathname.startsWith("/auth")
//       ) {
//         window.location.replace("/auth/login");
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// export default axios;

import axios, { InternalAxiosRequestConfig } from "axios";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosInstanceNoAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - Adds Authorization header
// AxiosInstance.interceptors.request.use(
//   (config) => {
//     const stored = localStorage.getItem("tokens");
//     const accessToken = stored ? JSON.parse(stored).accessToken : null;

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// Response Interceptor - Handles 401 errors

// AxiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If we got a 401 and we haven’t retried yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const stored = localStorage.getItem("tokens");
//         const refreshToken = stored ? JSON.parse(stored).refreshToken : null;

//         if (!refreshToken) throw new Error("No refresh token available.");

//         // Attempt to refresh token
//         const res = await axios.post(
//           "/api/v1/auth/refresh",
//           {},
//           {
//             baseURL: AxiosInstance.defaults.baseURL,
//             headers: {
//               Authorization: `Bearer ${refreshToken}`,
//             },
//           },
//         );

//         const newTokens = res.data;
//         localStorage.setItem("tokens", JSON.stringify(newTokens));

//         // Retry original request with new token
//         originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
//         return AxiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("Token refresh failed. Redirecting to login.");
//         localStorage.removeItem("tokens");
//         window.location.href = "/sign-portal";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

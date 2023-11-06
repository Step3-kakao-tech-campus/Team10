import axios from "axios";

const token = localStorage.getItem("Token");

export const instance = axios.create({
  timeout: 5000,
  baseURL: "https://k92309e2e8ca6a.user-app.krampoline.com",
  headers: {
    "Content-Type": "application/json",
    authorization: token,
  },
});

export const fileInstance = axios.create({
  timeout: 5000,
  baseURL: "https://k92309e2e8ca6a.user-app.krampoline.com",
  headers: {
    authorization: token,
  },
});

// export const instance = axios.create({
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//     authorization: token,
//   },
// });

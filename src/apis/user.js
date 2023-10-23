import { instance } from "./instance";

export const login = (data) => {
  const { email, password } = data;
  return instance.post("/login/owner", { email, password });
};

export const signup = (data) => {
  const { nickname, email, password, tel } = data;
  return instance.post("/join/owner", { nickname, email, password, tel });
};

import request from "@/utils/request.ts";

export function login(data) {
  return request({
    url: "/users/login",
    method: "post",
    data
  });
}

export function getInfo() {
  return request({
    url: "/users/info",
    method: "post"
    // data: { token }
  });
}

export const logout = () =>
  request({
    url: "/users/logout",
    method: "post"
  });

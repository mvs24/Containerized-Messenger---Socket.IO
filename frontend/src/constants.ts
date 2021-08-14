export enum SOCKET_EVENTS {
  READY = "READY",
}

export const API_ENDPOINT = "/api/v1";
export const SIGNUP_ENDPOINT = `${API_ENDPOINT}/users/signup`;
export const ME_ENDPOINT = `${API_ENDPOINT}/users/me`;
export const GET_OTHER_USERS_ENDPOINT = `${API_ENDPOINT}/users/other-users`;

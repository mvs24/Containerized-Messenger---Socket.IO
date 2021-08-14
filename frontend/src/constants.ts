export enum SOCKET_EVENTS {
  READY = "READY",
}

export const API_ENDPOINT = "/api/v1";
export const SIGNUP_ENDPOINT = `${API_ENDPOINT}/users/signup`;
export const ME_ENDPOINT = `${API_ENDPOINT}/users/me`;
export const GET_OTHER_USERS_ENDPOINT = `${API_ENDPOINT}/users/other-users`;
export const GET_MY_FOLLOWINGS_ENDPOINT = `${API_ENDPOINT}/followers/my-followings`;
export const FOLLOW_NEW_USER_ENDPOINT = `${API_ENDPOINT}/followers/`;
export const UNFOLLOW_USER_ENDPOINT = `${API_ENDPOINT}/followers/unfollow`;

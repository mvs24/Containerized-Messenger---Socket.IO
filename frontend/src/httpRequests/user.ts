import axios from "axios";
import {
  FOLLOW_NEW_USER_ENDPOINT,
  GET_MY_FOLLOWINGS_ENDPOINT,
  GET_OTHER_USERS_ENDPOINT,
  ME_ENDPOINT,
  SIGNUP_ENDPOINT,
  UNFOLLOW_USER_ENDPOINT,
} from "../constants";

export const signupRequest = async function (body: any) {
  try {
    return await axios.post(SIGNUP_ENDPOINT, body);
  } catch (err) {
    throw err.response.data.message;
  }
};

export const getMe = async function () {
  try {
    return await axios.get(ME_ENDPOINT);
  } catch (err) {
    throw err.response.data.message;
  }
};

export const getOtherUsers = async function (page = 1, limit = 5) {
  try {
    return await axios.get(
      `${GET_OTHER_USERS_ENDPOINT}?page=${page}&limit=${limit}`
    );
  } catch (err) {
    throw err.response.data.message;
  }
};

export const getMyFollowingsRequest = async function () {
  try {
    return await axios.get(GET_MY_FOLLOWINGS_ENDPOINT);
  } catch (error) {
    throw error.response.data.message;
  }
};

export const followNewUserRequest = async function (id: string) {
  try {
    return await axios.post(`${FOLLOW_NEW_USER_ENDPOINT}/${id}`);
  } catch (error) {
    throw error.response.data.message;
  }
};

export const unfollowUserRequest = async function (id: string) {
  try {
    return await axios.patch(`${UNFOLLOW_USER_ENDPOINT}/${id}`);
  } catch (error) {
    throw error.response.data.message;
  }
};

import axios from "axios";
import {
  GET_OTHER_USERS_ENDPOINT,
  ME_ENDPOINT,
  SIGNUP_ENDPOINT,
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

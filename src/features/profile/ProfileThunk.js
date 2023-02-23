import axios from "axios";
import { checkForUnauthorizedResponse } from "../../utils/axios";

const baseURL = "/api/v1";

export const createProfileThunk = async (url, profile, thunkAPI) => {
  try {
    const resp = await axios.post(`${baseURL}/${url}`, profile);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getProfileThunk = async (url, thunkAPI) => {
  try {
    const resp = await axios.get(`${baseURL}/${url}`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const accessProfileThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await axios.post(`${baseURL}/${url}`, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

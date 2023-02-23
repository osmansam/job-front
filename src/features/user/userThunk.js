import { checkForUnauthorizedResponse } from "../../utils/axios";
import axios from "axios";

const baseURL = "/api/v1";
export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await axios.post(`${baseURL}/${url}`, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await axios.post(`${baseURL}/${url}`, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await axios.patch(`${baseURL}/${url}`, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const resetPasswordThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await axios.post(`${baseURL}/${url}`, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const forgotPasswordThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await axios.post(`${baseURL}/${url}`, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const logoutUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await axios.delete(`${baseURL}/${url}`, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const createCandidateThunk = async (url, candidate, thunkAPI) => {
  try {
    const resp = await axios.post(`${baseURL}/${url}`, candidate);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

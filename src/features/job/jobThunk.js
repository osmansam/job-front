import axios from "axios";
import { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValues } from "./jobSlice";

const baseURL = "/api/v1";
export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await axios.post(`${baseURL}/job`, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteJobThunk = async (id, thunkAPI) => {
  try {
    const resp = await axios.delete(`${baseURL}/job/${id}`);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const updateJobThunk = async (id, job, thunkAPI) => {
  try {
    const resp = await axios.patch(`${baseURL}/job/${id}`, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

//bu gecici olarak burada
export const getAllJobsThunk = async (thunkAPI) => {
  try {
    const resp = await axios.get(`${baseURL}/job`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

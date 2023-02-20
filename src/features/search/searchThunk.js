import axios from "axios";
import { checkForUnauthorizedResponse } from "../../utils/axios";
const baseURL = "/api/v1";

export const getAllJobsThunk = async (thunkAPI) => {
  try {
    const resp = await axios.get(`${baseURL}/job`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

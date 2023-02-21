import axios from "axios";
import { checkForUnauthorizedResponse } from "../../utils/axios";
const baseURL = "/api/v1";

export const getAllJobsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().search;
  let url = `/job?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await axios.get(`${baseURL}/${url}`);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

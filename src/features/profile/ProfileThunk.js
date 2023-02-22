import axios from "axios";
import { checkForUnauthorizedResponse } from "../../utils/axios";

const baseURL = "/api/v1";

export const createJobThunk = async (profile, thunkAPI) => {
  try {
    const resp = await axios.post(`${baseURL}/profile`, profile);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

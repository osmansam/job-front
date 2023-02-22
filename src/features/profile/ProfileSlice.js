import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createProfileThunk } from "./profileThunk";
const initialState = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  zipCode: "",
  degree: ["bachelor", "master", "phd"],
  field: [
    "computer science",
    "mathematics",
    "physics",
    "chemistry",
    "biology",
    "engineering",
    "education",
    "other",
  ],
  university: "",
  graduationYear: "",
  skills: "",
};

export const createProfile = createAsyncThunk(
  "profile/create",
  async (user, thunkAPI) => {
    return createProfileThunk("auth/register", user, thunkAPI);
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Profile created successfully.");
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

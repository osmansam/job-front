import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createProfileThunk, getProfileThunk } from "./ProfileThunk";

const initialState = {
  profile: {},
  name: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  zipCode: "",
  degree: "bachelor",
  degreeOptions: ["bachelor", "master", "phd"],
  field: "computer science",
  fieldOptions: [
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
  isLoading: false,
  isEditing: false,
};

export const createProfile = createAsyncThunk(
  "profile/create",
  async (profile, thunkAPI) => {
    return createProfileThunk("profile", profile, thunkAPI);
  }
);
export const getProfile = createAsyncThunk(
  "profile/get",
  async (profile, thunkAPI) => {
    return getProfileThunk("profile", profile, thunkAPI);
  }
);
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearProfile: () => {
      return initialState;
    },
    setProfile: (state) => {
      getProfile();
    },
    setIsEditing: (state, { payload }) => {
      state.isEditing = payload;
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
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.name = action.payload.name;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.address = action.payload.address;
        state.city = action.payload.city;
        state.country = action.payload.country;
        state.zipCode = action.payload.zipCode;
        state.degree = action.payload.degree;
        state.field = action.payload.field;
        state.university = action.payload.university;
        state.graduationYear = action.payload.graduationYear;
        state.skills = action.payload.skills;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { handleChange, setProfile, clearProfile, setIsEditing } =
  profileSlice.actions;
export default profileSlice.reducer;

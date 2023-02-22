import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createProfileThunk, getProfileThunk } from "./ProfileThunk";

const initialState = {
  profile: null,
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
        if (state.profile) {
          state.name = state.profile.profile.name;
          state.lastName = state.profile.profile.lastName;
          state.email = state.profile.profile.email;
          state.phone = state.profile.profile.phone;
          state.address = state.profile.profile.address;
          state.city = state.profile.profile.city;
          state.country = state.profile.profile.country;
          state.zipCode = state.profile.profile.zipCode;
          state.degree = state.profile.profile.degree;
          state.field = state.profile.profile.field;
          state.university = state.profile.profile.university;
          state.graduationYear = state.profile.profile.graduationYear;
          state.skills = state.profile.profile.skills;
          state.isEditing = state.profile.profile.isEditing;
        } else {
          return initialState;
        }
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { handleChange, clearProfile, setIsEditing } =
  profileSlice.actions;
export default profileSlice.reducer;

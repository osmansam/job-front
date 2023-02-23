import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createProfileThunk,
  getProfileThunk,
  accessProfileThunk,
} from "./ProfileThunk";

const initialState = {
  profile: [],
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
export const accessProfile = createAsyncThunk(
  "profile/access",
  async (profile, thunkAPI) => {
    return accessProfileThunk("profile/access", profile, thunkAPI);
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
    setProfile: (state) => {
      state.profil = [];
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

        if (action.payload) {
          state.name = action.payload.profile.name;
          state.lastName = action.payload.profile.lastName;
          state.email = action.payload.profile.email;
          state.phone = action.payload.profile.phone;
          state.address = action.payload.profile.address;
          state.city = action.payload.profile.city;
          state.country = action.payload.profile.country;
          state.zipCode = action.payload.profile.zipCode;
          state.degree = action.payload.profile.degree;
          state.field = action.payload.profile.field;
          state.university = action.payload.profile.university;
          state.graduationYear = action.payload.profile.graduationYear;
          state.skills = action.payload.profile.skills;
          state.isEditing = action.payload.profile.isEditing;
        } else {
          return initialState;
        }
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(accessProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(accessProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile.push(action.payload);
      })
      .addCase(accessProfile.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { handleChange, clearProfile, setIsEditing, setProfile } =
  profileSlice.actions;
export default profileSlice.reducer;

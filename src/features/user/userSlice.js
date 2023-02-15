import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
} from "../../api/userApi";

const initialState = {
  user: null,
  isSidebarOpen: false,
  isLoading: false,
};
const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    return registerUserThunk("auth/register", user, thunkAPI);
  }
);
const loginUser = createAsyncThunk("user/login", async (user, thunkAPI) => {
  return loginUserThunk("auth/login", user, thunkAPI);
});

const updateUser = createAsyncThunk("user/update", async (user, thunkAPI) => {
  return updateUserThunk("auth/update", user, thunkAPI);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isLoading = false;
      toast.success(`Please verify your email address.`);
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isLoading = false;
      toast.success(`Welcome ${user.name}!`);
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isLoading = false;
      toast.success(`User updated successfully.`);
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
  },
});

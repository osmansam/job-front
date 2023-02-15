import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
  resetPasswordThunk,
  forgotPasswordThunk,
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
const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (user, thunkAPI) => {
    return resetPasswordThunk("auth/reset-password", user, thunkAPI);
  }
);
const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (user, thunkAPI) => {
    return forgotPasswordThunk("auth/forgot-password", user, thunkAPI);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: async (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      await axios.delete("/api/v1/auth/logout");
      toast.success(`Logged out successfully.`);
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
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success(`Password reset successfully.`);
    },
    [resetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
  },
});

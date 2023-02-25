import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
  resetPasswordThunk,
  forgotPasswordThunk,
  logoutUserThunk,
  createCandidateThunk,
  jobCandidatesThunk,
  updateCandidateThunk,
  getAllCandidatesThunk,
  deleteCandidateThunk,
} from "./userThunk";

const initialState = {
  user: null,
  isSidebarOpen: false,
  isLoading: false,
  candidates: {},
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    return registerUserThunk("auth/register", user, thunkAPI);
  }
);
export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    return loginUserThunk("auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    return updateUserThunk("auth/update", user, thunkAPI);
  }
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (user, thunkAPI) => {
    return resetPasswordThunk("auth/reset-password", user, thunkAPI);
  }
);
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (user, thunkAPI) => {
    return forgotPasswordThunk("auth/forgot-password", user, thunkAPI);
  }
);
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (user, thunkAPI) => {
    return logoutUserThunk("auth/logout", user, thunkAPI);
  }
);
export const createCandidate = createAsyncThunk(
  "user/createCandidate",
  async (candidate, thunkAPI) => {
    return createCandidateThunk("candidate", candidate, thunkAPI);
  }
);
export const jobCandidates = createAsyncThunk(
  "user/jobCandidates",
  async (job, thunkAPI) => {
    return jobCandidatesThunk("candidate/job", job, thunkAPI);
  }
);
export const updateCandidate = createAsyncThunk(
  "user/updateCandidates",
  async (candidate, thunkAPI) => {
    return updateCandidateThunk("candidate/update", candidate, thunkAPI);
  }
);
export const getAllCandidates = createAsyncThunk(
  "user/getAllCandidates",
  async (candidate, thunkAPI) => {
    return getAllCandidatesThunk("candidate/", candidate, thunkAPI);
  }
);
export const deleteCandidate = createAsyncThunk(
  "user/deleteCandidate",
  async (candidate, thunkAPI) => {
    return deleteCandidateThunk("candidate/delete", candidate, thunkAPI);
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isLoading = false;
        toast.success(`Please verify your email address.`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
        state.isLoading = false;
        toast.success(`Welcome ${user.name}!`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
        state.isLoading = false;
        toast.success(`Profile updated successfully.`);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(`Password reset successfully.`);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(`Password reset link sent to your email.`);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        toast.success(`Logged out successfully.`);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(createCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(`Candidate created successfully.`);
      })
      .addCase(createCandidate.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(jobCandidates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(jobCandidates.fulfilled, (state, action) => {
        state.candidates = action.payload;
        state.isLoading = false;
      })
      .addCase(jobCandidates.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(updateCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(`Candidate updated successfully.`);
      })
      .addCase(updateCandidate.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(getAllCandidates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCandidates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.candidates = action.payload;
      })
      .addCase(getAllCandidates.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(deleteCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(`Candidate deleted successfully.`);
      })
      .addCase(deleteCandidate.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});
export const { toggleSidebar } = userSlice.actions;
export default userSlice.reducer;

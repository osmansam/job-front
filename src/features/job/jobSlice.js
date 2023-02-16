import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";
const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
};

const createJob = createAsyncThunk("job/create", createJobThunk);
const deleteJob = createAsyncThunk("job/delete", deleteJobThunk);
const editJob = createAsyncThunk("job/edit", editJobThunk);

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success("Job created successfully.");
    },
    [createJob.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [deleteJob.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteJob.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success("Job deleted successfully.");
    },
    [deleteJob.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success("Job updated successfully.");
    },
    [editJob.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
  },
});

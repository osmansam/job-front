import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createJobThunk,
  deleteJobThunk,
  updateJobThunk,
  getAllJobsThunk,
  getJobThunk,
} from "./jobThunk";
const initialState = {
  job: [],
  jobs: [],
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editId: null,
};

export const createJob = createAsyncThunk("job/create", createJobThunk);
export const deleteJob = createAsyncThunk("job/delete", deleteJobThunk);
export const updateJob = createAsyncThunk("job/update", updateJobThunk);
//bu gecici olarak burada
export const getAllJobs = createAsyncThunk("job/getAll", getAllJobsThunk);
export const getJob = createAsyncThunk("job/get", getJobThunk);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Job created successfully.");
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Job deleted successfully.");
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Job updated successfully.");
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(getJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.job = payload.job;
      })
      .addCase(getJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});
export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;

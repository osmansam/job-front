import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunk } from "./searchThunk";

const initialState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  page: 1,
  numberOfPages: 1,
  isLoading: true,
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  jobs: [],
  totalJobs: 0,
  numberOfPages: 0,
  appliedJobspage: 1,
};
export const getAllJobs = createAsyncThunk("job/getAll", getAllJobsThunk);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearFilters: (state) => {
      return initialState;
    },
    handleFilters: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    changeAppliedJobPage: (state, { payload }) => {
      state.appliedJobspage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.totalJobs = payload.totalJobs;
        state.numberOfPages = payload.numOfPages;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export default searchSlice.reducer;
export const { clearFilters, handleFilters, changePage, changeAppliedJobPage } =
  searchSlice.actions;

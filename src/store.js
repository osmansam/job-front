import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/job/jobSlice";
import searchSlice from "./features/search/searchSlice";
import profileSlice from "./features/profile/ProfileSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    search: searchSlice,
    profile: profileSlice,
  },
});

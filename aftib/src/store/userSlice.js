import { createSlice } from "@reduxjs/toolkit";
import { getAdminDashboardData } from "../utils/adminOpsRequests";

let initialState = {
  email: "",
  accessToken: "",
  userData: {},
  agentDashboardData: {},
  adminDashboardData: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateAgentDashboardData: (state,action) => {
      state.agentDashboardData = action.payload
    },
    updateAdminDashboardData: (state,action) => {
      state.adminDashboardData = action.payload
    }
  },
});

export const { updateEmail, updateAccessToken, updateUserData, updateAgentDashboardData, updateAdminDashboardData } =
  userSlice.actions;

export default userSlice.reducer;

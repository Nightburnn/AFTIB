import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  email: "",
  accessToken: "",
  userData: {},
  agentDashboardData: {}
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
    }
  },
});

export const { updateEmail, updateAccessToken, updateUserData, updateAgentDashboardData } =
  userSlice.actions;

export default userSlice.reducer;

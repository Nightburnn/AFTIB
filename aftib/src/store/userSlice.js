import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  email: "",
  accessToken: "",
  userData: {},
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
  },
});

export const { updateEmail, updateAccessToken, updateUserData } =
  userSlice.actions;

export default userSlice.reducer;

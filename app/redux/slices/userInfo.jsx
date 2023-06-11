import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "data",
  initialState: {
    userInfo: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;

export const selectUserInfo = (state) => state.userInfo;

export const userInfoReducer = userInfoSlice.reducer;

// export default authSlice.reducer;

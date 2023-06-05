import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "data",
  initialState: {
    auth: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.auth = action.payload;
    },
    clearToken: (state) => {
      state.auth = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export const selectToken = (state) => state.auth;

export const authReducer = authSlice.reducer

// export default authSlice.reducer;

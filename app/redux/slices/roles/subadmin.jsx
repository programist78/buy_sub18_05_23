import { createSlice } from "@reduxjs/toolkit";

const subadminSlice = createSlice({
  name: "data",
  initialState: {
    subadmin: false,
  },

  reducers: {
    addSubAdmintoLocal: (state) => {
      if (state.admin == false) {
        state.admin = true;
      } else {
      }
    },
  },
});

export const subadminReducer = subadminSlice.reducer;

export const { addSubAdmintoLocal } = subadminSlice.actions;

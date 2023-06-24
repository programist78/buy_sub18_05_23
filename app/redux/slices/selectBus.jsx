import { createSlice } from "@reduxjs/toolkit";

const SelectBusSlice = createSlice({
  name: "data",
  initialState: {
    selectBus: null,
  },
  reducers: {
    setSelectBus: (state, action) => {
      state.selectBus = action.payload;
    },
    clearSelectBus: (state) => {
      state.selectBus = null;
    },
  },
});

export const { setSelectBus, clearSelectBus } = SelectBusSlice.actions;

export const selectSelectBus = (state) => state.selectBus;

export const SelectBusReducer = SelectBusSlice.reducer;

// export default authSlice.reducer;

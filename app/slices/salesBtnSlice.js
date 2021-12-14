import { createSlice } from "@reduxjs/toolkit";

const initialState = {disabled:true};

const salesBtnSlice = createSlice({
  name: "salesBtn",
  initialState,
  reducers: {
    toggle: (state, action) => {
      state.disabled = action.payload
    },
  },
});

export const { toggle } = salesBtnSlice.actions;
export default salesBtnSlice.reducer;

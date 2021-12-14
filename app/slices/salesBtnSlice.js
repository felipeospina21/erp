import { createSlice } from "@reduxjs/toolkit";

const initialState = true;

const salesBtnSlice = createSlice({
  name: "salesBtn",
  initialState,
  reducers: {
    // TODO: Cambio de estado explicito, pasarlo como argumento
    toggle: state => !state,
  },
});

export const { toggle } = salesBtnSlice.actions;
export default salesBtnSlice.reducer;

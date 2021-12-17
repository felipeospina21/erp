import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore/lite";

//TODO: Validar que se mantenga el estado status cuando se llaman los reducers.
const initialState = {
  data: { tax: 0, subtotal: 0, total: 0 },
  status: null,
};

export const saveSaleInfo = createAsyncThunk(
  "sales/saveSaleInfo",
  async (paramsObj, { dispatch, getState }) => {
    const { db, rowsData } = paramsObj;
    const { sales } = getState();
    const collectionRef = collection(db, "sales");
    const docRef = doc(collectionRef);
    const docData = {
      chanel: "directo",
      clientId: "123456",
      clientName: "test client",
      deliveryCity: "medellin",
      timestamp: Timestamp.fromDate(new Date()),
      subtotal: sales.data.subtotal,
      tax: sales.data.tax,
      total: sales.data.total,
      orderedProducts: rowsData,
    };
    await setDoc(docRef, docData);
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    updateSales: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(saveSaleInfo.pending, state => {
        state.status = "loading";
      })
      .addCase(saveSaleInfo.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { updateSales, extraReducers } = salesSlice.actions;
export default salesSlice.reducer;

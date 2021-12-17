import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore/lite";

const initialState = {
  data: {},
  status: null,
};

export const saveSaleInfo = createAsyncThunk(
  "sales/saveSaleInfo",
  async (paramsObj, { dispatch, getState }) => {
    const { db, rowsData, checkoutData } = paramsObj;
    // const updatedObj = [];
    const collectionRef = collection(db, "sales");
    const docRef = doc(collectionRef);
    const docData = {
      chanel: "directo",
      clientId: "123456",
      clientName: "test client",
      deliveryCity: "medellin",
      timestamp: Timestamp.fromDate(new Date()),
      subtotal: checkoutData.subtotal,
      tax: checkoutData.tax,
      total: checkoutData.total,
      orderedProducts: rowsData
    }
      // const docData = {
      //   chanel: "directo",
      //   clientId: "123456",
      //   clientName: "test client",
      //   deliveryCity: "medellin",
      //   discount: 0.3,
      //   timestamp: Timestamp.fromDate(new Date()),
      //   orderedProducts: [
      //     {
      //       price: 1500,
      //       products: "ghee 160g",
      //       productId: "1",
      //       quantity: 1,
      //       subtotal: 1500,
      //     },
      //     {
      //       price: 5000,
      //       products: "ghee 315g",
      //       productId: "2",
      //       quantity: 1,
      //       subtotal: 5000,
      //     },
      //   ],
      // };
      await setDoc(docRef, docData);
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
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

export const { extraReducers } = salesSlice.actions;
export default salesSlice.reducer;

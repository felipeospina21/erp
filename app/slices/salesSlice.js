import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore/lite";

const initialState = {
  data: {tax: 0, subtotal: 0, total: 0},
  status: null,
};

export const saveSaleInfo = createAsyncThunk(
  "sales/saveSaleInfo",
  async (paramsObj, { dispatch, getState }) => {
    const { db, rowsData } = paramsObj;
    const {sales} = getState()
    // const updatedObj = [];
    const collectionRef = collection(db, "sales");
    const docRef = doc(collectionRef);
    const docData = {
      chanel: "directo",
      clientId: "123456",
      clientName: "test client",
      deliveryCity: "medellin",
      timestamp: Timestamp.fromDate(new Date()),
      subtotal: sales.subtotal,
      tax: sales.tax,
      total: sales.total,
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
  reducers: {
    updateSales: (state, action)=>{
      return action.payload
    }
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

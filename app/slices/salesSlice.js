import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore/lite";

const initialState = {
  data: { tax: 0, subtotal: 0, total: 0 },
  status: null,
};

export const saveSaleInfo = createAsyncThunk(
  "sales/saveSaleInfo",
  async (paramsObj, { getState }) => {
    const { db, rowsData } = paramsObj;
    const { sales, clients } = getState();
    const clientData = clients.list.filter(
      client => client.name === sales.data.clientName
    )[0];
    const collectionRef = collection(db, "sales");
    const docRef = doc(collectionRef);
    const docData = {
      ...clientData,
      clientName: sales.data.clientName,
      deliveryCity: sales.data.deliveryCity,
      chanel: sales.data.chanel,
      timestamp: Timestamp.fromDate(new Date()).toDate().toString(),
      subtotal: sales.data.subtotal,
      tax: sales.data.tax,
      total: sales.data.total,
      orderedProducts: rowsData,
    };
    await setDoc(docRef, docData);

    return docData;
  }
);

// TODO: Check how to not trigger reducer if state did not change
const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    updateSalesData: (state, action) => {
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(saveSaleInfo.pending, state => {
        state.status = "loading";
      })
      .addCase(saveSaleInfo.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
        // return { ...state, data: { ...action.payload } };
      });
  },
});

export const { updateSalesData, resetState, extraReducers } = salesSlice.actions;
export default salesSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createPdf } from "../../../utils";
import { RootState } from '../../store';
import type { NewSale } from '../../services';

export interface SalesData extends Partial<NewSale> {
  id?: string;
}
export interface SalesState {
  data: SalesData;
  status: string | undefined;
}

const initialState = {
  data: { tax: 0, subtotal: 0, total: 0 },
  status: '',
};

// export const saveSaleInfo = createAsyncThunk<any, DecreaseStockParams, { state: RootState }>(
//   "sales/saveSaleInfo",
//   async (paramsObj, { getState }) => {
//     const { db, rowsData } = paramsObj;
//     const { sales, clients } = getState();
//     const clientData = clients.list.filter((client) => client.name === sales.data.clientName)[0];
//     const collectionRef = collection(db, "sales");
//     const docRef = doc(collectionRef);
//     const docData = {
//       ...clientData,
//       clientName: sales.data.clientName,
//       deliveryCity: sales.data.deliveryCity,
//       chanel: sales.data.chanel,
//       timestamp: Timestamp.fromDate(new Date()).toDate().toString(),
//       subtotal: sales.data.subtotal,
//       tax: sales.data.tax,
//       total: sales.data.total,
//       orderedProducts: rowsData,
//     };
//     await setDoc(docRef, docData);

//     return docData;
//   }
// );

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    updateSalesData: (state, action: PayloadAction<SalesData>) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { updateSalesData, resetState } = salesSlice.actions;
export const selectSales = (state: RootState): SalesState => state.sales;
export default salesSlice.reducer;

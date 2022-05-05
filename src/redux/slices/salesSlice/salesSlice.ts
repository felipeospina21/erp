import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createPdf } from "../../../utils";
import { RootState } from '@/redux/store';
import type { NewSale } from '@/redux/services';

export interface SalesData extends NewSale {
  clientInfo: string; //client id
  clientName: string;
}
export interface SalesState {
  newSaleData: SalesData;
  status: string | undefined;
}

const initialState: SalesState = {
  newSaleData: {
    clientInfo: '',
    clientName: '',
    orderedProducts: [
      {
        item: '',
        listId: '',
        discount: 0,
        quantity: 0,
        subtotal: 0,
      },
    ],
    deliveryCity: '',
    salesChannel: '',
    tax: 0,
    subtotal: 0,
    total: 0,
  },
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
    resetSale: () => {
      return initialState;
    },
    updateSalesData: (state, action: PayloadAction<Partial<SalesData>>) => {
      state.newSaleData = { ...state.newSaleData, ...action.payload };
    },
  },
});

export const { updateSalesData, resetSale } = salesSlice.actions;
export const selectSales = (state: RootState): SalesState => state.sales;
export default salesSlice.reducer;

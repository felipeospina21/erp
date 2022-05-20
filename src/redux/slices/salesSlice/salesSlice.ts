import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createPdf } from "../../../utils";
import { RootState } from '@/redux/store';
import type { Client, NewSale } from '@/redux/services';

export interface SalesData extends NewSale {
  clientId: string; //client id
  clientName: string;
  clientInfo: Client;
}
export interface SalesState {
  newSaleData: SalesData;
  status: string | undefined;
}

const initialState: SalesState = {
  newSaleData: {
    clientId: '',
    clientName: '',
    clientInfo: {
      addres1: '',
      city: '',
      department: '',
      discount: 0,
      idNumber: '',
      idType: '',
      name: '',
    },
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

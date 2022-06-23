import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import type { CheckoutData, Client, NewSaleOrderedProduct } from '@/redux/services';

export interface SalesState {
  productsList?: NewSaleOrderedProduct[];
  client: Client;
  checkoutData: CheckoutData;
}

const initialState: SalesState = {
  productsList: [],
  client: {
    addres1: '',
    city: '',
    department: '',
    discount: 0,
    idNumber: '',
    idType: '',
    name: '',
    paymentTerm: '30',
    retailer: false,
  },
  checkoutData: {
    deliveryCity: '',
    paymentTerm: '',
    tax: 0,
    subtotal: 0,
    total: 0,
  },
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    resetSale: () => {
      return initialState;
    },

    updateProductsList: (state, action: PayloadAction<Partial<NewSaleOrderedProduct>>) => {
      const { payload } = action;

      if (payload.rowId && state.productsList) {
        const idx = payload.rowId - 1;
        state.productsList[idx] = { ...state.productsList[idx], ...payload };
      }
    },
    addNewSaleClient: (state, action: PayloadAction<Client>) => {
      const { payload } = action;
      state.client = { ...payload };
    },
    updateCheckoutData: (state, action: PayloadAction<{ key: string; value: string | number }>) => {
      const { key, value } = action.payload;
      if (state.checkoutData) {
        state.checkoutData = { ...state.checkoutData, [key as keyof CheckoutData]: value };
      }
    },
    updateClientPaymentTerm: (state, action: PayloadAction<'contado' | '15' | '30' | '60'>) => {
      const { payload } = action;
      state.checkoutData.paymentTerm = payload;
    },
  },
});

export const {
  resetSale,
  updateProductsList,
  addNewSaleClient,
  updateCheckoutData,
  updateClientPaymentTerm,
} = salesSlice.actions;
export const selectSales = (state: RootState): SalesState => state.sales;
export default salesSlice.reducer;

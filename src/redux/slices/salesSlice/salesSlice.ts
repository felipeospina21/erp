import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createPdf } from "../../../utils";
import { RootState } from '@/redux/store';
import type { CheckoutData, Client, NewSale, NewSaleOrderedProduct } from '@/redux/services';

export interface SalesData extends NewSale {
  clientId: string; //client id
  clientName: string;
  clientInfo: Client;
}

export interface SalesState {
  // newSaleData: SalesData;
  productsList?: NewSaleOrderedProduct[];
  client: Client;
  checkoutData: CheckoutData;
}

const initialState: SalesState = {
  // newSaleData: {
  //   clientId: '',
  //   clientName: '',
  //   clientInfo: {
  //     addres1: '',
  //     city: '',
  //     department: '',
  //     discount: 0,
  //     idNumber: '',
  //     idType: '',
  //     name: '',
  //   },
  //   orderedProducts: [
  //     {
  //       itemId: '',
  //       rowId: '',
  //       discount: 0,
  //       quantity: 0,
  //       rowTotal: 0,
  //       price: 0,
  //       stock:0,
  //       name: ''
  //     },
  //   ],
  //   deliveryCity: '',
  //   paymentTerm: '',
  //   tax: 0,
  //   subtotal: 0,
  //   total: 0,
  // },
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
    // updateSalesData: (state, action: PayloadAction<Partial<SalesData>>) => {
    //   state.newSaleData = { ...state.newSaleData, ...action.payload };
    // },
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

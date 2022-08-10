import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import type { CheckoutData, Client, NewSaleOrderedProduct } from '@/redux/services';

export interface SalesState {
  deliveriesList: Array<NewSaleOrderedProduct[]>;
  productsList?: NewSaleOrderedProduct[];
  client: Client;
  checkoutData: CheckoutData;
  invoiceObservations?: {
    text: string;
    areInvalid: boolean;
  };
}

interface AddProductPayload {
  deliveryId: number;
  rowData: NewSaleOrderedProduct;
}

interface RemoveProductPayload {
  deliveryId: number;
  idx: number;
}

interface UpdateProductListPayload {
  deliveryId: number;
  productList: NewSaleOrderedProduct[];
}

interface UpdateProductPayload extends Pick<AddProductPayload, 'deliveryId'> {
  newProduct: Partial<NewSaleOrderedProduct>;
}

const initialState: SalesState = {
  deliveriesList: [],
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
  invoiceObservations: {
    text: '',
    areInvalid: false,
  },
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    resetSale: () => {
      return initialState;
    },
    addNewDeliveryToList: (state, action: PayloadAction<NewSaleOrderedProduct[]>) => {
      state.deliveriesList.push(action.payload);
    },
    addProductToList: (state, action: PayloadAction<AddProductPayload>) => {
      const { deliveryId, rowData } = action.payload;
      state.deliveriesList[deliveryId].push(rowData);
    },
    removeProductFromList: (state, action: PayloadAction<RemoveProductPayload>) => {
      const { deliveryId, idx } = action.payload;
      state.deliveriesList[deliveryId].splice(idx, 1);
    },

    updateProductList: (state, action: PayloadAction<UpdateProductListPayload>) => {
      const { deliveryId, productList } = action.payload;
      state.deliveriesList[deliveryId] = productList;
    },

    updateProductsListItem: (state, action: PayloadAction<UpdateProductPayload>) => {
      const { newProduct, deliveryId } = action.payload;
      const productsList = state.deliveriesList[deliveryId];

      if (newProduct.rowId && productsList) {
        const idx = productsList.findIndex(({ rowId }) => rowId === newProduct.rowId);
        if (idx >= 0) {
          productsList[idx] = { ...productsList[idx], ...newProduct };
        }
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
    addInvoiceObservations: (state, action: PayloadAction<string>) => {
      if (state.invoiceObservations) {
        state.invoiceObservations.text = action.payload;
      }
    },
    isInvoiceObservationsTextInvalid: (state, action: PayloadAction<boolean>) => {
      if (state.invoiceObservations) {
        state.invoiceObservations.areInvalid = action.payload;
      }
    },
  },
});

export const {
  resetSale,
  addProductToList,
  removeProductFromList,
  updateProductList,
  updateProductsListItem,
  addNewSaleClient,
  updateCheckoutData,
  updateClientPaymentTerm,
  addInvoiceObservations,
  isInvoiceObservationsTextInvalid,
  addNewDeliveryToList,
} = salesSlice.actions;
export const selectSales = (state: RootState): SalesState => state.sales;
export default salesSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import type { CheckoutData, Client, NewSaleOrderedProduct, SaleSummary } from '@/redux/services';

export interface SalesState {
  deliveriesList: Array<Delivery>;
  client: Client;
  checkoutData: CheckoutData;
}

export interface Delivery {
  productsList: NewSaleOrderedProduct[];
  summary: SaleSummary;
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
  deliveriesList: [
    {
      productsList: [
        {
          rowId: '1',
          item: '',
          discount: 0,
          rowTotal: 0,
          stock: 0,
          quantity: 0,
          productId: '',
          price: 0,
        },
      ],
      summary: {
        tax: 0,
        subtotal: 0,
        total: 0,
      },
      invoiceObservations: {
        text: '',
        areInvalid: false,
      },
    },
  ],
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
    paymentTerm: 'contado',
  },
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    resetSale: () => {
      return initialState;
    },
    addNewDeliveryToList: (state) => {
      const [newDelivery] = initialState.deliveriesList;
      state.deliveriesList.push(newDelivery);
    },
    removeDeliveryFromList: (state, action: PayloadAction<number>) => {
      const deleteIdx = action.payload;
      if (state.deliveriesList.length > 1) {
        state.deliveriesList.splice(deleteIdx, 1);
      }
    },
    addProductToList: (state, action: PayloadAction<AddProductPayload>) => {
      const { deliveryId, rowData } = action.payload;
      state.deliveriesList[deliveryId].productsList.push(rowData);
    },
    removeProductFromList: (state, action: PayloadAction<RemoveProductPayload>) => {
      const { deliveryId, idx } = action.payload;
      state.deliveriesList[deliveryId].productsList.splice(idx, 1);
    },

    updateProductList: (state, action: PayloadAction<UpdateProductListPayload>) => {
      const { deliveryId, productList } = action.payload;
      state.deliveriesList[deliveryId].productsList = productList;
    },

    updateProductsListItem: (state, action: PayloadAction<UpdateProductPayload>) => {
      const { newProduct, deliveryId } = action.payload;
      const productsList = state.deliveriesList[deliveryId].productsList;

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
    updateDeliverySummary: (
      state,
      action: PayloadAction<{ key: string; value: string | number; deliveryId: number }>
    ) => {
      const { key, value, deliveryId } = action.payload;
      const summary = state.deliveriesList[deliveryId].summary;
      if (summary) {
        state.deliveriesList[deliveryId].summary = {
          ...summary,
          [key as keyof CheckoutData]: value,
        };
      }
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
    addInvoiceObservations: (
      state,
      action: PayloadAction<{ deliveryId: number; observations: string }>
    ) => {
      const { deliveryId, observations } = action.payload;
      const invoiceObservations = state.deliveriesList[deliveryId].invoiceObservations;
      if (invoiceObservations) {
        invoiceObservations.text = observations;
      }
    },
    isInvoiceObservationsTextInvalid: (
      state,
      action: PayloadAction<{ deliveryId: number; isInvalid: boolean }>
    ) => {
      const { deliveryId, isInvalid } = action.payload;
      const invoiceObservations = state.deliveriesList[deliveryId].invoiceObservations;
      if (invoiceObservations) {
        invoiceObservations.areInvalid = isInvalid;
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
  updateDeliverySummary,
  updateClientPaymentTerm,
  addInvoiceObservations,
  isInvoiceObservationsTextInvalid,
  addNewDeliveryToList,
  removeDeliveryFromList,
  updateCheckoutData,
} = salesSlice.actions;
export const selectSales = (state: RootState): SalesState => state.sales;
export default salesSlice.reducer;

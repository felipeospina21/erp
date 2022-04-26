import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
// import type { Firestore } from "firebase/firestore";
import { RootState } from "../store";

export interface DecreaseStockParams {
  db: any;
  rowsData: Product[];
}

export interface Product {
  id?: number;
  alias?: string;
  name?: string;
  price?: number;
  stock: number;
  subtotal?: number;
  quantity: number;
  itemId?: string;
  discount?: number;
  item?:string;
}

export interface ProductsState {
  list: Product[];
  status: string | undefined;
}
const initialState: ProductsState = {
  list: [],
  status: undefined,
};

export const getProducts = createAsyncThunk<any[], any, { state: RootState }>(
  "products/getProducts",
  async (db) => {
    const prodsColl = collection(db, "productos");
    return getDocs(prodsColl)
      .then((snapshot) => snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      .then((prods) => prods);
  }
);

export const decreaseStock = createAsyncThunk<Product[] | undefined, DecreaseStockParams, { state: RootState }>(
  "products/decreaseStock",
  async (paramsObj, { getState }) => {
    const { products } = getState();
    const { db, rowsData } = paramsObj;
    const updatedObj: any[] = [];
    const prodsRef = collection(db, "productos");

    rowsData.map(async (row) => {
      const { itemId, quantity } = row;
      const product = products.list.filter((product) => product.id === itemId)[0];

      const prodRef = doc(prodsRef, itemId);
      updatedObj.push({ itemId, quantity });

      if (quantity <= product.stock) {
        await updateDoc(prodRef, { stock: product.stock - quantity });
      } else {
        return "error";
      }
    });

    return updatedObj;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(decreaseStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decreaseStock.fulfilled, (state, action) => {
        state.status = "idle";
        action.payload?.map((salesRow) => {
          const product = state.list.filter((product) => product.id === salesRow.itemId)[0];
          if (salesRow.itemId === product.id && salesRow.quantity <= product.stock) {
            product.stock -= salesRow.quantity;
          }
          return state.list;
        });
      });
  },
});

export const {} = productsSlice.actions;
export const selectProducts = (state: RootState): ProductsState => state.products;
export default productsSlice.reducer;

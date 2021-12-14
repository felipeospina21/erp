import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";

const initialState = {
  list: [],
  status: null,
};

export const getProducts = createAsyncThunk("products/getProducts", async db => {
  const prodsColl = collection(db, "productos");
  return getDocs(prodsColl)
    .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    .then(prods => prods);
});

export const decreaseStock = createAsyncThunk(
  "products/updateProducts",
  async (paramsObj, { dispatch, getState }) => {
    const { products } = getState();
    const { db, rowsData } = paramsObj;
    const updatedObj = [];
    const prodsRef = collection(db, "productos");

    rowsData.map(async row => {
      const { itemId, quantity } = row;
      const product = products.list.filter(product => product.id === itemId)[0];

      const prodRef = doc(prodsRef, itemId);
      updatedObj.push({ itemId, quantity });

      if (quantity <= product.stock) {
        await updateDoc(prodRef, { stock: product.stock - quantity });
      } else {
        // console.log(`errorxx ${quantity} > ${product.stock}`);
        return 'error'
      }
    });

    return updatedObj;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    load: state => {
      console.log("products loaded");
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(decreaseStock.pending, state => {
        state.status = "loading";
      })
      .addCase(decreaseStock.fulfilled, (state, action) => {
        state.status = "idle";
        action.payload.map(salesRow => {
          const product = state.list.filter(product => product.id === salesRow.itemId)[0];
          if (salesRow.itemId === product.id && salesRow.quantity <= product.stock) {
            product.stock -= salesRow.quantity;
          }
          return state.list;
        });
      });
  },
});

export const { load, sale, extraReducers } = productsSlice.actions;

export default productsSlice.reducer;

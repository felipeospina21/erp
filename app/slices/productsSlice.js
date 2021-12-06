import { createSlice, createAsyncThunk, useSelector } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
// import { doc, updateDoc } from "firebase/firestore";

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
    const { db, productId, quantity } = paramsObj;

    const product = products.list.filter(product => product.id === productId)[0];
    const prodsRef = collection(db, "productos");
    const prodRef = doc(prodsRef, productId);

    await updateDoc(prodRef, { quantity: product.quantity + 1 });

    return { productId, quantity };
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
        state.list.map(product => {
          if (product.id === action.payload.productId) {
            product.quantity += action.payload.quantity;
          }
          return state.list;
        });
      });
  },
});

export const { load, sale, extraReducers } = productsSlice.actions;

export default productsSlice.reducer;

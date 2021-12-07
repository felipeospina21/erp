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
    // console.log(paramsObj);
    const { products } = getState();
    const { db, rowsData } = paramsObj;

    // const product = products.list.filter(product => product.id === productId)[0];
    const updatedObj = []
    const prodsRef = collection(db, "productos");
    rowsData.map(async row => {
      const { itemId, q } = row;
      const product = products.list.filter(product => product.id === itemId)[0];

      const prodRef = doc(prodsRef, itemId);
      updatedObj.push( { itemId, q });
      await updateDoc(prodRef, { quantity: product.quantity - q });

    });

    return updatedObj
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
        // console.log(action.payload)
        action.payload.map(row => {
          const product = state.list.filter(product => product.id === row.itemId)[0];

          if (row.itemId === product.id) {
            product.quantity -= row.q;
          }
          return state.list;
        });
      });
  },
});

export const { load, sale, extraReducers } = productsSlice.actions;

export default productsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
// import { doc, updateDoc } from "firebase/firestore";

const initialState = {
  list: [],
  status: null,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (db, thunkAPI) => {
    const prodsColl = collection(db, "productos");
    return getDocs(prodsColl)
      .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      .then(prods => prods);
  }
);

export const updateProducts = createAsyncThunk(
  "products/updateProducts",
  async (paramsObj, { dispatch, getState }) => {
    const { products } = getState();
    // console.log(paramsObj.productId)
    const product = products.list.filter(product => product.id === paramsObj.productId);
    console.log(product[0].quantity);
    const prodsRef = collection(paramsObj.db, "productos");
    const prodRef = doc(prodsRef, paramsObj.productId);
    // dispatch(update(paramsObj.productId))
    return updateDoc(prodRef, { quantity: product[0].quantity + 1 });

    // const prodsColl = collection(db, "productos");
    // return getDocs(prodsColl)
    //   .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    //   .then(prods => prods);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    load: state => {
      console.log("products loaded");
    },
    // update: (state, productId) =>{
    //   state.list.map(product=>{
    //     if(product.id === productId){
    //       product.quantity = product.quantity + 10
    //     }
    //     return state.list
    //   })
    // }
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProducts.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [getProducts.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateProducts.fulfilled]: (state, action) => {
      //TODO: The db is getting updated but not the state
      state.list = action.payload;
      // state.list.push(action.payload);
      state.status = "success";
    },
    [updateProducts.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { load, sale, extraReducers } = productsSlice.actions;

export default productsSlice.reducer;

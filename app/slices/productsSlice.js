import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../../firebase/clientApp";

const initialState = {
  id: 0,
  name: "ghee",
  stock: 3,
};

// const getProducts = db => {
//   const prodsColl = collection(db, "productos");
//   getDocs(prodsColl)
//     .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
//     .then(prods => setProducts(prods));
// };
//TODO: Check function, is giving an error
const getFromDb = createAsyncThunk("products/getFromDb", (db, thunkAPI) => {
  const prodsColl = collection(db, "productos");
  getDocs(prodsColl)
    .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    .then(prods => prods);
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    load: state => {
      console.log("products loaded");
    },
    sale: state => {
      state.stock = state.stock - 1;
    },
  },
  extraReducers: builder => {
    builder.addCase(getFromDb, (state, action) => {
      state = action.payload;
    });
  },
});

export const { load, sale, extraReducers } = productsSlice.actions;

export default productsSlice.reducer;

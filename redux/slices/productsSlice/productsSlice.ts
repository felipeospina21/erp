import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface ProductsState {
  status: string | undefined;
}
const initialState: ProductsState = {
  status: undefined,
};

// export const decreaseStock = createAsyncThunk<Product[] | undefined, DecreaseStockParams, { state: RootState }>(
//   "products/decreaseStock",
//   async (paramsObj, { getState }) => {
//     const { products } = getState();
//     const { db, rowsData } = paramsObj;
//     const updatedObj: any[] = [];
//     const prodsRef = collection(db, "productos");

//     rowsData.map(async (row) => {
//       const { itemId, quantity } = row;
//       const product = products.list.filter((product) => product.id === itemId)[0];

//       const prodRef = doc(prodsRef, itemId);
//       updatedObj.push({ itemId, quantity });

//       if (quantity <= product.stock) {
//         await updateDoc(prodRef, { stock: product.stock - quantity });
//       } else {
//         return "error";
//       }
//     });

//     return updatedObj;
//   }
// );

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export const {} = productsSlice.actions;
export const selectProducts = (state: RootState): ProductsState => state.products;
export default productsSlice.reducer;

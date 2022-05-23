import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export interface ProductsState {
  status: string | undefined;
}
const initialState: ProductsState = {
  status: 'idle',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

// export const {} = productsSlice.actions;
export const selectProducts = (state: RootState): ProductsState => state.products;
export default productsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

export interface Shipping {
  bogota: {
    [productId: string]: number;
  };
}

const initialState: Shipping = {
  bogota: {
    '62a2174bb12bc37907cad55e': 796, //ghee 315
    '62a2174bb12bc37907cad55f': 405, //ghee 160
    '62a2174bb12bc37907cad561': 450, //alm 200
    '62a2174bb12bc37907cad563': 483, //mar 200
    '62a3840e7de659429acee27c': 450, //test
  },
};

export const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {},
});

// export const {} = shippingSlice.actions;
export const selectShipping = (state: RootState): Shipping => state.shipping;
export default shippingSlice.reducer;

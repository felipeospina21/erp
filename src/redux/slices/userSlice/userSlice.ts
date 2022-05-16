import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

export interface UserState {
  authToken: string;
}
const initialState: UserState = {
  authToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
  },
});

export const { setToken } = userSlice.actions;
export const selectUser = (state: RootState): UserState => state.user;
export default userSlice.reducer;

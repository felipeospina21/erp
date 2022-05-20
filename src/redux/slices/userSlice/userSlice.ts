import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

export interface UserState {
  isLoggedin: boolean;
  email: string;
}
const initialState = {
  isLoggedin: false,
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { isLoggedin, email } = action.payload;
      state.isLoggedin = isLoggedin;
      state.email = email;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState): UserState => state.user;
export default userSlice.reducer;

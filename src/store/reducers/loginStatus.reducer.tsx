import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IInitState {
  loading: boolean;
  data: any;
  statusCode: Number;
  errorMessage: string;
}

const initialState: IInitState = {
  loading: false,
  data: {},
  statusCode: 0,
  errorMessage: '',
};

export const loginStatus = createSlice({
  name: 'loginStatus',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.data = {};
      state.statusCode = 0;
      state.errorMessage = '';
    },
    loginFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = {};
      state.statusCode = action.payload.statusCode;
      state.errorMessage = action.payload.data.message;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.errorMessage = '';
    },
  },
});

export const { loginStart, loginFailure, loginSuccess } = loginStatus.actions;

export const loginStatusState = (state: RootState) => state.loginStatus;

export default loginStatus.reducer;

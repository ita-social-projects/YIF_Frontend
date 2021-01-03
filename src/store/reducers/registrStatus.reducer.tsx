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

export const registrStatus = createSlice({
  name: 'registrStatus',
  initialState,
  reducers: {
    registrStart: (state) => {
      state.loading = true;
      state.data = {};
      state.statusCode = 0;
      state.errorMessage = '';
    },
    registrFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = {};
      state.statusCode = action.payload.statusCode;
      state.errorMessage = action.payload.data.message;
    },
    registrSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.errorMessage = '';
    },
  },
});

export const {
  registrStart,
  registrFailure,
  registrSuccess,
} = registrStatus.actions;

export const registrStatusState = (state: RootState) => state.registrStatus;

export default registrStatus.reducer;

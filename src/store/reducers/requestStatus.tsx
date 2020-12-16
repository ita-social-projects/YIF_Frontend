import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IInitState {
  loading: boolean;
  error: boolean;
  succes: boolean;
}

const initialState: IInitState = {
  loading: false,
  error: false,
  succes: false,
};

export const requestStatus = createSlice({
  name: 'requestStatus',
  initialState,
  reducers: {
    requestStart: (state) => {
      state.loading = true;
      state.error = false;
      state.succes = false;
    },
    requestFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.succes = false;
    },
    requestSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.succes = true;
    },
  },
});

export const {
  requestStart,
  requestFailure,
  requestSuccess,
} = requestStatus.actions;

export const requestStatusState = (state: RootState) => state.requestStatus;

export default requestStatus.reducer;

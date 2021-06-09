import { createSlice } from '@reduxjs/toolkit';
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

export const errorBoundryStatus = createSlice({
  name: 'errorBoundryStatus',
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
} = errorBoundryStatus.actions;

export const errorBoundryStatusState = (state: RootState) =>
  state.errorBoundryStatus;

export default errorBoundryStatus.reducer;

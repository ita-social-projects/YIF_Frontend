import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface getData_ {
  value: {
    direction: string[];
    speciality: string[];
    university: string[];
  };
}

const initialState: getData_ = {
  value: {
    direction: [
      'Напрям 1',
      'Напрям 2',
      'Напрям 3',
      'Напрям 4',
      'Напрям 5',
      'Напрям 6',
    ],
    speciality: [
      'Спеціальність 1',
      'Спеціальність 2',
      'Спеціальність 3',
      'Спеціальність 4',
      'Спеціальність 5',
      'Спеціальність 6',
    ],
    university: [
      'Університет 1',
      'Університет 2',
      'Університет 3',
      'Університет 4',
      'Університет 5',
      'Університет 6',
    ],
  },
};

export const dropboxSlice = createSlice({
  name: 'dropbox',
  initialState,
  reducers: {
    SET_DATA: (state, action: PayloadAction<object>) => {
      Object.assign(state.value, action.payload);
    },
  },
});

export const { SET_DATA } = dropboxSlice.actions;

export const selectData = (state: RootState) => state.dropbox.value;

export default dropboxSlice.reducer;

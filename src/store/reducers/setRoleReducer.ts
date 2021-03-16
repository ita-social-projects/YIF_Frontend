import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface RoleState {
  role: string;
}

const initialState = {
  role: '',
} as RoleState;

const roleSlice = createSlice({
  name: 'currentRole',
  initialState,
  reducers: {
    setRoleReducer(state, action) {
      return {
        ...state,
        role: action.payload,
      };
    },
    removeRoleReducer(state) {
      return {
        ...state,
        role: '',
      };
    },
  },
});

export const { setRoleReducer, removeRoleReducer } = roleSlice.actions;
export default roleSlice.reducer;

export const roleSelector = (state: RootState) => state.currentRole;

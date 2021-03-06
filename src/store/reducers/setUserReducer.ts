import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface UserState {
  surname: string;
  name: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  schoolName: string;
  photo: string;
}

const localStorageUser = localStorage.getItem('user');

const changeUserLocalStorage = (key: string, value: string) => {
  const data = JSON.parse(localStorage.user);
  for (let keyData in data) {
    if (keyData === key) {
      data[keyData] = value;
      break;
    }
  }
  localStorage.setItem('user', JSON.stringify(data));
};
const formatData = (data: any) => {
  let result: any = {};

  for (let prop in data) {
    data[prop] !== null && data[prop] !== 'unknown'
      ? (result[prop] = data[prop])
      : (result[prop] = '');
  }
  return result;
};

const initialState = localStorageUser
  ? JSON.parse(localStorage.getItem('user')!)
  : ({
      surname: '',
      name: '',
      middleName: '',
      email: '',
      phoneNumber: '',
      schoolName: '',
      photo: '',
    } as UserState);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserReducer(state, action) {
      const payload = formatData(action.payload);
      for (let prop in payload) {
        state[prop] = payload[prop];
      }
      localStorage.setItem('user', JSON.stringify(state));
    },
    setUserPhoto(state, action) {
      changeUserLocalStorage('photo', action.payload.photo);
      return {
        ...state,
        photo: action.payload.photo,
      };
    },
    removeUserReducer(state) {
      for (let prop in state) {
        state[prop] = '';
      }
      localStorage.removeItem('user');
    },
  },
});

export const {
  setUserReducer,
  removeUserReducer,
  setUserPhoto,
} = userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state: RootState) => state.user;

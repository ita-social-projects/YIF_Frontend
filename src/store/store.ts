import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dropboxReducer from '../store/reducers/dropboxReducer';
import counterReducer from '../components/counter/counterSlice';
import requestStatusReducer from './reducers/requestStatus';
import loginStatusReducer from './reducers/loginStatus.reducer';
import registrStatusReducer from './reducers/registrStatus.reducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dropbox: dropboxReducer,
    requestStatus: requestStatusReducer,
    loginStatus: loginStatusReducer,
    registrStatus: registrStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

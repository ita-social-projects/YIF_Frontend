import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dropboxReducer from '../store/reducers/dropboxReducer';
//import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import requestStatusReducer from './reducers/requestStatus';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dropbox: dropboxReducer,
    requestStatus: requestStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

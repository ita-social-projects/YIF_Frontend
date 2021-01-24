import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dropboxReducer from '../store/reducers/dropboxReducer';
import errorBoundryStatusReducer from './reducers/errorBoundryStatus.reducer';
import setUserReducer from './reducers/setUserReducer';

export const store = configureStore({
  reducer: {
    dropbox: dropboxReducer,
    errorBoundryStatus: errorBoundryStatusReducer,
    user: setUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../components/counter/counterSlice";
import dropboxReducer from '../store/reducers/dropboxReducer'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dropbox: dropboxReducer,  
  },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;





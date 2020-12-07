import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store/store";

interface getData_{
    value:{
      direction:string[],
      speciality:string[],
      university:string[],
    }
  }
  
  const initialState: getData_ = {
    value:{
      direction:['d1','d2','d3','d4','d5','d6'],
      speciality:['s1','s2','s3','s4','s5','s6'],
      university:['u1','u2','u3','u4','u5','u6'],
    },
  };
  
  export const dropboxSlice = createSlice({
    name: "dropbox",
    initialState,
    reducers: {     
      SET_DATA: (state, action: PayloadAction<object>) => {
        Object.assign(state.value,action.payload);
      },
    },
  });
  
  export const {SET_DATA} = dropboxSlice.actions;
  
  export const selectData = (state: RootState) => state.dropbox.value;
  
  export default dropboxSlice.reducer;


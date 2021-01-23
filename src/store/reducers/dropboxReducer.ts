import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface getData_{
    value:{
      direction:string[],
      speciality:string[],
      university:string[],
    }
  }
  
  const initialState: getData_ = {
    value:{
      direction:['Напрям 1'],
      speciality:['Спеціальність 1'],
      university:['Університет 1'],
    },
  };
  
  export const dropboxSlice = createSlice({
    name: "dropbox",
    initialState,
    reducers: {     
      setUniversity: (state, action: PayloadAction<string[]>) => {
        let i = 0;
        action.payload.forEach((item)=>{
          state.value.university[i]=item;
          i++;
        })
      },
      setSpeciality: (state, action: PayloadAction<string[]>) => {
        let i = 0;
        action.payload.forEach((item)=>{
          state.value.speciality[i]=item;
          i++;
        })
      },
      setDirection: (state, action: PayloadAction<string[]>) => {
        let i = 0;
        action.payload.forEach((item)=>{
          state.value.direction[i]=item;
          i++;
        })
      },

    },
  });
  
  export const {setUniversity,setSpeciality,setDirection} = dropboxSlice.actions;
  
  export const selectData = (state: RootState) => state.dropbox.value;
  
  export default dropboxSlice.reducer;


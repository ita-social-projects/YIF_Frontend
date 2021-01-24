import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface getData_{
    value:{
      direction:string[],
      speciality:string[],
      university:string[],
    },
    chosenValue:{
      direction:string,
      speciality:string,
      university:string,
    }
  }
  
  const initialState: getData_ = {
    value:{
      direction:['Напрям 1'],
      speciality:['Спеціальність 1'],
      university:['Університет 1'],
    },
    chosenValue:{
      direction:'',
      speciality:'',
      university:'',
    }
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
      chooseUniversity:(state, action: PayloadAction<string>)=>{
        state.chosenValue.university = action.payload;
      },
      chooseSpeciality:(state, action: PayloadAction<string>)=>{
        state.chosenValue.speciality = action.payload;
      },
      chooseDirection:(state, action: PayloadAction<string>)=>{
        state.chosenValue.direction = action.payload;
        console.log('chooseDeriction');
      },

    },
  });
  
  export const {setUniversity,setSpeciality,setDirection,chooseUniversity,chooseSpeciality,chooseDirection} = dropboxSlice.actions;
  
  export const selectData = (state: RootState) => state.dropbox.value;
  export const selectChosenData = (state: RootState) => state.dropbox.chosenValue;
  
  export default dropboxSlice.reducer;


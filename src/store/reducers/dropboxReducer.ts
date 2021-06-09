import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface getData_ {
  value: {
    direction: string[];
    speciality: string[];
    institutionOfEducation: string[];
  };
  chosenValue: {
    direction: string;
    speciality: string;
    institutionOfEducation: string;
  };
}

const initialState: getData_ = {
  value: {
    direction: ['Напрям 1'],
    speciality: ['Спеціальність 1'],
    institutionOfEducation: ['Університет 1'],
  },
  chosenValue: {
    direction: '',
    speciality: '',
    institutionOfEducation: '',
  },
};

export const dropboxSlice = createSlice({
  name: 'dropbox',
  initialState,
  reducers: {
    setInstitutionOfEducation: (state, action: PayloadAction<string[]>) => {
      let i = 0;
      state.value.institutionOfEducation.splice(0); // reset size of array
      action.payload.forEach((item) => {
        state.value.institutionOfEducation[i] = item;
        i++;
      });
    },
    setSpeciality: (state, action: PayloadAction<string[]>) => {
      let i = 0;
      state.value.speciality.splice(0);
      action.payload.forEach((item) => {
        state.value.speciality[i] = item;
        i++;
      });
    },
    setDirection: (state, action: PayloadAction<string[]>) => {
      let i = 0;
      state.value.direction.splice(0);
      action.payload.forEach((item) => {
        state.value.direction[i] = item;
        i++;
      });
    },
    chooseInstitutionOfEducation: (state, action: PayloadAction<string>) => {
      state.chosenValue.institutionOfEducation = action.payload;
    },
    chooseSpeciality: (state, action: PayloadAction<string>) => {
      state.chosenValue.speciality = action.payload;
    },
    chooseDirection: (state, action: PayloadAction<string>) => {
      state.chosenValue.direction = action.payload;
      console.log('chooseDeriction');
    },
  },
});

export const {
  setInstitutionOfEducation,
  setSpeciality,
  setDirection,
  chooseInstitutionOfEducation,
  chooseSpeciality,
  chooseDirection,
} = dropboxSlice.actions;

export const selectData = (state: RootState) => state.dropbox.value;
export const selectChosenData = (state: RootState) => state.dropbox.chosenValue;

export default dropboxSlice.reducer;

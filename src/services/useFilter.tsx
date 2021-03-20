import { useEffect } from 'react';
import { requestData } from '../services/requestDataFunction';
import {
  setInstitutionOfEducation,
  setSpeciality,
  setDirection,
} from '../store/reducers/dropboxReducer';
import { useDispatch } from 'react-redux';

export const useGetAllListData = (endpoint: string, action: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    requestData(endpoint, 'GET')
      .then((res: any) => {
        //store data to state
        let names: string[] = res.data;
        switch (action) {
          case 'setInstitutionOfEducation':
            dispatch(setInstitutionOfEducation(names));
            break;
          case 'setSpeciality':
            dispatch(setSpeciality(names));
            break;
          case 'setDirection':
            dispatch(setDirection(names));
            break;
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
};

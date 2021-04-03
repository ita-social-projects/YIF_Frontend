import { requestSecureData } from './requestDataFunction';
import { APIUrl } from '../../src/services/endpoints';
import { store } from '../store/store';
import { setUserReducer } from '../store/reducers/setUserReducer';

export const getUser = (token) => {
  requestSecureData(`${APIUrl}Users/Current`, 'GET', token)
    .then((res) => {
      const statusCode = res.statusCode.toString();
      if (statusCode.match(/^[23]\d{2}$/)) {
        store.dispatch(setUserReducer(res.data));
      } else {
        console.log(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

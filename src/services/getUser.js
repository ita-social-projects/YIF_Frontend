import { requestSecureData } from './requestDataFunction';
import { APIUrl } from '../../src/services/endpoints';
import { store } from '../store/store';
import { setUserReducer } from '../store/reducers/setUserReducer';

export const getUser = (token) => {
  requestSecureData(`${APIUrl}Users/Current`, 'GET', token)
    .then((res) => {
      const statusCode = res.statusCode.toString();
      if (statusCode.match(/^[23]\d{2}$/)) {
        console.log('get user: good');
        store.dispatch(setUserReducer(res.data));
      } else {
        console.log(res.data.message);
        console.log('get user: bad');
      }
    })
    .catch((error) => {
      console.log(error);
      console.log('get user: bad bad');
    });
};

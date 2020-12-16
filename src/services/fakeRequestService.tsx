import {
  requestStart,
  requestSuccess,
  requestFailure,
} from '../store/reducers/requestStatus';

const fakeRequestService = () => {
  return function (dispatch: any) {
    dispatch(requestStart());
    return fetch('https://jsonplaceholder.typicode.com/todos/')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((json) => {
        dispatch(requestSuccess());
        console.log(json);
      })
      .catch((error) => {
        dispatch(requestFailure());
      });
  };
};
export default fakeRequestService;

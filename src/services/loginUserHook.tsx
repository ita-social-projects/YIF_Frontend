import {
  loginStart,
  loginFailure,
  loginSuccess,
} from '../store/reducers/loginStatus.reducer';
import { RequestData } from '../services/requestDataFunction';

const APIUrl: string = 'https://yifbackend.tk/api/Authentication/LoginUser';

const LoginUserHook = (email: string, password: string) => {
  return function (dispatch: any) {
    const loginUser = { email, password };

    dispatch(loginStart());

    return RequestData(APIUrl, 'POST', loginUser)
      .then((json: any) => {
        if (json.statusCode === 201 || json.statusCode === 200) {
          dispatch(loginSuccess(json));
        } else {
          dispatch(loginFailure(json));
        }
      })
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  };
};

export default LoginUserHook;

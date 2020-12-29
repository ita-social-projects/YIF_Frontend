import {
  registrStart,
  registrFailure,
  registrSuccess,
} from '../store/reducers/registrStatus.reducer';
import { RequestData } from '../services/requestDataFunction';

const APIUrl: string = 'https://yifbackend.tk/api/Authentication/RegisterUser';

const RegistrUserHook = (
  email: string,
  username: string,
  password: string,
  confirmPassword: string
) => {
  const registerUser = { email, username, password, confirmPassword };
  return function (dispatch: any) {
    dispatch(registrStart());

    return RequestData(APIUrl, 'POST', registerUser)
      .then((json: any) => {
        if (json.statusCode === 201 || json.statusCode === 200) {
          dispatch(registrSuccess(json));
        } else {
          dispatch(registrFailure(json));
        }
      })
      .catch((error) => {
        dispatch(registrFailure(error));
      });
  };
};

export default RegistrUserHook;

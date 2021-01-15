
import { useState } from 'react';
import { requestData } from '../services/requestDataFunction';
import { useHistory } from 'react-router-dom';
import { useAuth } from './tokenValidator';
import { APIUrl } from '../../src/services/endpoints';
import {useCaptcha} from "./useCaptcha";

const useRegistration = (endpoint: string) => {

  const captcha= useCaptcha(APIUrl);
  const { updateToken } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState({ email: '' });
  const [password, setPassword] = useState({ password: '' });
  const [confirmPassword, setConfirmPassword] = useState({
    confirmPassword: '',
  });

  const [submitted, setSubmitted] = useState({ submitted: false });
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail({
      email: value,
    });
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword({
      password: value,
    });
  };
  const handleChangeConfirmPassword = (
      e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setConfirmPassword({
      confirmPassword: value,
    });
  };

  const handleSubmit = async (
      e: React.ChangeEvent<HTMLFormElement>,
      pathToRedirect: string
  ) => {
    e.preventDefault();

    setSubmitted({ submitted: true });
    setError({ hasError: false, errorStatusCode: '', errorMessage: '' });

    const token = await captcha.getCaptchaToken();

    requestData(`${endpoint}Authentication/RegisterUser`, 'POST', {

      email: email.email,
      username: email.email,
      password: password.password,
      confirmPassword: confirmPassword.confirmPassword,
      recaptchaToken: token,
    })
        .then((res: any) => {
          const statusCode = res.statusCode.toString();
          if (statusCode.match(/^[23]\d{2}$/)) {
            setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
            updateToken(res.data.token, res.data.refreshToken);
            history.push(pathToRedirect);
          } else {
            setError({
              hasError: true,
              errorStatusCode: res.statusCode,
              errorMessage: res.data.message || 'Щось пішло не так, спробуйте знову.',
            });
          }
        })
      .catch((error) => {
        setError({
          hasError: true,
          errorStatusCode: error.statusCode,
          errorMessage: 'Щось пішло не так, спробуйте знову.',
        });
      });
  };
  return {
    handleChangeEmail,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleSubmit,
    email,
    password,
    confirmPassword,
    submitted,
    error,
  };
};

export default useRegistration;

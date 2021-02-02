import { useState } from 'react';
import { requestData } from '../services/requestDataFunction';
import { useHistory } from 'react-router-dom';
import { useAuth } from './tokenValidator';
import { APIUrl } from '../../src/services/endpoints';
import { useCaptcha } from './useCaptcha';
import { getUser } from './getUser';

const useLogin = (endpoint: string) => {
  const captcha = useCaptcha(APIUrl);
  const history = useHistory();
  const { updateToken } = useAuth();
  const [email, setEmail] = useState({ email: '' });
  const [password, setPassword] = useState({ password: '' });
  const [submitted, setSubmitted] = useState({ submitted: false });
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
    redirectLink: '',
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
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };
  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>,
    pathToRedirect: string
  ) => {
    e.preventDefault();
    setSubmitted({ submitted: true });
    setError({
      hasError: false,
      errorStatusCode: '',
      errorMessage: '',
      redirectLink: '',
    });

    const token = await captcha.getCaptchaToken();

    requestData(`${endpoint}Authentication/LoginUser`, 'POST', {
      email: email.email,
      password: password.password,
      recaptchaToken: token,
    })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setError({
            hasError: false,
            errorStatusCode: '',
            errorMessage: '',
            redirectLink: '',
          });
          updateToken(res.data.token, res.data.refreshToken);
          getUser(res.data.token);
          history.push(pathToRedirect); //can be deleted ?
        } else {
          setError({
            hasError: true,
            errorStatusCode: res.statusCode,
            errorMessage:
              res.data.message || 'Щось пішло не так, спробуйте знову.',
            redirectLink: res.data.redirectLink || '',
          });
        }
      })
      .catch((error) => {
        setError({
          hasError: true,
          errorStatusCode: error.statusCode,
          errorMessage: 'Щось пішло не так, спробуйте знову.',
          redirectLink: '',
        });
      });
  };
  return {
    handleChangeEmail,
    handleChangePassword,
    handleLogOut,
    handleSubmit,
    email,
    password,
    submitted,
    error,
  };
};

export default useLogin;

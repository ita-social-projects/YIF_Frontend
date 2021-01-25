import { useState } from 'react';
import { requestData } from '../services/requestDataFunction';
import { useHistory } from 'react-router-dom';
import { useAuth } from './tokenValidator';
import { APIUrl } from '../../src/services/endpoints';
import { useCaptcha } from './useCaptcha';

const useResetPasword = (endpoint: string) => {
  const captcha = useCaptcha(APIUrl);
  const history = useHistory();
  const { updateToken } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };
  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>,
    pathToRedirect: string
  ) => {
    e.preventDefault();
    setSubmitted(true);
    setError({ hasError: false, errorStatusCode: '', errorMessage: '' });

    const token = await captcha.getCaptchaToken();

    requestData(`${endpoint}Users/ResetPassword`, 'POST', {
      userEmail: email,
      recaptchaToken: token,
    })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
          updateToken(res.data.token, res.data.refreshToken);
          setSubmitted(false);
          setSuccess(true);
          setTimeout(() => {
            history.push(pathToRedirect);
          }, 3000);
        } else {
          setError({
            hasError: true,
            errorStatusCode: res.statusCode,
            errorMessage:
              res.data.message || 'Щось пішло не так, спробуйте знову.',
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
    handleSubmit,
    email,
    submitted,
    setSubmitted,
    error,
    setError,
    success,
    setSuccess,
  };
};

export default useResetPasword;

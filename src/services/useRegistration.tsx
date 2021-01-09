import { useState } from 'react';
import { requestData } from '../services/requestDataFunction';
import { useHistory } from 'react-router-dom';
import { useAuth } from './tokenValidator';

const useRegistration = (endpoint: string) => {
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
  const handleSubmit = (
    e: React.ChangeEvent<HTMLFormElement>,
    pathToRedirect: string
  ) => {
    e.preventDefault();
    setSubmitted({ submitted: true });
    setError({ hasError: false, errorStatusCode: '', errorMessage: '' });

    requestData(endpoint, 'POST', {
      email: email.email,
      username: email.email,
      password: password.password,
      confirmPassword: confirmPassword.confirmPassword,
    })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
          // localStorage.setItem('token', res.data.token);
          // localStorage.setItem('refreshToken', res.data.refreshToken);
          updateToken(res.data.token, res.data.refreshToken);
          history.push(pathToRedirect);
        } else {
          setError({
            hasError: true,
            errorStatusCode: res.statusCode,
            errorMessage: res.data.message || 'something gone wrong',
          });
        }
      })
      .catch((error) => {
        setError({
          hasError: true,
          errorStatusCode: error.statusCode,
          errorMessage: 'something gone wrong',
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

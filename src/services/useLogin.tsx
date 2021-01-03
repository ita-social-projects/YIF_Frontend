import { useState } from 'react';
import { requestData } from '../services/requestDataFunction';
import { useHistory } from 'react-router-dom';

const useLogin = (endpoint: string) => {
  const history = useHistory();
  const [email, setEmail] = useState({ email: '' });
  const [password, setPassword] = useState({ password: '' });
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
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
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
      password: password.password,
    })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('refreshToken', res.data.refreshToken);
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
    handleLogOut,
    handleSubmit,
    email,
    password,
    submitted,
    error,
  };
};

export default useLogin;

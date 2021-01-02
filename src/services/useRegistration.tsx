import { useState } from 'react';
import { RequestData } from '../services/requestDataFunction';

const useRegistration = (endpoint: string) => {
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
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted({
      submitted: true,
    });

    RequestData(endpoint, 'POST', {
      email: email.email,
      username: email.email,
      password: password.password,
      confirmPassword: confirmPassword.confirmPassword,
    })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('refreshToken', res.data.refreshToken);
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
          errorMessage: error.data.message || 'something gone wrong',
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

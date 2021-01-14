import React, { useState } from 'react';
import { requestData } from '../services/requestDataFunction';
import { useAuth } from './tokenValidator';

const useProfile = (endpoint: string) => {
  const { token, isExpired, isRefreshing, user, getToken } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email);
  const [school, setSchool] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFirstName(value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLastName(value);
  };

  const handleFathersNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFathersName(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSchool(value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
    if (isExpired && !isRefreshing) getToken();
    requestData(endpoint, 'POST', {
      firstName,
      lastName,
      fathersName,
      email,
      phone,
      school,
    })
      .then((res: any) => {
        if (res.ok) {
          setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
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
    handleFirstNameChange,
    handleLastNameChange,
    handleFathersNameChange,
    handlePhoneChange,
    handleEmailChange,
    handleSchoolChange,
    handleSubmit,
    firstName,
    lastName,
    fathersName,
    phone,
    email,
    school,
    submitted,
    error,
  };
};

export default useProfile;

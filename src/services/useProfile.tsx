import React, { useState } from 'react';
import { requestData } from '../services/requestDataFunction';
import { useAuth } from './tokenValidator';

const useProfile = (endpoint: string) => {
  const { token, isExpired, user, getToken } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
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

  const handleMiddleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMiddleName(value);
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
    if (isExpired) getToken();
    requestData(endpoint, 'POST', {
      token,
      firstName,
      lastName,
      middleName,
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
            errorMessage: res.data.message || 'Something went wrong',
          });
        }
      })
      .catch((error) => {
        setError({
          hasError: true,
          errorStatusCode: error.statusCode,
          errorMessage: 'Something went wrong',
        });
      });
  };
  return {
    handleFirstNameChange,
    handleLastNameChange,
    handleMiddleNameChange,
    handlePhoneChange,
    handleEmailChange,
    handleSchoolChange,
    firstName,
    lastName,
    middleName,
    phone,
    email,
    school,
    submitted,
    error,
  };
};

export default useProfile;

import React, { useState } from 'react';
import { requestSecureData } from '../services/requestDataFunction';
import { useAuth } from './tokenValidator';
import { APIUrl } from '../../src/services/endpoints';

const useProfile = (endpoint: string) => {
  const {
    isExpired,
    isRefreshing,
    user,
    getToken,
    updateUserProfile,
  } = useAuth();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState(user?.email);
  const [schoolName, setSchoolName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSurname(value);
  };

  const handleFathersNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMiddleName(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNumber(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSchoolName(value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
    if (isExpired && !isRefreshing) getToken();
    requestSecureData(`${APIUrl}Users/SetCurrentProfile`, 'POST', {
      name,
      surname,
      middleName,
      email,
      phoneNumber,
      schoolName,
    })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
          setSubmitted(false);
          console.log('succes kinda');
          localStorage.setItem('user', JSON.stringify(res.data));
          updateUserProfile();
        } else {
          setError({
            hasError: true,
            errorStatusCode: res.statusCode,
            errorMessage:
              res.data.message || 'Щось пішло не так, спробуйте знову.',
          });
          console.log('bad');
        }
      })
      .catch((error) => {
        setError({
          hasError: true,
          errorStatusCode: error.statusCode,
          errorMessage: 'Щось пішло не так, спробуйте знову.',
        });
        console.log('bad bad');
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
    name,
    surname,
    middleName,
    phoneNumber,
    email,
    schoolName,
    submitted,
    error,
  };
};

export default useProfile;

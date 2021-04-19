import React, { useState, useEffect } from 'react';
import { requestSecureData } from '../services/requestDataFunction';
import { useAuth } from './tokenValidator';
import { store } from '../store/store';
import { setUserReducer, userSelector } from '../store/reducers/setUserReducer';
import { useSelector } from 'react-redux';

const useProfile = (endpoint: string) => {
  const user = useSelector(userSelector);

  const { getToken } = useAuth();
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [middleName, setMiddleName] = useState(user.middleName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [schoolName, setSchoolName] = useState(user.schoolName);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successStatusCode: '',
    successMessage: '',
  });

  useEffect(() => {
    setName(user.name);
    setSurname(user.surname);
    setMiddleName(user.middleName);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setSchoolName(user.schoolName);
  }, [user]);

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

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
    setSuccess({
      hasSuccess: false,
      successStatusCode: '',
      successMessage: '',
    });
    const currentToken = await getToken();
    requestSecureData(endpoint, 'POST', currentToken, {
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
          setSuccess({
            hasSuccess: true,
            successStatusCode: res.statusCode,
            successMessage: res.data.message || 'Дані збережені',
          });
          setTimeout(() => {
            setSuccess({
              hasSuccess: false,
              successStatusCode: '',
              successMessage: '',
            });
          }, 3000);
          store.dispatch(setUserReducer(res.data));
          setSubmitted(false);
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
    name,
    surname,
    middleName,
    phoneNumber,
    email,
    schoolName,
    submitted,
    error,
    success,
    setError,
  };
};

export default useProfile;

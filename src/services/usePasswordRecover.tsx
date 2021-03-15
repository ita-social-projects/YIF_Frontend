import { useState, useEffect } from 'react';
import { useCaptcha } from './useCaptcha';
import { APIUrl } from '../../src/services/endpoints';
import { requestData } from './requestDataFunction';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const usePasswordRecover = () => {
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const captchaToken = useCaptcha(APIUrl);
  const redirect = useHistory();
  const urlData = window.location.search;
  const parseURL = () => {
    let urlParam: any = {};
    urlData
      .substring(1)
      .split('&')
      .forEach((item) => {
        let param = item.split('=');
        urlParam[param[0]] = param[1];
      });
    return urlParam;
  };

  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Пароль має містити мінімум 8 символів')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])/,
        'Пароль повинен містити різні типи символів: цифри, латинські букви у верхньому та нижньому регістрі та спецсимволи.'
      )
      .required('Заповніть поле'),

    confirmPassword: Yup.string()
      .min(8, 'Пароль має містити мінімум 8 символів')
      .oneOf([Yup.ref('password'), null], 'Паролі мають співпадати')
      .required('Заповніть поле'),
  });

  const handleFormSubmit = async (values: any) => {
    setSubmiting(true);
    const captcha = await captchaToken.getCaptchaToken();
    const { id, token } = parseURL();
    const { password, confirmPassword } = values;
    const bodyData = {
      userId: id,
      token: token,
      newPassword: password,
      confirmNewPassword: confirmPassword,
      recaptchaToken: captcha,
    };
    const sendNewPassword = requestData(
      `${APIUrl}Users/Restore`,
      'PUT',
      bodyData
    );

    sendNewPassword
      .then((res) => {
        if (res.statusCode.toString().match(/^[23]\d{2}$/)) {
          setStatus(true);
          setSubmiting(false);
          setTimeout(() => {
            redirect.push('/login');
          }, 3000);
        } else if (res.statusCode.toString().match(/^[4-5][0-9][0-9]$/)) {
          setError(true);
          setTimeout(() => {
            setSubmiting(false);
          }, 1000);
          setTimeout(() => {
            setError(false);
          }, 3000);
        } else {
          setStatus(false);
        }
        console.log(`res: ${JSON.stringify(res, null, 2)}`);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });

    console.log(status);
    console.log(error);
  };

  return {
    passwordValidationSchema,
    status,
    error,
    submiting,
    handleFormSubmit,
  };
};

export default usePasswordRecover;

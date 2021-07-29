import React, { useState } from 'react';
import Spinner from '../common/spinner';
import { Field, Formik, Form } from 'formik';
import styles from './newPassword.module.scss';
import parseURL from '../../services/parseURL';
import { APIUrl } from '../../services/endpoints';
import { useCaptcha } from '../../services/useCaptcha';
import { requestData } from '../../services/requestDataFunction';
import { useHistory } from 'react-router-dom';
import passwordValidationSchema from './recoverPasswordValidation';
import { FormInputSuccess } from '../common/formElements/formInputSuccess/formInputSuccess';
import {
  FormCloseButton,
  FormTitle,
  FormButton,
  FormInput,
  FormInputError,
} from '../common/formElements/index';

type FormikValues = {
  newPassword: string;
  confirmNewPassword: string;
};
const NewPasswordForm: React.FC = () => {
  const [submiting, setSubmiting] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);
  const redirect = useHistory();
  const captcha = useCaptcha(APIUrl);

  function success() {
    setStatus(true);
    setTimeout(() => {
      redirect.push('/login');
    }, 3000);
  }

  function fail() {
    setSubmiting(false);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 2000);
  }

  const handleFormSubmit = async (values: FormikValues) => {
    const recaptchaToken = await captcha.getCaptchaToken();
    const { newPassword, confirmNewPassword } = values;
    const { id, token } = parseURL(window.location.search);
    setSubmiting(true);
    requestData(`${APIUrl}Users/Restore`, 'PUT', {
      userId: id,
      token,
      newPassword,
      confirmNewPassword,
      recaptchaToken,
    })
      .then((res) => {
        res.statusCode.toString().match(/^[23]\d{2}$/) ? success() : fail();
      })
      .catch((e) => {
        fail();
      });
  };

  return (
    <section className={styles.newPasswordContainer}>
      <div className={styles.newPasswordFormWrapper}>
        <FormCloseButton styles={{ top: '15px', right: '15px' }} />

        {submiting && !status && !error && (
          <div>
            <Spinner />
          </div>
        )}
        {status && !error && (
          <div className={styles.elementShowHide}>
            <FormInputSuccess successMessage='Ваш пароль змінено! Ви можете увійти за допомогою нового паролю!' />
          </div>
        )}
        {!submiting && error && (
          <FormInputError
            errorFor='form'
            errorMessage={'Щось пішло не так, спробуйте знову!'}
          />
        )}

        {!submiting && !status && !error && (
          <Formik
            initialValues={{ newPassword: '', confirmNewPassword: '' }}
            validationSchema={passwordValidationSchema}
            onSubmit={handleFormSubmit}
          >
            {() => (
              <>
                {
                  <Form>
                    <FormTitle title='Введіть ваш новий пароль!' />
                    <div>
                      <Field
                        component={FormInput}
                        placeholder={'Пароль'}
                        iconName='lock'
                        type='password'
                        name='newPassword'
                        showIconPassword={true}
                      />
                    </div>
                    <div>
                      <Field
                        component={FormInput}
                        placeholder={'Підтвердіть пароль'}
                        iconName='lock'
                        type='password'
                        name='confirmNewPassword'
                        showIconPassword={true}
                      />
                    </div>
                    <FormButton
                      title={'Зберегти'}
                      id='registerFormButton'
                      data-testid='button'
                      form='register'
                    />
                  </Form>
                }
              </>
            )}
          </Formik>
        )}
      </div>
    </section>
  );
};
export default NewPasswordForm;

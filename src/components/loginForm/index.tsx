import React from 'react';
import styles from './loginForm.module.scss';
import {
  FormButton,
  FormTitle,
  FormTextField,
  FormInput,
  FormCloseButton,
  FormInputError,
} from '../common/formElements';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { validationField } from '../../services/validateForm/ValidatorsField';
import useLogin from '../../services/useLogin';
import Spinner from '../common/spinner';
import { APIUrl } from '../../services/endpoints';

const LoginForm = () => {
  const useYIFLogin = useLogin(APIUrl);

  return (
    <section className={styles.loginFormPage}>
      <div className={styles.loginFormWrap}>
        <div className={styles.imgWrapTop}>
          <img
            src='/assets/images/loginPage1.svg'
            alt='girl'
            className={styles.imgLoginPage}
          />
        </div>
        <FormCloseButton />
        <div>
          <FormTitle title='Вхід' />
          {useYIFLogin.submitted.submitted && !useYIFLogin.error.hasError && (
            <div className={styles.loadingScreen}>
              <Spinner />
            </div>
          )}
          {useYIFLogin.error.hasError && (
            <FormInputError
              errorFor='form'
              errorMessage={useYIFLogin.error.errorMessage}
              redirectLink={useYIFLogin.error.redirectLink}
            />
          )}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationField}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              actions.resetForm({
                values: {
                  email: '',
                  password: '',
                },
              });
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              isValid,
            }) => (
              <Form
                onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
                  handleSubmit(e);
                  if (
                    touched.email &&
                    errors.email === undefined &&
                    errors.password === undefined
                  ) {
                    useYIFLogin.handleSubmit(e);
                  }
                }}
              >
                <div>
                  <Field
                    component={FormInput}
                    iconName='email'
                    id='emailInput'
                    type='email'
                    name='email'
                    placeholder='Електронна пошта'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      useYIFLogin.handleChangeEmail(e);
                    }}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>

                <div>
                  <Field
                    component={FormInput}
                    iconName='lock'
                    showIconPassword={true}
                    id='passwordInput'
                    type='password'
                    name='password'
                    placeholder='Пароль'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      useYIFLogin.handleChangePassword(e);
                    }}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>

                <div className={styles.forgotPassword}>
                  <p>
                    <Link to='/resetPassword'>
                      Забули пароль{' '}
                      <span>
                        <svg
                          width='6'
                          height='9'
                          viewBox='0 0 6 9'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M0 0H1L5.35858 4.35858C5.43668 4.43668 5.43668 4.56332 5.35858 4.64142L1 9H0L4.5 4.5L0 0Z'
                            fill='black'
                          />
                        </svg>
                      </span>
                    </Link>
                  </p>
                </div>

                <FormButton id='loginForm' title='Увійти' form='register' />
              </Form>
            )}
          </Formik>
          <FormTextField text='Ще не зареєстровані?' url='/register' />
        </div>
        <div className={styles.imgWrapBottom}>
          <img
            src='/assets/images/loginPage2.svg'
            alt='window'
            className={styles.imgLoginPage}
          />
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

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
import { Formik, Form, Field } from 'formik';
import { validationField } from '../../services/validateForm/ValidatorsField';

const LoginForm = () => {
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
        <FormTitle title='Вхід' />
        <FormInputError errorType='form' errorMessage='Щось пішло не так' />
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationField}
          onSubmit={(values, actions) => {
            const { password, email } = values;

            actions.setSubmitting(false);
            actions.resetForm({
              values: {
                email: '',
                password: '',
              },
            });
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <Field
                  component={FormInput}
                  iconName='email'
                  type='email'
                  name='email'
                  placeholder='Електронна пошта'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>

              <div>
                <Field
                  component={FormInput}
                  iconName='lock'
                  type='password'
                  name='password'
                  placeholder='Пароль'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>

              <div className={styles.forgotPassword}>
                <p>
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
                </p>
              </div>

              <FormButton title='Увійти' form='register' />
            </Form>
          )}
        </Formik>
        <FormTextField text='Ще не зареєстровані?' url='/register' />
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

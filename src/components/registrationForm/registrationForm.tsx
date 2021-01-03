import classes from './registrationForm.module.scss';
import React from 'react';
import { Field, Formik, Form } from 'formik';
import { validationField } from '../../services/validateForm/ValidatorsField';
import {
  FormButton,
  FormCloseButton,
  FormInput,
  FormInputError,
  FormTextField,
  FormTitle,
} from '../common/formElements';
import useRegistration from '../../services/useRegistration';
import Spinner from '../common/spinner';

const RegistrationForm: React.FC = () => {
  const APIUrl: string =
    'https://yifbackend.tk/api/Authentication/RegisterUser';
  const useYIFRegistration = useRegistration(APIUrl);

  return (
    <section role='section' className={classes.wrapper}>
      <div role='wrapper' className={classes.form}>
        <div className={classes.wrapperImg}>
          <img src='/assets/images/imgRegistration.svg' alt='win' />
        </div>
        <FormCloseButton />
        <FormTitle title='Реєстрація' />
        {useYIFRegistration.submitted.submitted &&
          !useYIFRegistration.error.hasError && <Spinner />}
        {useYIFRegistration.error.hasError && (
          <FormInputError
            errorType='form'
            errorMessage={useYIFRegistration.error.errorMessage}
          />
        )}
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={validationField}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            actions.resetForm({
              values: {
                email: '',
                password: '',
                confirmPassword: '',
              },
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
          }) => (
            <Form
              onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
                handleSubmit(e);
                if (touched.email && isValid) {
                  useYIFRegistration.handleSubmit(e, '/cabinet');
                }
              }}
            >
              <div>
                <Field
                  component={FormInput}
                  placeholder={'Електронна пошта'}
                  iconName='email'
                  type='email'
                  name='email'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    useYIFRegistration.handleChangeEmail(e);
                  }}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <div>
                <Field
                  component={FormInput}
                  placeholder={'Пароль'}
                  iconName='lock'
                  type='password'
                  name='password'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    useYIFRegistration.handleChangePassword(e);
                  }}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>
              <div>
                {}
                <Field
                  component={FormInput}
                  placeholder={'Підтвердіть пароль'}
                  iconName='lock'
                  type='password'
                  name='confirmPassword'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    useYIFRegistration.handleChangeConfirmPassword(e);
                  }}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
              </div>
              <FormButton data-testid='button' form='register' title='Увійти' />
              <FormTextField text='Вже зареєстровані?' url={'/login'} />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default RegistrationForm;

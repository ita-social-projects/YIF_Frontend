import React from 'react';
import { Formik, Form, Field } from 'formik';
import { validationField } from '../../services/validateForm/ValidatorsField';
import {
  FormButton,
  FormTitle,
  FormTextField,
  FormInput,
  FormCloseButton,
  FormInputError,
} from '../common/formElements';
import useResetPassword from '../../services/useResetPassword';
import styles from './resetPassword.module.scss';
import Spinner from '../common/spinner';
import { APIUrl } from '../../services/endpoints';
import FormInputMessage from '../common/formElements/formInputMessage/formInputMessage';

const ResetPasswordForm = () => {
  const useYIFResetPassword = useResetPassword(APIUrl);
  return (
    <section className={styles.resetFormPage}>
      <div className={styles.resetFormWrap}>
        <FormCloseButton styles={{ top: '28px', right: '25px' }} />
        <FormTitle
          title='Забули пароль?'
          styles={{ margin: '3rem 3.125rem 3.125rem 3.125rem' }}
        />
        {useYIFResetPassword.submitted &&
          !useYIFResetPassword.error.hasError && <Spinner />}
        {useYIFResetPassword.error.hasError && (
          <FormInputError
            errorType='form'
            errorMessage={useYIFResetPassword.error.errorMessage}
          />
        )}
        {useYIFResetPassword.success &&
          setTimeout(() => {
            useYIFResetPassword.setSuccess(false);
            return true;
          }, 3000) && (
            <div className={styles.elementShowHide}>
              <FormInputMessage successMessage='Лист з посиланням для зміни паролю відправлено на електронну адресу' />
            </div>
          )}
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationField}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            actions.resetForm({
              values: {
                email: '',
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
                console.log(errors.email);
                if (touched.email && errors.email === undefined)
                  useYIFResetPassword.handleSubmit(e, '/login');
              }}
            >
              <div className={styles.field}>
                <Field
                  component={FormInput}
                  iconName='email'
                  type='email'
                  name='email'
                  placeholder='Електронна пошта'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    useYIFResetPassword.handleChangeEmail(e);
                  }}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <FormButton title='Відновити' form='resetPassword' />
            </Form>
          )}
        </Formik>
        <FormTextField
          text='Згадали пароль?'
          url='/login'
          styles={{ marginBottom: '2.438rem' }}
        />
      </div>
    </section>
  );
};

export default ResetPasswordForm;

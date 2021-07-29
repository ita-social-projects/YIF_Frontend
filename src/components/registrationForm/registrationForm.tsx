import classes from './registrationForm.module.scss';
import React from 'react';
import { Field, Formik, Form } from 'formik';
import { validationField } from '../../services/validateForm/ValidatorsField';
import {
  FormButton,
  FormCloseButton,
  FormInput,
  FormInputError,
  FormInputCheckbox,
  FormTextField,
  FormTitle,
} from '../common/formElements';
import useRegistration from '../../services/useRegistration';
import Spinner from '../common/spinner';
import { APIUrl } from '../../services/endpoints';

const RegistrationForm: React.FC = () => {
  const useYIFRegistration = useRegistration(APIUrl);

  return (
    <section className={classes.wrapper}>
      <div className={classes.form}>
        <div className={classes.wrapperImg}>
          <img src='/assets/images/imgRegistration.svg' alt='win' />
        </div>
        <FormCloseButton />
        <FormTitle title='Реєстрація' />
        {useYIFRegistration.submitted.submitted &&
          !useYIFRegistration.error.hasError && <Spinner />}
        <div style={{ marginTop: '5px' }}>
          {useYIFRegistration.error.hasError && (
            <FormInputError
              errorFor='form'
              errorMessage={'Some error occured, critical flow'}
              redirectLink={useYIFRegistration.error.redirectLink}
            />
          )}
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              storeDataCheckbox: false,
            }}
            validationSchema={validationField}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              actions.resetForm({
                values: {
                  email: '',
                  password: '',
                  confirmPassword: '',
                  storeDataCheckbox: false,
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
                  if (
                    touched.email &&
                    errors.email === undefined &&
                    errors.password === undefined &&
                    errors.confirmPassword === undefined &&
                    errors.storeDataCheckbox === undefined
                  ) {
                    useYIFRegistration.handleSubmit(e, '/cabinet');
                  }
                }}
              >
                <div>
                  <Field
                    id='registerInputEmail'
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
                    id='registerInputPassword'
                    component={FormInput}
                    placeholder={'Пароль'}
                    iconName='lock'
                    showIconPassword={true}
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
                  <Field
                    id='registerInputResetPassword'
                    component={FormInput}
                    placeholder={'Підтвердіть пароль'}
                    iconName='lock'
                    showIconPassword={true}
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
                <div>
                  <Field
                    id='storeDataCheckbox'
                    component={FormInputCheckbox}
                    labelText='Прийміть умови зберігання персональної інформації'
                    type='checkbox'
                    name='storeDataCheckbox'
                  />
                </div>
                <FormButton
                  id='registerFormButton'
                  data-testid='button'
                  form='register'
                  title='Реєстрація'
                />
                <FormTextField text='Вже зареєстровані?' url={'/login'} />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;

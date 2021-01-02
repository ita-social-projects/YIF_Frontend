import classes from './registrationForm.module.scss'
import React from "react";
import {Field, Formik, Form} from 'formik';
import {validationField} from '../../services/validateForm/ValidatorsField';
import {
  FormButton,
  FormCloseButton,
  FormInput,
  FormInputError,
  FormTextField,
  FormTitle,
} from '../common/formElements'


const RegistrationForm: React.FC = () => {

  return (
      <section role='section' className={classes.wrapper}>
        <div role='wrapper' className={classes.form}>
          <div className={classes.wrapperImg}>
            <img
                src='/assets/images/imgRegistration.svg'
                alt='win'/>
          </div>
          <FormCloseButton/>
          <FormTitle title='Реєстрація'/>
          <Formik
              initialValues={{email: '', password: '', confirmPassword: ''}}
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
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div>
                    <Field
                        component={FormInput}
                        placeholder={'Електронна пошта'}
                        iconName='email'
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                  </div>
                  <div>
                    <Field
                        component={FormInput}
                        placeholder={'Пароль'}
                        iconName='lock'
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                  </div>
                  <div>
                    <Field
                        component={FormInput}
                        placeholder={'Підтвердіть пароль'}
                        iconName='lock'
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                    />
                  </div>
                  < FormButton data-testid='button' form='register' title='Увійти'/>
                  <FormTextField text='Вже зареєстровані?' url={'/login'}/>
                </Form>
            )}
          </Formik>
        </div>
      </section>
  );
}

export default RegistrationForm;

import classes from './../registrationForm.module.scss'
import React from "react";
import { Field, Formik, Form } from 'formik';
import { validationField } from '../../services/validateForm/ValidatorsField';


const RegistrationForm: React.FC = () => {

  return (
      <section>
        <div className={classes.wrapper}>
          <div className={classes.form}>
            <span>X</span>
            <h2>Реєстрація</h2>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={validationField}
                onSubmit={(values, actions) => {
                  console.log(values);
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
                          placeholder={'Електронна пошта'}
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                      />
                      {errors.email && touched.email ? <div className={classes.error}>{errors.email}</div> : null}
                    </div>
                    <div>
                      <Field
                          placeholder={'Пароль'}
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                      />
                      {errors.password && touched.password ? <div className={classes.error}>{errors.password}</div> : null}
                    </div>
                    <div>
                      <Field
                          placeholder={'Підтвердіть пароль'}
                          type="password"
                          name="confirmPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmPassword}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? <div className={classes.error}>{errors.confirmPassword}</div> : null}
                    </div>
                    <button  data-testid='button' type='submit'>
                      Увійти
                    </button>
                    <div>Вже зареєстровані? Перейдіть
                      <span> сюди</span>
                    </div>
                  </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
  );
}

export default RegistrationForm;

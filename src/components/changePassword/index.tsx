import React from 'react';
import { Field, Formik, Form } from 'formik';
import styles from './changePassword.module.scss';
import passwordValidationSchema from './changePasswordValidation';
import { FormButton, FormInput } from '../common/formElements/index';

const changePassword = () => {
  const handleSubmit = () => {
    console.log('password changed');
  };

  return (
    <div className={styles.changePasswordWrapper}>
      <div className={styles.changePassword}>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={passwordValidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <>
              {
                <Form>
                  <h2>Зміна паролю</h2>
                  <div>
                    <Field
                      component={FormInput}
                      placeholder={'Старий пароль'}
                      iconName='lock'
                      type='password'
                      name='oldPassword'
                      showIconPassword={true}
                    />
                  </div>
                  <div>
                    <Field
                      component={FormInput}
                      placeholder={'Новий пароль'}
                      iconName='lock'
                      type='password'
                      name='newPassword'
                      showIconPassword={true}
                    />
                  </div>
                  <div>
                    <Field
                      component={FormInput}
                      placeholder={'Підтвердіть новий пароль'}
                      iconName='lock'
                      type='password'
                      name='confirmNewPassword'
                      showIconPassword={true}
                    />
                  </div>
                  <FormButton
                    title={'Зберегти'}
                    id='registerFormButton'
                    form='register'
                  />
                </Form>
              }
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default changePassword;

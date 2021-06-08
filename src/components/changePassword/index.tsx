import React from 'react';
import { Field, Formik, Form } from 'formik';
import styles from './changePassword.module.scss';
import passwordValidationSchema from './changePasswordValidation';
import { FormButton, FormInput } from '../common/formElements/index';
import useChangePassword from '../../services/changePassword/useChangePassword';
import { APIUrl } from '../../services/endpoints';
import { FormInputError } from '../../components/common/formElements';
import { FormInputSuccess } from '../../components/common/formElements/formInputSuccess/formInputSuccess';

const ChangePassword = () => {

  const service = useChangePassword(`${APIUrl}Users/ChangePassword`);

  return (
    <div className={styles.changePasswordWrapper}>
      <div className={styles.changePassword}>
        {service.error.hasError && (
          <FormInputError
            errorType='form'
            errorMessage={service.error.errorMessage}
          />
        )}
        {service.success.hasSuccess && (
          <FormInputSuccess
            successMessage={service.success.successMessage}
          />
        )}
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={passwordValidationSchema}
          onSubmit={(values, actions) => {
            service.handleSubmit(values);
            actions.setSubmitting(false);
            actions.resetForm({
              values: {
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
              },
            });
          }}
        >
          {() => (
            <>
              {
                <Form>
                  <h2>Зміна пароля</h2>
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

export default ChangePassword;

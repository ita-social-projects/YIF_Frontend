import React from 'react';
import Spinner from '../common/spinner';
import { Field, Formik, Form } from 'formik';
import styles from './newPassword.module.scss';
import useRecoverPassword from './../../services/usePasswordRecover';
import { FormInputSuccess } from '../common/formElements/formInputSuccess/formInputSuccess';
import {
  FormCloseButton,
  FormTitle,
  FormButton,
  FormInput,
  FormInputError,
} from '../common/formElements/index';
import { type } from 'os';

function NewPasswordForm() {
  const {
    status,
    error,
    submiting,
    handleFormSubmit,
    passwordValidationSchema,
  } = useRecoverPassword();
  return (
    <section className={styles.newPasswordContainer}>
      <div className={styles.newPasswordFormWrapper}>
        <FormCloseButton styles={{ top: '15px', right: '15px' }} />
        {status && !error && (
          <div className={styles.elementShowHide}>
            <FormInputSuccess successMessage='Ваш пароль змінено! Ви можете увійти за допомогою нового паролю!' />
          </div>
        )}
        {!submiting && error && (
          <FormInputError
            errorType='form'
            errorMessage={'Щось пішло не так, спробуйте знову!'}
          />
        )}
        {submiting && (
          <div>
            <Spinner />
          </div>
        )}
        {!submiting && !status && !error && (
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={passwordValidationSchema}
            onSubmit={handleFormSubmit}
          >
            {() => (
              <Form>
                <FormTitle title='Введіть ваш новий пароль!' />
                <div>
                  <Field
                    component={FormInput}
                    placeholder={'Пароль'}
                    iconName='lock'
                    type='password'
                    name='password'
                  />
                </div>
                <div>
                  <Field
                    component={FormInput}
                    placeholder={'Підтвердіть пароль'}
                    iconName='lock'
                    type='password'
                    name='confirmPassword'
                  />
                </div>
                <FormButton
                  id='registerFormButton'
                  data-testid='button'
                  form='register'
                  title='Зберегти'
                />
              </Form>
            )}
          </Formik>
        )}
      </div>
    </section>
  );
}

export default NewPasswordForm;

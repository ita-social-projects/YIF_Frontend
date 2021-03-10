import React from 'react';
import { Field, Formik, Form } from 'formik';
import styles from './newPassword.module.scss';
import { validationField } from '../../services/validateForm/ValidatorsField';
import {
  FormCloseButton,
  FormTitle,
  FormButton,
  FormInput,
} from '../common/formElements/index';

function NewPasswordForm() {
  return (
    <section className={styles.newPasswordContainer}>
      <div className={styles.newPasswordFormWrapper}>
        <FormCloseButton styles={{ top: '15px', right: '15px' }} />
        <FormTitle title='Введіть ваш новий пароль!' />
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={validationField}
          onSubmit={() => {}}
        >
          {() => (
            <Form>
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
      </div>
    </section>
  );
}

export default NewPasswordForm;

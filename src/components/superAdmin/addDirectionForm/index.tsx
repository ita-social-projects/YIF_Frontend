import React, { useState } from 'react';
import styles from './addDirectionForm.module.scss';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';
import { requestSecureData } from '../../../services/requestDataFunction';
import { useHistory } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import { FormButton, FormInputError } from '../../common/formElements';
import { FormInputSuccess } from '../../common/formElements/formInputSuccess/formInputSuccess';
import addDirectionFormValidator from './addDirectionFormValidation';
import Spinner from '../../common/spinner';

const AddDirectionForm: React.FC = () => {
  const { getToken } = useAuth();
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);

  const [resultMessage, setResultMessage] = useState({
    status: '',
    message: '',
  });

  const handleFormSubmit = async (pathToRedirect: string, values: any) => {
    setSubmitting(true);
    setResultMessage({
      status: '',
      message: '',
    });
    const token = await getToken();

    requestSecureData(`${APIUrl}SuperAdmin/AddDirection`, 'POST', token, {
      name: values.directionName,
      code: values.directionCode,
    })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setResultMessage({
            status: 'success',
            message: res.data.message || 'Напрям успішно додано',
          });
          setTimeout(() => {
            history.push(pathToRedirect);
          }, 3000);
          setSubmitting(false);
        } else {
          setResultMessage({
            status: 'error',
            message:
              res.data.message ||
              `${
                Object.keys(res.data.errors).length === 2
                  ? 'Такий код та напрям вже є у додатку'
                  : res.data.errors.Code === undefined
                  ? 'Такий напрям вже є у додатку'
                  : 'Такий код напряму вже є у додатку'
              }`,
          });
        }
      })
      .catch(() => {
        setResultMessage({
          status: 'error',
          message: 'Щось пішло не так, спробуйте знову.',
        });
      });
    setTimeout(() => {
      setResultMessage({
        status: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapper__title}>Новий напрям</h1>
      <Formik
        enableReinitialize
        initialValues={{
          directionCode: '',
          directionName: '',
        }}
        validationSchema={addDirectionFormValidator}
        onSubmit={(values, actions) => {
          handleFormSubmit('/superAdminAccount', values);
          actions.setSubmitting(false);
          actions.resetForm({
            values,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className={`${styles.fullWidth} ${styles.form}`}>
            <div className={styles.topWrapper}>
              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='directionName'
                >
                  Назва
                </label>
                <Field
                  className={`${styles.topWrapper__input} ${
                    errors.directionName && touched.directionName
                      ? styles.errorInField_borderAround_inset
                      : ''
                  }`}
                  id='directionName'
                  name='directionName'
                />
                {errors.directionName && touched.directionName ? (
                  <FormInputError
                    errorFor='inputField'
                    errorMessage={errors.directionName}
                  />
                ) : null}
              </div>
              <div className={`${styles.halfWidth} ${styles.halfWidth__code}`}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='directionCode'
                >
                  Код
                </label>
                <Field
                  className={`${styles.topWrapper__input} ${
                    errors.directionCode && touched.directionCode
                      ? styles.errorInField_borderAround_inset
                      : ''
                  }`}
                  id='directionCode'
                  name='directionCode'
                />
                {errors.directionCode && touched.directionCode ? (
                  <FormInputError
                    errorFor='inputField'
                    errorMessage={errors.directionCode}
                  />
                ) : null}
              </div>
            </div>
            <FormButton
              id='userProfileButton'
              form='AddInstitutionOfEducation'
              title='Додати'
            />
            <div className={`${styles.resultMessageContainer}`}>
              {submitting && resultMessage.status === 'success' && (
                <div className={styles.spinner}>
                  <Spinner />
                </div>
              )}
              {resultMessage.status === 'success' && (
                <FormInputSuccess successMessage={resultMessage.message} />
              )}
              {resultMessage.status === 'error' && (
                <FormInputError
                  errorFor='form'
                  data-testid='errorMessage'
                  errorMessage={resultMessage.message}
                />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDirectionForm;

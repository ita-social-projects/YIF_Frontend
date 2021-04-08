import React, { useState } from 'react';
import styles from './addInstitutionOfEducationForm.module.scss';
import { APIUrl } from '../../../services/endpoints';
import { requestSecureData } from '../../../services/requestDataFunction';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../services/tokenValidator';
import { Field, Formik, Form } from 'formik';
import { FormButton, FormInputError } from '../../common/formElements';
import { FormInputSuccess } from '../../common/formElements/formInputSuccess/formInputSuccess';
import { validationField } from '../../../services/validateForm/ValidatorsField';
import ImagePickerField from './functions/ImagePickerField';
import InstitutionOfEducationMap from './map';
import Spinner from '../../common/spinner';
import questionIcon from './icon/questionIcon';

const AddInstitutionOfEducationForm = () => {
  const { getToken } = useAuth();
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [resultMessage, setResultMessage] = useState({
    status: '',
    message: '',
  });

  const submitHandler = async (
    e: React.ChangeEvent<HTMLFormElement>,
    pathToRedirect: string,
    values: any
  ) => {
    e.preventDefault();
    setSubmitted(true);
    setResultMessage({
      status: '',
      message: '',
    });

    const currentToken = await getToken();

    requestSecureData(
      `${APIUrl}SuperAdmin/AddinstitutionOfEducationAndAdmin`,
      'POST',
      currentToken,
      {
        name: values.institutionOfEducationName,
        abbreviation: values.institutionOfEducationAbbreviation,
        site: values.institutionOfEducationSite,
        address: values.institutionOfEducationAddress,
        phone: values.institutionOfEducationPhone,
        email: values.institutionOfEducationEmail,
        description: values.institutionOfEducationDescription,
        lat: values.institutionOfEducationLat,
        lon: values.institutionOfEducationLon,
        institutionOfEducationType: values.institutionOfEducationType,
        imageApiModel: {
          photo: values.institutionOfEducationPicture,
        },
        institutionOfEducationAdminEmail:
          values.institutionOfEducationAdminEmail,
      }
    )
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setResultMessage({
            status: 'success',
            message: res.data.message || 'Університет успішно додано',
          });
          setTimeout(() => {
            history.push(pathToRedirect);
          }, 3000);
          setSubmitted(false);
        } else {
          setResultMessage({
            status: 'error',
            message: res.data.message || 'Щось пішло не так, спробуйте знову.',
          });
        }
      })
      .catch((error) => {
        setResultMessage({
          status: 'error',
          message: error || 'Щось пішло не так, спробуйте знову.',
        });
      });
  };

  return (
    <div className={styles.wrapper}>
      <Formik
        enableReinitialize
        initialValues={{
          institutionOfEducationType: '',
          institutionOfEducationName: '',
          institutionOfEducationAbbreviation: '',
          institutionOfEducationSite: '',
          institutionOfEducationAddress: '',
          institutionOfEducationPhone: '',
          institutionOfEducationEmail: '',
          institutionOfEducationDescription: '',
          institutionOfEducationPicture: '',
          institutionOfEducationLat: '',
          institutionOfEducationLon: '',
          institutionOfEducationAdminEmail: '',
        }}
        validationSchema={validationField}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          actions.resetForm({
            values,
          });
        }}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <Form
            className={styles.form}
            onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
              handleSubmit(e);
              if (
                touched.institutionOfEducationName &&
                errors.institutionOfEducationName === undefined &&
                errors.institutionOfEducationType === undefined &&
                errors.institutionOfEducationAbbreviation === undefined &&
                errors.institutionOfEducationAddress === undefined &&
                errors.institutionOfEducationSite === undefined &&
                errors.institutionOfEducationEmail === undefined &&
                errors.institutionOfEducationPhone === undefined &&
                errors.institutionOfEducationLat === undefined &&
                errors.institutionOfEducationDescription === undefined &&
                errors.institutionOfEducationAdminEmail === undefined
                // errors.institutionOfEducationPicture === undefined
              ) {
                submitHandler(e, '/SuperAdminAccount', values);
              }
            }}
          >
            <div className={styles.topWrapper}>
              <div className={styles.fullWidth}>
                <h1 className={styles.topWrapper__title}>
                  Новий заклад освіти
                </h1>
              </div>

              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='institutionOfEducationName'
                >
                  Назва
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='institutionOfEducationName'
                  name='institutionOfEducationName'
                />
                {errors.institutionOfEducationName &&
                touched.institutionOfEducationName ? (
                  <FormInputError
                    errorType='inputFull'
                    errorMessage={errors.institutionOfEducationName}
                  />
                ) : null}
              </div>

              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='institutionOfEducationType'
                >
                  Тип закладу освіти
                </label>
                <Field
                  className={styles.topWrapper__input}
                  as='select'
                  id='institutionOfEducationType'
                  data-testid='select-type'
                  name='institutionOfEducationType'
                  value={values.institutionOfEducationType}
                >
                  <option data-testid='empty' value=''></option>
                  <option data-testid='university' value='university'>
                    Університет
                  </option>
                  <option data-testid='college' value='college'>
                    Коледж
                  </option>
                </Field>
                {errors.institutionOfEducationType &&
                touched.institutionOfEducationType ? (
                  <FormInputError
                    errorType='inputFull'
                    errorMessage={errors.institutionOfEducationType}
                  />
                ) : null}
              </div>

              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='institutionOfEducationAbbreviation'
                >
                  Аббревіатура
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='institutionOfEducationAbbreviation'
                  name='institutionOfEducationAbbreviation'
                />
                {errors.institutionOfEducationAbbreviation &&
                touched.institutionOfEducationAbbreviation ? (
                  <FormInputError
                    errorType='inputFull'
                    errorMessage={errors.institutionOfEducationAbbreviation}
                  />
                ) : null}
              </div>

              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='institutionOfEducationAddress'
                >
                  Адреса
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='institutionOfEducationAddress'
                  name='institutionOfEducationAddress'
                />
                {errors.institutionOfEducationAddress &&
                touched.institutionOfEducationAddress ? (
                  <FormInputError
                    errorType='inputFull'
                    errorMessage={errors.institutionOfEducationAddress}
                  />
                ) : null}
              </div>

              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='institutionOfEducationSite'
                >
                  Сайт
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='institutionOfEducationSite'
                  name='institutionOfEducationSite'
                />
                {errors.institutionOfEducationSite &&
                touched.institutionOfEducationSite ? (
                  <FormInputError
                    errorType='inputFull'
                    errorMessage={errors.institutionOfEducationSite}
                  />
                ) : null}
              </div>

              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='institutionOfEducationEmail'
                >
                  Електронна адреса
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='institutionOfEducationEmail'
                  name='institutionOfEducationEmail'
                />
                {errors.institutionOfEducationEmail &&
                touched.institutionOfEducationEmail ? (
                  <FormInputError
                    errorType='inputFull'
                    errorMessage={errors.institutionOfEducationEmail}
                  />
                ) : null}
              </div>
              <div className={styles.topWrapper__column}>
                <div className={styles.topWrapper__column__fullWidth}>
                  <label
                    className={styles.topWrapper__label}
                    htmlFor='institutionOfEducationPhone'
                  >
                    Телефон
                  </label>
                  <Field
                    className={styles.topWrapper__input}
                    id='institutionOfEducationPhone'
                    name='institutionOfEducationPhone'
                  />
                  {errors.institutionOfEducationPhone &&
                  touched.institutionOfEducationPhone ? (
                    <FormInputError
                      errorType='inputFull'
                      errorMessage={errors.institutionOfEducationPhone}
                    />
                  ) : null}
                </div>
                <div className={styles.fullWidth}>
                  <label
                    className={styles.topWrapper__label}
                    htmlFor='institutionOfEducationDescription'
                  >
                    Опис
                  </label>
                  <Field
                    as='textarea'
                    id='institutionOfEducationDescription'
                    name='institutionOfEducationDescription'
                    className={styles.topWrapper__textarea}
                    type='textarea'
                  />
                  {errors.institutionOfEducationDescription &&
                  touched.institutionOfEducationDescription ? (
                    <FormInputError
                      errorType='inputFull'
                      errorMessage={errors.institutionOfEducationDescription}
                    />
                  ) : null}
                </div>
              </div>
              <div className={styles.pictureWrapper}>
                <div className={styles.uploadContainer}>
                  <Field
                    name='institutionOfEducationPicture'
                    component={ImagePickerField}
                  />
                </div>
                {errors.institutionOfEducationPicture &&
                touched.institutionOfEducationPicture ? (
                  <FormInputError
                    errorType='inputFull'
                    errorMessage={errors.institutionOfEducationPicture}
                  />
                ) : null}
              </div>
            </div>

            <div className={styles.bottomWrapper}>
              <h2 className={styles.bottomWrapper__subtitle}>
                Виберіть місце розташування
              </h2>
              <Field
                name='lat'
                data-testid='lat'
                setFieldValue={setFieldValue}
                component={InstitutionOfEducationMap}
              />
              {errors.institutionOfEducationLat &&
              touched.institutionOfEducationLat ? (
                <FormInputError
                  errorType='inputFull'
                  errorMessage={errors.institutionOfEducationLat}
                />
              ) : null}
              <div
                className={`${styles.bottomWrapper__halfWidth} ${styles.mailContainer}`}
              >
                <div className={styles.mailContainer__text}>
                  <label
                    className={styles.mailContainer__label}
                    htmlFor='institutionOfEducationAdminEmail'
                  >
                    Введіть електронну адресу адміністратора
                  </label>
                  <div className={styles.mailContainer__questionIcon}>
                    {questionIcon}
                  </div>
                  <div className={styles.mailContainer__questionIcon__tooltip}>
                    Адміністратору надійде лист для створення облікового запису
                  </div>
                </div>

                <Field
                  className={styles.mailContainer__input}
                  id='institutionOfEducationAdminEmail'
                  name='institutionOfEducationAdminEmail'
                  type='email'
                />
                {errors.institutionOfEducationAdminEmail &&
                touched.institutionOfEducationAdminEmail ? (
                  <FormInputError
                    errorType='inputFull'
                    errorMessage={errors.institutionOfEducationAdminEmail}
                  />
                ) : null}
              </div>
              <FormButton
                id='userProfileButton'
                form='AddInstitutionOfEducation'
                title='Додати'
              />

              <div className={styles.resultMessageContainer}>
                {submitted && resultMessage.status === 'success' && (
                  <div className={styles.spinner}>
                    <Spinner />
                  </div>
                )}
                {resultMessage.status === 'error' && (
                  <FormInputError
                    errorType='form'
                    errorMessage={resultMessage.message}
                  />
                )}
                {resultMessage.status === 'success' && (
                  <FormInputSuccess successMessage={resultMessage.message} />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddInstitutionOfEducationForm;

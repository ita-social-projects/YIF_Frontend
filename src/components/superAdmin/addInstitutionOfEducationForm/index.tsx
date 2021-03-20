import React, { useState, useEffect } from 'react';
import { Field, Formik, Form } from 'formik';
import { FormButton, FormInputError } from '../../common/formElements';
import { FormInputSuccess } from '../../common/formElements/formInputSuccess/formInputSuccess';
import styles from './addInstitutionOfEducationForm.module.scss';
import ImageUploader from '../../imageUploader';
import InstitutionOfEducationMap from './map';
import useAddInstitutionOfEducation from '../../../services/useAddInstitutionOfEducation';
import { APIUrl } from '../../../services/endpoints';
import { validationField } from '../../../services/validateForm/ValidatorsField';
import Spinner from '../../common/spinner';

const questionIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='10' cy='10' r='10' fill='#12335E' />
    <path
      d='M9.25781 12.8516V12.4297C9.25781 11.8203 9.35156 11.3203 9.53906 10.9297C9.72656 10.5339 10.0755 10.1172 10.5859 9.67969C11.2943 9.08073 11.7396 8.63021 11.9219 8.32812C12.1094 8.02604 12.2031 7.66146 12.2031 7.23438C12.2031 6.70312 12.0312 6.29427 11.6875 6.00781C11.349 5.71615 10.8594 5.57031 10.2188 5.57031C9.80729 5.57031 9.40625 5.61979 9.01562 5.71875C8.625 5.8125 8.17708 5.98698 7.67188 6.24219L7.21094 5.1875C8.19531 4.67188 9.22396 4.41406 10.2969 4.41406C11.2917 4.41406 12.0651 4.65885 12.6172 5.14844C13.1693 5.63802 13.4453 6.32812 13.4453 7.21875C13.4453 7.59896 13.3932 7.9349 13.2891 8.22656C13.1901 8.51302 13.0417 8.78646 12.8438 9.04688C12.6458 9.30208 12.2188 9.71615 11.5625 10.2891C11.0365 10.737 10.6875 11.1094 10.5156 11.4062C10.349 11.7031 10.2656 12.099 10.2656 12.5938V12.8516H9.25781ZM8.875 15.1719C8.875 14.4635 9.1875 14.1094 9.8125 14.1094C10.1146 14.1094 10.3464 14.2005 10.5078 14.3828C10.6745 14.5651 10.7578 14.8281 10.7578 15.1719C10.7578 15.5052 10.6745 15.7656 10.5078 15.9531C10.3411 16.1354 10.1094 16.2266 9.8125 16.2266C9.54167 16.2266 9.31771 16.1458 9.14062 15.9844C8.96354 15.8177 8.875 15.5469 8.875 15.1719Z'
      fill='white'
    />
  </svg>
);

const AddInstitutionOfEducationForm = () => {
  const avatarStyles = {
    height: '14rem',
    width: '100%',
    borderRadius: '0.3rem',
    padding: '1rem',
  };

  const [picture, setPicture] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const setLocation = (value: [number, number]) => {
    setLat(value[0]);
    setLon(value[1]);
  };

  const setFieldValue = (name: string, value: number) => {
    setFieldValue(name, value);
  };

  const defaultPicture = '/assets/images/defaultUnivPicture.svg';
  const avatar = picture ? picture : defaultPicture;

  const imagePicker = ({ form, field }: any) => {
    return (
      <ImageUploader
        additionalStyles={avatarStyles}
        defaultPicture={defaultPicture}
        avatar={avatar}
        aspectRatio={16 / 9}
        text='університету'
        imageHandler={(newPicture: string) => {
          setPicture(newPicture);
          form.setFieldValue(field.name, newPicture);
        }}
      />
    );
  };

  const useYIFAddInstitutionOfEducation = useAddInstitutionOfEducation(
    APIUrl,
    lat,
    lon,
    picture
  );

  return (
    <div className={styles.wrapper}>
      <Formik
        enableReinitialize
        initialValues={{
          institutionOfEducationType: '',
          institutionOfEducationName: '',
          institutionOfEducationAbbreviation: '',
          institutionOfEducationSite: '',
          institutionOfEducationAdress: '',
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
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form
            className={styles.form}
            onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
              console.log(`values`, values);
              handleSubmit(e);
              if (
                touched.institutionOfEducationAdminEmail &&
                errors.institutionOfEducationName === undefined &&
                errors.institutionOfEducationAbbreviation === undefined &&
                errors.institutionOfEducationAdress === undefined &&
                errors.institutionOfEducationPhone === undefined &&
                errors.institutionOfEducationEmail === undefined &&
                errors.institutionOfEducationLat === undefined &&
                errors.institutionOfEducationPicture === undefined &&
                errors.institutionOfEducationDescription === undefined &&
                errors.institutionOfEducationAdminEmail === undefined
              ) {
                useYIFAddInstitutionOfEducation.handleSubmit(
                  e,
                  '/SuperAdminAccount'
                );
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
                  value={values.institutionOfEducationName}
                  onBlur={handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    useYIFAddInstitutionOfEducation.handleChangeName(e);
                  }}
                />
                {errors.institutionOfEducationName &&
                touched.institutionOfEducationName ? (
                  <FormInputError
                    errorType='input'
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
                  name='institutionOfEducationType'
                  value={values.institutionOfEducationType}
                >
                  <option value=''></option>
                  <option value='university'>Університет</option>
                  <option value='college'>Коледж</option>
                </Field>
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
                  value={values.institutionOfEducationAbbreviation}
                  onBlur={handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    useYIFAddInstitutionOfEducation.handleChangeAbbreviation(e);
                  }}
                />
                {errors.institutionOfEducationAbbreviation &&
                touched.institutionOfEducationAbbreviation ? (
                  <FormInputError
                    errorType='input'
                    errorMessage={errors.institutionOfEducationAbbreviation}
                  />
                ) : null}
              </div>

              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='institutionOfEducationAdress'
                >
                  Адреса
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='institutionOfEducationAdress'
                  name='institutionOfEducationAdress'
                  value={values.institutionOfEducationAdress}
                  onBlur={handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    useYIFAddInstitutionOfEducation.handleChangeAdress(e);
                  }}
                />
                {errors.institutionOfEducationAdress &&
                touched.institutionOfEducationAdress ? (
                  <FormInputError
                    errorType='input'
                    errorMessage={errors.institutionOfEducationAdress}
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
                  value={values.institutionOfEducationSite}
                  onBlur={handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    useYIFAddInstitutionOfEducation.handleChangeSite(e);
                  }}
                />
                {errors.institutionOfEducationSite &&
                touched.institutionOfEducationSite ? (
                  <FormInputError
                    errorType='input'
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
                  value={values.institutionOfEducationEmail}
                  onBlur={handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    useYIFAddInstitutionOfEducation.handleChangeEmail(e);
                  }}
                />
                {errors.institutionOfEducationEmail &&
                touched.institutionOfEducationEmail ? (
                  <FormInputError
                    errorType='input'
                    errorMessage={errors.institutionOfEducationEmail}
                  />
                ) : null}
              </div>
              <div className={styles.topWrapper__column}>
                <div className={styles.topWrapper__column__fullWidth}>
                  <label className={styles.topWrapper__label} htmlFor='phone'>
                    Телефон
                  </label>
                  <Field
                    className={styles.topWrapper__input}
                    id='institutionOfEducationPhone'
                    name='institutionOfEducationPhone'
                    type='phone'
                    value={values.institutionOfEducationPhone}
                    onBlur={handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      useYIFAddInstitutionOfEducation.handleChangePhone(e);
                    }}
                  />
                  {errors.institutionOfEducationPhone &&
                  touched.institutionOfEducationPhone ? (
                    <FormInputError
                      errorType='input'
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
                    value={values.institutionOfEducationDescription}
                    onBlur={handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      handleChange(e);
                      useYIFAddInstitutionOfEducation.handleChangeDescription(
                        e
                      );
                    }}
                  />
                  {errors.institutionOfEducationDescription &&
                  touched.institutionOfEducationDescription ? (
                    <FormInputError
                      errorType='input'
                      errorMessage={errors.institutionOfEducationDescription}
                    />
                  ) : null}
                </div>
              </div>
              <div className={styles.pictureWrapper}>
                <div className={styles.uploadContainer}>
                  <Field
                    name='institutionOfEducationPicture'
                    component={imagePicker}
                  />
                </div>
                {!picture &&
                errors.institutionOfEducationPicture &&
                touched.institutionOfEducationPicture ? (
                  <FormInputError
                    errorType='input'
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
                setFieldValue={setFieldValue}
                component={InstitutionOfEducationMap}
                setLocation={setLocation}
              />
              {errors.institutionOfEducationLat &&
              touched.institutionOfEducationLat ? (
                <FormInputError
                  errorType='input'
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
                  value={values.institutionOfEducationAdminEmail}
                  onBlur={handleBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    useYIFAddInstitutionOfEducation.handleChangeAdminEmail(e);
                  }}
                />
                {errors.institutionOfEducationAdminEmail &&
                touched.institutionOfEducationAdminEmail ? (
                  <FormInputError
                    errorType='input'
                    errorMessage={errors.institutionOfEducationAdminEmail}
                  />
                ) : null}
              </div>
              <FormButton
                id='userProfileButton'
                form='AddInstitutionOfEducation'
                title='Додати'
              />

              <div className={styles.errorContainer}>
                {useYIFAddInstitutionOfEducation.submitted &&
                  !useYIFAddInstitutionOfEducation.error.hasError && (
                    <div className={styles.spinner}>
                      <Spinner />
                    </div>
                  )}
                {useYIFAddInstitutionOfEducation.error.hasError && (
                  <FormInputError
                    errorType='form'
                    errorMessage={
                      useYIFAddInstitutionOfEducation.error.errorMessage
                    }
                  />
                )}
                {useYIFAddInstitutionOfEducation.success.hasSuccess && (
                  <FormInputSuccess
                    successMessage={
                      useYIFAddInstitutionOfEducation.success.successMessage
                    }
                  />
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

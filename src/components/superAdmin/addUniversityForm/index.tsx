import React, { useState, useEffect } from 'react';
import { Field, Formik, Form } from 'formik';
import { FormButton, FormInputError } from '../../common/formElements';
import styles from './addUniversityForm.module.scss';
import ImageUploader from '../../imageUploader';
import UniversityMap from './map';

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

const AddUniversityForm = () => {
  const avatarSyles = {
    height: '14rem',
    width: '100%',
    borderRadius: '0.3rem',
  };

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  const validateUsername = (value: string) => {
    let error;
    if (value === 'admin') {
      error = 'Nice try!';
    }
    return error;
  };

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [picture, setPicture] = useState('');

  const defaultPicture = 'assets/images/defaultUnivPicture.svg';
  const avatar = picture ? picture : defaultPicture;

  const settingLat = (value: number) => {
    setLat(value);
  };
  const settingLng = (value: number) => {
    setLng(value);
  };

  const imageHandler = (value: string) => {
    setPicture(value);
  };

  return (
    <div className={styles.wrapper}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          universityName: '',
          universityAbbreviation: '',
          universityAdress: '',
          universitySite: '',
          universityEmail: '',
          universityPhone: '',
          universityDescription: '',
          adminEmail: '',
        }}
        onSubmit={(values) => {
          console.log('name: ', values.universityName);
          console.log('abbreviation: ', values.universityAbbreviation);
          console.log('site: ', values.universitySite);
          console.log('address: ', values.universityAdress);
          console.log('phone: ', values.universityPhone);
          console.log('email: ', values.universityEmail);
          console.log('description: ', values.universityDescription);
          console.log('lat: ', lat);
          console.log('lon: ', lng);
          console.log('universityAdminEmail: ', values.adminEmail);
          console.log('pic: ', picture);
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Form className={styles.form}>
            <div className={styles.topWrapper}>
              <h1 className={styles.topWrapper__title}>Новий університет</h1>
              <div className={styles.fullWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='universityName'
                >
                  Назва
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='universityName'
                  name='universityName'
                  // validate={validateUsername}
                />
              </div>
              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='universityAbbreviation'
                >
                  Аббревіатура
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='universityAbbreviation'
                  name='universityAbbreviation'
                />
              </div>
              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='universityAdress'
                >
                  Адреса
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='universityAdress'
                  name='universityAdress'
                />
              </div>
              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='universitySite'
                >
                  Сайт
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='universitySite'
                  name='universitySite'
                />
              </div>
              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='universityEmail'
                >
                  Електронна адреса
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='universityEmail'
                  name='universityEmail'
                  // validate={validateEmail}
                />
                {errors.universityEmail && touched.universityEmail && (
                  <div>{errors.universityEmail}</div>
                )}
              </div>
              <div className={styles.topWrapper__column}>
                <div className={styles.topWrapper__column__fullWidth}>
                  <label
                    className={styles.topWrapper__label}
                    htmlFor='universityPhone'
                  >
                    Телефон
                  </label>
                  <Field
                    className={styles.topWrapper__input}
                    id='universityPhone'
                    name='universityPhone'
                    type='phone'
                  />
                </div>
                <div className={styles.fullWidth}>
                  <label
                    className={styles.topWrapper__label}
                    htmlFor='universityDescription'
                  >
                    Опис
                  </label>
                  <Field
                    as='textarea'
                    id='universityDescription'
                    name='universityDescription'
                    className={styles.topWrapper__textarea}
                    type='textarea'
                  />
                </div>
              </div>
              <div className={styles.pictureWrapper}>
                <div className={styles.uploadContainer}>
                  <ImageUploader
                    additionalStyles={avatarSyles}
                    defaultPicture={defaultPicture}
                    avatar={avatar}
                    aspectRatio={16 / 9}
                    text='університету'
                    imageHandler={imageHandler}
                  />
                </div>
              </div>
            </div>

            <div className={styles.bottomWrapper}>
              <h2 className={styles.bottomWrapper__subtitle}>
                Виберіть місце розташування
              </h2>
              <UniversityMap settingLat={settingLat} settingLng={settingLng} />

              <div
                className={`${styles.bottomWrapper__halfWidth} ${styles.mailContainer}`}
              >
                <div className={styles.mailContainer__text}>
                  <label
                    className={styles.mailContainer__label}
                    htmlFor='adminEmail'
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
                  id='adminEmail'
                  name='adminEmail'
                  type='email'
                />
              </div>
              <FormButton
                id='userProfileButton'
                form='addUniversity'
                title='Додати'
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUniversityForm;

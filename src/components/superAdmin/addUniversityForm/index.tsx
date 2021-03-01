import React from 'react';
import { Field, Formik, Form } from 'formik';
import { ReactComponent as DefaultPicture } from './defaultUnivPicture.svg';
import styles from './addUniversityForm.module.scss';

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

const picturesIcon = (
  <svg
    width='25'
    height='25'
    viewBox='0 0 25 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M18.1807 25C18.0057 25 17.8265 24.9781 17.6494 24.9313L1.54215 20.6177C0.437984 20.3135 -0.22035 19.1698 0.0692338 18.0656L2.10153 10.4906C2.17653 10.2125 2.46194 10.051 2.73903 10.1219C3.01715 10.1958 3.18173 10.4823 3.10778 10.7594L1.07653 18.3323C0.931734 18.8844 1.26298 19.4594 1.81611 19.6125L17.9172 23.924C18.4703 24.0698 19.0411 23.7406 19.1849 23.1906L19.9984 20.176C20.0734 19.8979 20.3588 19.7323 20.6369 19.8083C20.9151 19.8833 21.0786 20.1698 21.0047 20.4469L20.1922 23.4573C19.9474 24.3844 19.1036 25 18.1807 25Z'
      fill='white'
    />
    <path
      d='M22.9166 18.75H6.24996C5.101 18.75 4.16663 17.8156 4.16663 16.6667V4.16666C4.16663 3.0177 5.101 2.08333 6.24996 2.08333H22.9166C24.0656 2.08333 25 3.0177 25 4.16666V16.6667C25 17.8156 24.0656 18.75 22.9166 18.75ZM6.24996 3.12499C5.676 3.12499 5.20829 3.5927 5.20829 4.16666V16.6667C5.20829 17.2406 5.676 17.7083 6.24996 17.7083H22.9166C23.4906 17.7083 23.9583 17.2406 23.9583 16.6667V4.16666C23.9583 3.5927 23.4906 3.12499 22.9166 3.12499H6.24996Z'
      fill='white'
    />
    <path
      d='M9.37496 9.375C8.226 9.375 7.29163 8.44063 7.29163 7.29167C7.29163 6.14271 8.226 5.20834 9.37496 5.20834C10.5239 5.20834 11.4583 6.14271 11.4583 7.29167C11.4583 8.44063 10.5239 9.375 9.37496 9.375ZM9.37496 6.25C8.801 6.25 8.33329 6.71771 8.33329 7.29167C8.33329 7.86563 8.801 8.33333 9.37496 8.33333C9.94892 8.33333 10.4166 7.86563 10.4166 7.29167C10.4166 6.71771 9.94892 6.25 9.37496 6.25Z'
      fill='white'
    />
    <path
      d='M4.76035 17.6354C4.62702 17.6354 4.49369 17.5844 4.3916 17.4833C4.18848 17.2802 4.18848 16.95 4.3916 16.7469L9.3114 11.8271C9.90098 11.2375 10.9312 11.2375 11.5208 11.8271L12.9854 13.2917L17.0395 8.42709C17.3343 8.07396 17.7676 7.86875 18.2291 7.86459H18.2406C18.6968 7.86459 19.1291 8.0625 19.427 8.40938L24.8749 14.7656C25.0624 14.9833 25.0374 15.3125 24.8187 15.5C24.601 15.6875 24.2729 15.6635 24.0843 15.4438L18.6364 9.0875C18.5354 8.97084 18.3958 8.90625 18.2406 8.90625C18.1322 8.89688 17.9416 8.97188 17.8406 9.09375L13.4208 14.3969C13.327 14.5094 13.1906 14.5771 13.0437 14.5833C12.8958 14.5938 12.7551 14.5354 12.652 14.4313L10.7843 12.5635C10.5874 12.3677 10.2447 12.3677 10.0479 12.5635L5.12806 17.4833C5.02702 17.5844 4.89369 17.6354 4.76035 17.6354Z'
      fill='white'
    />
    <defs>
      <clipPath id='clip0'>
        <rect width='25' height='25' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const AddUniversityForm = () => {
  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={() => {}}
      >
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
                type='email'
              />
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
                <div className={styles.uploadContainer__img}>
                  <DefaultPicture />
                </div>
                <button className={styles.uploadContainer__button}>
                  Виберіть зображення {picturesIcon}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.bottomWrapper}>
            <h2 className={styles.bottomWrapper__subtitle}>
              Виберіть місце розташування
            </h2>
            <img
              className={styles.bottomWrapper__map}
              src='./assets/images/map.png'
            />
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
            <button
              className={styles.bottomWrapper__submitButton}
              type='submit'
            >
              Додати
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUniversityForm;

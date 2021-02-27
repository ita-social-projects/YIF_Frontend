import React from 'react';
import classes from './addUniversity.module.scss';
import { Header, Footer } from '../../components';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import ImageUploader from '../../components/imageUploader';
import { ReactComponent as ReactLogo } from './defaultUnivPicture.svg';

const AddUniversity = () => {
  interface Values {
    firstName: string;
    lastName: string;
    email: string;
  }

  return (
    <>
      <Header />
      <section role='section' className={classes.section}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form className={classes.section__form}>
            <h1 className={classes.section__form__title}>Новий університет</h1>

            <div className={classes.full_width}>
              <label
                className={classes.section__form__label}
                htmlFor='universityName'
              >
                Назва
              </label>
              <Field
                className={classes.section__form__input}
                id='universityName'
                name='universityName'
              />
            </div>

            <div className={classes.half_width}>
              <label
                className={classes.section__form__label}
                htmlFor='universityAbbreviation'
              >
                Аббревіатура
              </label>
              <Field
                className={classes.section__form__input}
                id='universityAbbreviation'
                name='universityAbbreviation'
              />
            </div>

            <div className={classes.half_width}>
              <label
                className={classes.section__form__label}
                htmlFor='universityAdress'
              >
                Адреса
              </label>
              <Field
                className={classes.section__form__input}
                id='universityAdress'
                name='universityAdress'
              />
            </div>

            <div className={classes.half_width}>
              <label
                className={classes.section__form__label}
                htmlFor='universitySite'
              >
                Сайт
              </label>
              <Field
                className={classes.section__form__input}
                id='universitySite'
                name='universitySite'
              />
            </div>

            <div className={classes.half_width}>
              <label
                className={classes.section__form__label}
                htmlFor='universityEmail'
              >
                Електронна адреса
              </label>
              <Field
                className={classes.section__form__input}
                id='universityEmail'
                name='universityEmail'
                type='email'
              />
            </div>

            <div className={classes.column}>
              <div className={classes.full_width}>
                <label
                  className={classes.section__form__label}
                  htmlFor='universityEmail'
                >
                  Телефон
                </label>
                <Field
                  className={classes.section__form__input}
                  id='universityEmail'
                  name='universityEmail'
                  type='phone'
                />
              </div>

              <div className={classes.full_width}>
                <label
                  className={classes.section__form__label}
                  htmlFor='universityEmail'
                >
                  Опис
                </label>
                <Field
                  as='textarea'
                  id='universityEmail'
                  name='universityEmail'
                  className={classes.textarea}
                  type='textarea'
                />
              </div>
            </div>

            <div className={classes.wrapPicture}>
              <div className={classes.wrapPicture__uploadPicture}>
                <div className={classes.wrapPicture__uploadPicture__img}>
                  <ReactLogo />
                </div>
                {/* <img src='./assets/images/defaultUnivPicture.svg' /> */}
                <button className={classes.wrapPicture__uploadPicture__button}>
                  Виберіть зображення
                </button>
              </div>
            </div>

            <div className={classes.section__bottomWrapper}>
              <h2 className={classes.section__bottomWrapper__subtitle}>
                Виберіть місце розташування
              </h2>
              <img
                className={classes.section__bottomWrapper__map}
                src='./assets/images/map.png'
              />
              <div className={classes.section__bottomWrapper__half_width}>
                <label
                  className={classes.section__form__label}
                  htmlFor='adminEmail'
                >
                  Введіть електронну адресу адміністратора
                </label>
                <Field
                  className={classes.section__form__input}
                  id='adminEmail'
                  name='adminEmail'
                  type='email'
                />
              </div>
              <button
                className={classes.section__bottomWrapper__submitButton}
                type='submit'
              >
                Додати
              </button>
            </div>
          </Form>
        </Formik>
      </section>
      <Footer />
    </>
  );
};

export default AddUniversity;

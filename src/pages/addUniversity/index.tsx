import React from 'react';
import classes from './addUniversity.module.scss';
import { Header, Footer } from '../../components';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import ImageUploader from '../../components/imageUploader';

const AddUniversity = () => {
  interface Values {
    firstName: string;
    lastName: string;
    email: string;
  }

  return (
    <>
      <Header />
      <section role='section' className={classes.wrapper}>
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
          <Form>
            <h1>Новий університет</h1>

            <div className={classes.full_width}>
              <label htmlFor='universityName'>Назва</label>
              <Field id='universityName' name='universityName' />
            </div>

            <div className={classes.half_width}>
              <label htmlFor='universityAbbreviation'>Аббревіатура</label>
              <Field
                id='universityAbbreviation'
                name='universityAbbreviation'
              />
            </div>

            <div className={classes.half_width}>
              <label htmlFor='universityAdress'>Адреса</label>
              <Field id='universityAdress' name='universityAdress' />
            </div>

            <div className={classes.half_width}>
              <label htmlFor='universitySite'>Сайт</label>
              <Field id='universitySite' name='universitySite' />
            </div>

            <div className={classes.half_width}>
              <label htmlFor='universityEmail'>Електронна адреса</label>
              <Field id='universityEmail' name='universityEmail' type='email' />
            </div>

            <div className={classes.column}>
              <div className={classes.full_width}>
                <label htmlFor='universityEmail'>Телефон</label>
                <Field
                  id='universityEmail'
                  name='universityEmail'
                  type='phone'
                />
              </div>

              <div className={classes.full_width}>
                <label htmlFor='universityEmail'>Опис</label>
                <Field
                  as='textarea'
                  id='universityEmail'
                  name='universityEmail'
                  className={classes.textarea}
                  type='textarea'
                />
              </div>
            </div>

            <div className={classes.uploadPicture}>
              <ImageUploader />
            </div>

            <button type='submit'>Submit</button>
          </Form>
        </Formik>
      </section>
      <Footer />
    </>
  );
};

export default AddUniversity;

import React, { useState, useEffect } from 'react';
import Input from '../../common/labeledInput/index';
import { Formik, Form, Field } from 'formik';
import { Footer, Header } from '../..';
import Aside from '../aside';
import styles from './editInstitutionOfEducationInfoPage.module.scss';
import { FormButton } from '../../common/formElements/index';
import { InstitutionOfEducationMap } from '../../../components';
import IUpload from './iupload/iupload';

const EditInstitutionOfEducationInfoPage = () => {
  const [initialValues, setinitialValues] = useState({});
  const [fetching, setFetching] = useState(true);

  const {
    name,
    abbreviation,
    site,
    address,
    phone,
    email,
    description,
    institutionOfEducationType,
    lat,
    lon,
    id,
  } = {
    id: 'e2bd4ad9-060b-4d53-8222-9f3e5efbcfc7',
    name:
      'Національний університет водного господарства та природокористування',
    abbreviation: 'НУВГП',
    site: 'https://nuwm.edu.ua/',
    address: 'вулиця Соборна, 11, Рівне, Рівненська область, 33000',
    phone: '380362633209',
    email: 'mail@nuwm.edu.ua',
    description:
      'Єдиний в Україні вищий навчальний заклад водогосподарського профілю. Заклад є навчально-науковим комплексом, що здійснює підготовку висококваліфікованих фахівців, науково-педагогічних кадрів, забезпечує підвищення кваліфікації фахівців та проводить науково-дослідну роботу.',
    // "imagePath": "",
    lat: 50.61798,
    lon: 26.258654,
    institutionOfEducationType: 0,
  };

  const map = [
    {
      id: id,
      name: name,
      site: site,
      lat: lat,
      lon: lon,
    },
  ];

  useEffect(() => {
    setinitialValues({
      name: name,
      abbreviation: abbreviation,
      site: site,
      address: address,
      phone: phone,
      email: email,
      description: description,
      institutionOfEducationType: 0,
      color: '',
    });
    setFetching(false);
  }, []);

  return (
    <>
      {!fetching && (
        <>
          <div className={styles.editInfoSection}>
            <main className={styles.mainContent}>
              <h1 className={styles.title}>
                Дані про ваш університет, які ви можете змінити.
              </h1>
              <h3 className={styles.subtitle}>
                Натисніть на поле для вводу, щоб ввести нові дані
              </h3>
              <div className={styles.uploader}>
                <IUpload />
              </div>
              <h2 className={styles.infoTitle}>Основна інформація</h2>

              <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {() => (
                  <Form className={styles.mainContent}>
                    <div className={styles.infoBox}>
                      <div className={styles.selectField}>
                        <span>Тип закладу:</span>
                        <Field
                          as='select'
                          name='type'
                          className={styles.selector}
                        >
                          <option value='Університет'>Університет</option>
                          <option value='Коледж'>Коледж</option>
                          <option value='Щось інше..'>Щось інше..</option>
                        </Field>
                      </div>
                      <Input id='name' label='Повна назва:' name='name' />
                      <Input
                        id='paymentForm'
                        label='Абревіатура:'
                        name='abbreviation'
                      />
                      <Input
                        id='description'
                        label='Опис'
                        name='description'
                        area='true'
                      />
                    </div>

                    <h2 className={styles.infoTitle}>Контактна інформація</h2>
                    <div className={styles.infoBox}>
                      <Input
                        id='educationalProgramLink'
                        label='Електронна пошта:'
                        name='email'
                      />
                      <Input
                        id='educationalProgramLink'
                        label='Сайт:'
                        name='site'
                      />
                      <Input
                        id='educationalProgramLink'
                        label='Телефон:'
                        name='phone'
                      />
                      <Input
                        id='educationalProgramLink'
                        label='Адреса:'
                        name='address'
                      />
                    </div>
                    <h2 className={styles.infoTitle}>Місце розташування</h2>
                    <InstitutionOfEducationMap data={map} />
                    <FormButton
                      title={'Зберегти'}
                      id='registerFormButton'
                      data-testid='button'
                      form='register'
                    />
                  </Form>
                )}
              </Formik>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default EditInstitutionOfEducationInfoPage;

import React, { useState, useEffect } from 'react';
import Input from '../../../components/common/labeledInput/index';
import { Formik, Form, Field } from 'formik';
import styles from './editInstitutionOfEducationInfoPage.module.scss';
import { FormButton } from '../../../components/common/formElements/index';
import UniversityMap from '../../../components/superAdmin/addInstitutionOfEducationForm/map';
import ImageUploader from '../../../components/institutionOfEducationAdmin/imageUploader';

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
  } = {
    name:
      'Національний університет водного господарства та природокористування',
    abbreviation: 'НУВГП',
    site: 'https://nuwm.edu.ua/',
    address: 'вулиця Соборна, 11, Рівне, Рівненська область, 33000',
    phone: '380362633209',
    email: 'mail@nuwm.edu.ua',
    description:
      'Єдиний в Україні вищий навчальний заклад водогосподарського профілю. Заклад є навчально-науковим комплексом, що здійснює підготовку висококваліфікованих фахівців, науково-педагогічних кадрів, забезпечує підвищення кваліфікації фахівців та проводить науково-дослідну роботу.',
    lat: 50.61798,
    lon: 26.258654,
    institutionOfEducationType: 0,
  };

  const currentPosition = [lat, lon];
  const foto = 'https://nuwm.edu.ua/images/content/admin/nuwmvsh.jpg';

  useEffect(() => {
    setinitialValues({
      institutionOfEducationType,
      name,
      abbreviation,
      site,
      address,
      phone,
      email,
      description,
      institutionOfEducationLat: lat,
      institutionOfEducationLon: lon,
    });
    setFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!fetching && (
        <>
          {console.log('render')}
          <div className={styles.editInfoSection}>
            <main className={styles.mainContent}>
              <h1 className={styles.title}>
                Дані про ваш університет, які ви можете змінити.
              </h1>
              <h3 className={styles.subtitle}>
                Натисніть на поле для вводу, щоб ввести нові дані
              </h3>
              <ImageUploader
                foto={foto}
                aspectRatio={16 / 9}
                text={'університету'}
              />
              <h2 className={styles.infoTitle}>Основна інформація</h2>
              <Formik initialValues={initialValues} onSubmit={(values) => {}}>
                {({ setFieldValue }) => (
                  <Form className={styles.mainContent}>
                    <div className={styles.infoBox}>
                      <div className={styles.selectField}>
                        <span>Тип закладу:</span>
                        <Field
                          as='select'
                          name='institutionOfEducationType'
                          className={styles.selector}
                        >
                          <option value='0'>Виберіть тип...</option>
                          <option value='1'>Університет</option>
                          <option value='2'>Коледж</option>
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
                    <Field
                      name='pos'
                      currentPosition={currentPosition}
                      setFieldValue={setFieldValue}
                      as={UniversityMap}
                    />
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

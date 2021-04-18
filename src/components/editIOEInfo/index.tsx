import React, { useState, useEffect } from 'react';
import Input from '../common/labeledInput';
import { Formik, Form, Field } from 'formik';
import styles from './editInstitutionOfEducationInfo.module.scss';
import { FormButton } from '../common/formElements/index';
import UniversityMap from '../superAdmin/addInstitutionOfEducationForm/map';
import ImageUploader from '../institutionOfEducationAdmin/imageUploader';

interface Values {
  name: string;
  abbreviation: string;
  site: string;
  address: string;
  phone: string;
  email: string;
  description: string;
}

interface FormikValues extends Values {
  institutionOfEducationLat: number | string;
  institutionOfEducationLon: number | string;
}

interface Info extends Values {
  lat: number | string;
  lon: number | string;
}

interface Props {
  data: Info;
  submitHandler(values: Info): void;
}

const EditInstitutionOfEducationInfo: React.FC<Props> = ({
  data,
  submitHandler,
}) => {
  // const [image, setImage] = useState('');
  const {
    name,
    abbreviation,
    site,
    address,
    phone,
    email,
    description,
    lat,
    lon,
  } = data;

  const initialValues = {
    name,
    abbreviation,
    site,
    address,
    phone,
    email,
    description,
  };

  // const imageHandler = (image: any) => {
  //   setImage(image);
  // };

  const onSubmit = (values: FormikValues) => {
    const {
      name,
      abbreviation,
      site,
      address,
      phone,
      email,
      description,
    } = values;
    const lat = values.institutionOfEducationLat;
    const lon = values.institutionOfEducationLon;
    const newData: Info = {
      name,
      abbreviation,
      site,
      address,
      phone,
      email,
      description,
      lat,
      lon,
    };
    submitHandler(newData);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Дані про ваш університет, які ви можете змінити.
        </h1>
        <h3 className={styles.subtitle}>
          Натисніть на поле для вводу, щоб ввести нові дані
        </h3>
        {/* <ImageUploader
foto={foto}
aspectRatio={16 / 9}
text={'університету'}
imageHandler={imageHandler}
/> */}
        <h2 className={styles.infoTitle}>Основна інформація</h2>
        <Formik
          initialValues={{
            ...initialValues,
            institutionOfEducationLat: lat,
            institutionOfEducationLon: lon,
          }}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form className={styles.formContainer}>
              <div className={styles.infoBox}>
                <div className={styles.selectField}>
                  <span>Тип закладу:</span>
                  <Field
                    as='select'
                    name='institutionOfEducationType'
                    className={styles.selector}
                  >
                    <option value=''>Виберіть тип...</option>
                    <option value='University'>Університет</option>
                    <option value='College'>Коледж</option>
                  </Field>
                </div>
                <Input id='name' label='Повна назва:' name='name' />
                <Input
                  id='abbreviation'
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
                <Input id='email' label='Електронна пошта:' name='email' />
                <Input id='site' label='Сайт:' name='site' />
                <Input id='phone' label='Телефон:' name='phone' />
                <Input id='address' label='Адреса:' name='address' />
              </div>
              <h2 className={styles.infoTitle}>Місце розташування</h2>
              <Field
                name='pos'
                currentPosition={[lat, lon]}
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
      </div>
    </main>
  );
};

export default EditInstitutionOfEducationInfo;

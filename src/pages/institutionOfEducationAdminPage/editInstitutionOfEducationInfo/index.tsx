import React, { useState, useEffect } from 'react';
import Input from '../../../components/common/labeledInput/index';
import { Formik, Form, Field } from 'formik';
import styles from './editInstitutionOfEducationInfoPage.module.scss';
import { FormButton } from '../../../components/common/formElements/index';
import UniversityMap from '../../../components/superAdmin/addInstitutionOfEducationForm/map';
import ImageUploader from '../../../components/institutionOfEducationAdmin/imageUploader';
import {
  requestData,
  requestSecureData,
} from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';

const EditInstitutionOfEducationInfoPage = () => {
  const [initialValues, setinitialValues] = useState<any>({});
  const [fetching, setFetching] = useState(true);
  const idU = '076f7ada-ec61-44e3-b4ed-87343b87dd6a';
  const { imagePath, lat, lon } = initialValues;
  const [image, setImage] = useState('');
  const foto = image || imagePath;
  const { token } = useAuth();

  useEffect(() => {
    const url = `${APIUrl}InstitutionOfEducation/${idU}`;
    requestData(url, 'GET').then((res) => {
      setinitialValues(res.data);
      setFetching(false);
    });
  }, []);

  const sendNewDescription = (formikValues: any) => {
    console.log('foto:', foto);
    const url = `${APIUrl}InstitutionOfEducationAdmin/ModifyDescriptionOfInstitution`;
    const data = {
      ...formikValues,
      lat: formikValues.institutionOfEducationLat,
      lon: formikValues.institutionOfEducationLon,
      imagePath: foto,
      imageApiModel: {
        photo: foto,
      },
    };
    console.log('data:', data);
    requestSecureData(url, 'POST', token!, data).then((res) => {
      console.log(res);
    });
  };

  const imageHandler = (image: any) => {
    setImage(image);
  };

  return (
    <>
      {!fetching && (
        <>
          {console.log(initialValues)}
          {console.log(image)}
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
                imageHandler={imageHandler}
              />
              <h2 className={styles.infoTitle}>Основна інформація</h2>
              <Formik
                initialValues={{
                  ...initialValues,
                  institutionOfEducationLat: '',
                  institutionOfEducationLon: '',
                }}
                onSubmit={(values) => {
                  sendNewDescription(values);
                  console.log(values);
                }}
              >
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
                          <option value=''>Виберіть тип...</option>
                          <option value='University'>Університет</option>
                          <option value='College'>Коледж</option>
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
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default EditInstitutionOfEducationInfoPage;

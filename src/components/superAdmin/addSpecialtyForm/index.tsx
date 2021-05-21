import React, { useEffect, useState } from 'react';
import styles from './addSpecialtyForm.module.scss';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';
import { requestSecureData, requestData } from '../../../services/requestDataFunction';
import { useHistory } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import { FormButton, FormInputError } from '../../common/formElements';
import { FormInputSuccess } from '../../common/formElements/formInputSuccess/formInputSuccess';
import { validationField } from '../../../services/validateForm/ValidatorsField';
import Spinner from '../../common/spinner';

const AddSpecialtyForm: React.FC = () => {
  const { getToken } = useAuth();
  const redirect = useHistory();
  const [submiting, setSubmitting] = useState(false);

  type FormikValues = {
    directionName: string;
    directionCode: string;
    directionId: string;
    specialtyDescription: string;
  };
  //error state
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });

  //status messages state
  const [resultMessage, setResultMessage] = useState({
    status: '',
    message: '',
  });
  const [isFetching, setFetching] = useState(false);
  const [directionsList, setList] = useState([
    {
      id: '',
      code: '',
      name: '',
    },
  ]);

  const fetchData = async ()=> {
    const endpoint: string = `${APIUrl}Direction/All`;
    setFetching(true);
    requestData(endpoint, 'GET').then((res: any) => {
      const statusCode = res.statusCode.toString();
      if (statusCode.match(/^[23]\d{2}$/)) {
        const newList = res.data.map((item: any) => {
          return {
            id: item.id,
            code: item.code,
            name: item.name,
          };
        });
        setList(newList);
        setFetching(false);
      } else {
        setError({
          hasError: true,
          errorStatusCode: res.statusCode,
          errorMessage:
            res.data.message || 'Виникла помилка у відображенні навчальних напрямків.',
        });
      }
    });
  }
  useEffect(() => {
    fetchData();
  }, []);


  const directionsName = directionsList.map((item: any, index: number) => {
    return <option 
              value={item.name}
              key={item.id}
              >
                {item.name} 
           </option>
  });
  
  const handleFormSubmit = async (values: FormikValues) => {
    const token = await getToken();
    console.log(token)
    setSubmitting(true);
    setResultMessage({
      status: '',
      message: '',
    });
    const { directionName, directionCode, directionId, specialtyDescription } = values;
    requestSecureData(
      `${APIUrl}SuperAdmin/AddSpecialty`, 'POST', token, {
        name: directionName,
        directionId: directionId,
        description: specialtyDescription,
        code: directionCode
      })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setResultMessage({
            status: 'success',
            message: res.data.message || 'Спеціальність успішно додано',
          });
          setSubmitting(false);
          setTimeout(() => {
            redirect.push(`${APIUrl}SuperAdmin/AddSpecialty`);
          }, 3000);
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
      <h1 className={styles.wrapper__title}>Нова спеціальність</h1>
      <Formik
        initialValues={{
          directionName: '',
          directionCode: '',
          directionId: '',
          specialtyDescription: '',
        }}
        onSubmit={handleFormSubmit}
      >
        {() => (
          <Form
            className={styles.form}
          >
            <div className={styles.topWrapper}>
              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='directionName'
                >
                  Напрям:
                </label>
                <Field
                  className={styles.topWrapper__input}
                  as='select'
                  id='directionName'
                  data-testid='select-type'
                  name='directionName'
                  value = {directionsList[0].name}
                >
                  { directionsName }
                </Field>
              </div>
              <div className={`${styles.halfWidth} ${styles.halfWidth__code}`}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='directionCode'
                >
                  Код:
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='directionCode'
                  name='directionCode'
                />
              </div>

              <div className={styles.fullWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='directionId'
                >
                  Назва:
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='directionId'
                  name='directionId'
                />
              </div>
              <div className={styles.topWrapper__column}>
                <div
                  className={`${styles.fullWidth} ${styles.fullWidth__textarea}`}
                >
                  <label
                    className={styles.topWrapper__label}
                    htmlFor='specialtyDescription'
                  >
                    Опис:
                  </label>
                  <Field
                    as='textarea'
                    id='specialtyDescription'
                    name='specialtyDescription'
                    className={styles.topWrapper__textarea}
                    type='textarea'
                  />
                </div>
              </div>
            </div>
            <FormButton
              id='userProfileButton'
              form='AddInstitutionOfEducation'
              title='Додати'
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSpecialtyForm;
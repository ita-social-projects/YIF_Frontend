import React, { useEffect, useState } from 'react';
import styles from './addSpecialtyForm.module.scss';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';
import { requestSecureData, requestData } from '../../../services/requestDataFunction';
import { useHistory } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import { FormButton, FormInputError } from '../../common/formElements';
import { FormInputSuccess } from '../../common/formElements/formInputSuccess/formInputSuccess';
import addNewSpeciatyFormValidator from './addSpecialtyFormValidation';
import Spinner from '../../common/spinner';

const AddSpecialtyForm: React.FC = () => {
  const { getToken } = useAuth();
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);

  //status messages state
  const [resultMessage, setResultMessage] = useState({
    status: '',
    message: '',
  });

  const [directionsList, setList] = useState([
    {
      id: '',
      code: '',
      name: '',
    },
  ]);
  const [specialtyID, setSpecialtyId] = useState('');

  const fetchData = async ()=> {
    const endpoint: string = `${APIUrl}Direction/All`;
    requestData(endpoint, 'GET')
    .then((res: any) => {
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
        setSpecialtyId(newList[0].id);
      } else {
        setResultMessage({
          status: 'error',
          message: res.data.message || 'Виникла помилка у відображенні навчальних напрямків.',
        });
      }
    })
    .catch((error) => {
      setResultMessage({
        status: 'error',
        message: 'Не вдалося завантажити навчальні напрямки.'
      });
    })
  }
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleFormSubmit = async (
    pathToRedirect: string,
    values: any
    ) => {
    setSubmitting(true);
    setResultMessage({
      status: '',
      message: '',
    });
    const token = await getToken();
    try {
    requestSecureData(
      `${APIUrl}SuperAdmin/AddSpecialty`, 'POST', token, {
        name: values.directionName,
        directionId: specialtyID,
        description: values.specialtyDescription,
        code: values.directionCode
      })
      .then((res: any) => {
          const statusCode = res.statusCode.toString();
          if (statusCode.match(/^[23]\d{2}$/)) {
            setResultMessage({
              status: 'success',
              message: res.data.message || 'Спеціальність успішно додано',
            });
            setTimeout(() => {
              history.push(pathToRedirect);
            }, 3000);
            setSubmitting(false);
          } else {
            setResultMessage({
              status: 'error',
                message: res.data.message || `${Object.keys(res.data.errors).length === 2 ? 'Такий код та назва спеціальності вже є у додатку' : res.data.errors.Code === undefined ? 'Така назва спеціальності вже є у додатку': 'Такий код спеціальності вже є у додатку'}`
              });
            }
        }
      )}
      catch(error){
        setResultMessage({
          status: 'error',
          message: 'Щось пішло не так, спробуйте знову.'
        })
      }
  }
  const allDirectionsNames = directionsList.map((item: any, index: number) => {
    return <option
              value={item.name}
              key={item.id}
              data-testid={item.name}
            >
              {item.name} 
           </option>
  });

  function findIdByTheName(specialtyName:string){
    directionsList.map((item: any, index: number) => {
      if(specialtyName === item.name){
        setSpecialtyId(item.id);
      }
    });
  }
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapper__title}>Нова спеціальність</h1>
      <Formik
        enableReinitialize
        initialValues={{
          directionID: '',
          directionCode: '',
          directionName: '',
          specialtyDescription: '',
        }}
        validationSchema={addNewSpeciatyFormValidator}
        onSubmit={(values, actions) => {
          handleFormSubmit('/superAdminAccount', values);
          
          actions.setSubmitting(false);
          actions.resetForm({
            values,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form
            className={styles.form}
          >
            <div className={styles.topWrapper}>
              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='allDirectionNames'
                >
                  Напрям
                </label>
                { directionsList[0].name.length>0 ?
                  <Field
                    className={styles.topWrapper__input}
                    as='select'
                    id='allDirectionNames'
                    data-testid='select-type'
                    name='allDirectionNames'
                    onChange={
                      (e: React.ChangeEvent<HTMLFormElement>) => 
                        {
                          findIdByTheName(e.target.value);
                        }
                    } 
                  >
                    {allDirectionsNames}
                  </Field>
                      : 
                  <Field
                    className={styles.topWrapper__input}
                    as='select'
                    id='allDirectionNames'
                    data-testid='select-type'
                    name='allDirectionNames'
                    value='Напрями відсутні'
                    disabled={true} 
                  > <option>Напрями відсутні</option>
                  </Field>
                }
              </div>

              <div className={`${styles.halfWidth} ${styles.halfWidth__code}`}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='directionCode'
                >
                  Код
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='directionCode'
                  name='directionCode'
                />
                {errors.directionCode &&
                touched.directionCode ? (
                  <FormInputError
                    errorType='inputFull'
                    errorMessage={errors.directionCode}
                  />
                ) : null}
              </div>

              <div className={styles.fullWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='directionName'
                >
                  Назва
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='directionName'
                  name='directionName'
                />
                {errors.directionName &&
                touched.directionName ? (
                  <FormInputError
                    errorType='inputFull'
                    errorMessage={errors.directionName}
                  />
                ) : null}
              </div>
              
              <div
                className={`${styles.fullWidth} ${styles.fullWidth__textarea}`}
              >
                <label
                  className={styles.topWrapper__label}
                  htmlFor='specialtyDescription'
                >
                  Опис
                </label>
                <Field
                  as='textarea'
                  id='specialtyDescription'
                  name='specialtyDescription'
                  className={styles.topWrapper__textarea}
                  type='textarea'
                />
                {errors.specialtyDescription &&
                touched.specialtyDescription ? (
                  <FormInputError
                    errorType='inputFull'
                    errorMessage={errors.specialtyDescription}
                  />
                ) : null}
              </div>

              
                  
               
            </div>
            <div className={styles.botWrapper}>
              <div className={`${styles.resultMessageContainer} ${styles.messagesContainer}`}>
                {submitting && resultMessage.status === 'success' && (
                  <div className={styles.spinner}>
                    <Spinner />
                  </div>
                )}
                {resultMessage.status === 'success' && (
                  <FormInputSuccess successMessage={resultMessage.message} />
                )}
                {resultMessage.status === 'error' && (
                  <FormInputError
                    errorType='form'
                    errorMessage={resultMessage.message}
                  />
                )}
              </div>
              <FormButton
                id='userProfileButton'
                form='AddInstitutionOfEducation'
                title='Додати'
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSpecialtyForm;
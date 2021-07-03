import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormButton } from '../../../common/formElements';
import { Formik, Form, Field } from 'formik';
import styles from './tabs.module.scss';
import { requestSecureData } from '../../../../services/requestDataFunction';
import { APIUrl } from '../../../../services/endpoints';
import Spinner from '../../../common/spinner';
import { useAuth } from '../../../../services/tokenValidator';
import tabContextValidation from './tabContextValidation';
import { FormInputSuccess } from '../../../common/formElements/formInputSuccess/formInputSuccess';
import { FormInputError } from '../../../common/formElements';

interface Moderator {
  userId: string;
  email: string;
}

interface props {
  IoEid: { pathname: string }
}

function Tabs(props: props) {
  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index: any) => {
    setToggleState(index);
  };
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const { getToken } = useAuth();
  const [moderators, setModerators] = useState<Array<Moderator>>([
    {
      userId: '',
      email: '',
    },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState({
    status: '',
    message: '',
  });
  
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
    console.log(props.IoEid);
    requestSecureData(
      `${APIUrl}SuperAdmin/AddInstitutionOfEducationAdmin`, 'POST', token, {
        institutionOfEducationId: props.IoEid,
        adminEmail: values.add_by_email
      })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setResultMessage({
            status: 'success',
            message: `Заклад отримав нового адміністратора!`,
          });
          setTimeout(() => {
            history.push(pathToRedirect);
          }, 3000);
          setSubmitting(false);
        }
        else {
          setResultMessage({
            status: 'error',
              message: res.data.title || 'Щось пішло не так, спробуйте знову.'
            });
          }
        }
      )
      .catch((error)=>{
        setResultMessage({
          status: 'error',
          message: error.message || 'Щось пішло не так, спробуйте знову.'
        })
      });
  }

  useEffect(() => {
    const getInfo = async () => {
      try {
        const currentToken = await getToken();
        const { statusCode, data }: any = await requestSecureData(
          `${APIUrl}SuperAdmin/GetIoEModeratorsById/${props.IoEid}`,
          'GET',
          currentToken,
        );
        if (statusCode.toString().match(/^[23]\d{2}$/)) {
          setModerators(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setIsFetching(false);
      }
    };
    getInfo();
  }, []);

  let content;
  if (isFetching && !error) {
    content = (
      <div className={styles.noContentContainer}>
        <Spinner />
      </div>
    );
  } else if (error && !isFetching) {
    content = (
      <div className={styles.noContentContainer}>
        <h2>Щось пішло не так, спробуйте знову.</h2>
      </div>
    );
  } else {
    content = (
      <div className='container'>
        <div className={styles.tabs}>
          <div
            data-testid='toggle-btn1'
            className={
              toggleState === 1
                ? `${styles.tabs__block} ${styles.tabs__block__active}`
                : `${styles.tabs__block}`
            }
            onClick={() => toggleTab(1)}
          >
            Додати по емейл
          </div>

          <div
            data-testid='toggle-btn2'
            className={
              toggleState === 1
                ? `${styles.tabs__block} ${styles.tabs__block__active}`
                : `${styles.tabs__block}`
            }
            onClick={() => toggleTab(2)}
          >
            Вибрати зі списку модераторів
          </div>
        </div>

        <div className={styles.content}>
          <div
            className={
              toggleState === 1
                ? `${styles.content__tabs} ${styles.content__tabs__active}` 
                : `${styles.content__tabs}`
            }
          >
            <div className={styles.topWrapper__title}>
              Додати адміністратора:
            </div>
            <Formik
              enableReinitialize
              initialValues={{
                add_by_email:''
              }}
              validationSchema={tabContextValidation}
              onSubmit={(values, actions) => {
                handleFormSubmit('/superAdminAccount', values);
                actions.setSubmitting(false);
                actions.resetForm({
                  values,
                });
              }}>
              {({errors, touched}) => (
                
                <Form data-testid='toggle-content-1' className={styles.mainContent}>
                  
                  <div className={styles.input_block}>
                    <label
                     className={styles.topWrapper__label}
                     htmlFor='add_by_email'
                    >
                      Електронна адреса
                    </label>
                    <Field
                      id='add_by_email'
                      name='add_by_email'
                      placeholder='Email'
                      
                    />
                    {errors.add_by_email &&
                    touched.add_by_email ? (
                      <FormInputError
                        errorType='inputFull'
                        errorMessage={errors.add_by_email}
                      />
                      ) : null
                    }
                    <FormButton
                    title={'Додати'}
                    id='registerFormButton'
                    data-testid='button'
                    form='register'
                  />
                  </div>
                </Form>
              )}
            </Formik>
            
            <div className={styles.resultMessageContainer}>
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
          </div>

          <div
            className={
              toggleState === 2
                ? `${styles.content__tabs} ${styles.content__tabs__active}`
                : `${styles.content__tabs}`
            }
          >
            <div data-testid='toggle-content-2' className={styles.moderators__top}>
              <p className={styles.moderators__top__address}>Електронна адреса</p>
            </div>
            {moderators.map((moderator) => {
              return (
                <div data-testid="moderator" key={moderator.userId} className={styles.moderators__item}>
                  <div className={styles.moderators__item__mail}>
                    {moderator.email}
                  </div>
                  <div className={styles.moderators__item__link}>
                    Призначити адміном
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
}

export default Tabs;

import React, { useEffect, useState } from 'react';
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
import ResponsePlaceholder from '../../../common/responsePlaceholder';

interface Moderator {
  userId: string;
  email: string;
}

interface props {
  IoEid: { pathname: string },
  isAdminChanged: boolean,
  setIsAdminChanged: any
}

function Tabs(props: props) {
  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index: any) => {
    setToggleState(index);
  };
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
  
  const showMessage = (statusCode: any, msg: string) => {
    const result = (statusCode.match(/^[23]\d{2}$/)) ? 'success' : 'error';
    setResultMessage({
      status: result,
      message: msg,
    });
    setTimeout(() => {
      setResultMessage({
        status: '',
        message: '',
      });
    }, 4000);
  }

  const handleFormSubmit = async (pathToRedirect: string,values: any) => {
    setSubmitting(true);
    const token = await getToken();
    requestSecureData(
      `${APIUrl}SuperAdmin/AddInstitutionOfEducationAdmin`, 'POST', token, {
        institutionOfEducationId: props.IoEid,
        adminEmail: values.add_by_email
      })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          showMessage(statusCode.toString(), `Заклад отримав нового адміністратора!`)
          props.setIsAdminChanged(!props.isAdminChanged);
          setSubmitting(false);
        }
        else {
          showMessage(statusCode.toString(), statusCode === '409' ? 'Цей навчальний заклад уже має адміністратора' : 'Щось пішло не так, спробуйте знову.');
        }
      })
      .catch((error)=>{
        showMessage(error.toString(), 'Щось пішло не так, спробуйте знову.');
      });
  }

  const chooseIoEadmin = async (userId: string, ioEId: { pathname: string; }) => {
    try {
      const currentToken = await getToken();
      const { statusCode, data }: any = await requestSecureData(
        `${APIUrl}SuperAdmin/ChooseIoEAdminFromModerators`,
        'PUT',
        currentToken,
        {
          userId: userId,
          ioEId: ioEId
        });
      if (statusCode.toString().match(/^[23]\d{2}$/)) {
        showMessage(statusCode.toString(), `Заклад отримав нового адміністратора!`)
        props.setIsAdminChanged(!props.isAdminChanged);
        setError(false);
      } else {
        showMessage(statusCode.toString(), data.errors.IoEId[0])
      }
    } catch (e) {
      setError(true)
    } finally {
      setIsFetching(false);
    }
  };

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
  }, [props.isAdminChanged]);

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
        <ResponsePlaceholder errorMessage = 'Щось пішло не так, спробуйте знову.'/>
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
            data-testid='toggle-content-0'
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
                      data-testid='email-field'
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
                <FormInputSuccess 
                  successMessage={resultMessage.message} 
                  data-test-id ='success message'
                />
              )}
              {resultMessage.status === 'error' && (
                <FormInputError
                  data-test-id ='eror message'
                  errorType='form'
                  errorMessage={resultMessage.message}
                />
              )}
            </div>
          </div>

          <div
            data-testid='toggle-content-2'
            className={
              toggleState === 2
                ? `${styles.content__tabs} ${styles.content__tabs__active}`
                : `${styles.content__tabs}`
            }
          >
            <div className={styles.moderators__top}>
              <p className={styles.moderators__top__address}>Електронна адреса</p>
            </div>
            {moderators.map((moderator) => {
              return (
                <div data-testid="moderator" key={moderator.userId} className={styles.moderators__item}>
                  <div className={styles.moderators__item__mail}>
                    {moderator.email}
                  </div>
                  <button data-testid="chooseBtn" className={styles.moderators__item__link} onClick={()=>{chooseIoEadmin(
                    moderator.userId,
                    props.IoEid
                  )}}>
                    Призначити адміном
                  </button>
                </div>
              )
            })}
            <div className={styles.resultMessageContainer}>
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
        </div>
      </div>
    );
  }
  return <>{content}</>;
}

export default Tabs;

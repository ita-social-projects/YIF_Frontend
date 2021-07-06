import React, { useEffect, useState } from 'react';
import Input from '../../../common/labeledInput';
import { FormButton } from '../../../common/formElements';
import { Formik, Form } from 'formik';
import styles from './tabs.module.scss';
import { requestSecureData, requestWithBody } from '../../../../services/requestDataFunction';
import { APIUrl } from '../../../../services/endpoints';
import Spinner from '../../../common/spinner';
import { useAuth } from '../../../../services/tokenValidator';

interface Moderator {
  userId: string;
  email: string;
}

interface Message {
  errors: {
    IoEId: string[];
  };
}

interface props {
  IoEid: { pathname: string }
}

function Tabs(props: props) {

  let initialValues = {};
  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index: any) => {
    setToggleState(index);
  };

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const { getToken } = useAuth();
  const [isErrorActive, setIsErrorActive] = useState(false);
  const [moderators, setModerators] = useState<Array<Moderator>>([
    {
      userId: '',
      email: '',
    },
  ]);
  const [message, setMessage] = useState<Message>({
    errors: {
      IoEId: ['']
    }
  });

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
          console.log(data)
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

  const chooseIoEadmin = async (userId: string, ioEId: { pathname: string; }) => {
    try {
      const { statusCode, data }: any = await requestWithBody(
        `${APIUrl}SuperAdmin/ChooseIoEAdminFromModerators`,
        'PUT',
        {
          userId: userId,
          ioEId: ioEId
        });
      if (statusCode.toString().match(/^[23]\d{2}$/)) {
        setError(false);
        console.log("success!")
      } else {
        setMessage(data);
        setIsErrorActive(true)
        setTimeout(
          function() {
            setIsErrorActive(false)
          }, 3000);
        console.log("error!")
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  };

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
            <Formik initialValues={initialValues} onSubmit={() => {}}>
              {() => (
                <Form data-testid='toggle-content-1' className={styles.mainContent}>
                  <div className={styles.mainInfo}>
                    <Input
                      id='email'
                      label='Додати адміністратора:'
                      name='addAdmin'
                      placeholder='Email'
                    />
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
                  <button className={styles.moderators__item__link} onClick={()=>{chooseIoEadmin(
                    moderator.userId,
                    props.IoEid
                  )}}>
                    Призначити адміном
                  </button>
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

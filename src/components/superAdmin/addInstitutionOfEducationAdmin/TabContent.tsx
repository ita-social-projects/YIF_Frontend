import React, { useEffect, useState } from 'react';
import Input from '../../../components/common/labeledInput/index';
import { FormButton } from '../../../components/common/formElements/index';
import { Formik, Form } from 'formik';
import styles from './tabs.module.scss';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import Spinner from '../../common/spinner';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../../services/tokenValidator';

interface Moderator {
  userId: string;
  email: string;
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

  const { path } = useRouteMatch();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const { getToken } = useAuth();
  const [moderators, setModerators] = useState<Array<Moderator>>([
    {
      userId: '',
      email: '',
    },
  ]);

  useEffect(() => {
    const chooseIoEadmin = async () => {
      try {
        const currentToken = await getToken();
        const { statusCode, data }: any = await requestSecureData(
          `${APIUrl}SuperAdmin/ChooseIoEAdminFromModerators`,
          'PUT',
          currentToken,
        );
        if (statusCode.toString().match(/^[23]\d{2}$/)) {
          setModerators(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setIsFetching(false);
      }
    };

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
        console.log(e);
        setError(true);
      } finally {
        setIsFetching(false);
      }
    };
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            data-testid='toggle-btn'
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
            data-testid='toggle-btn'
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
                <Form className={styles.mainContent}>
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
            <div className={styles.moderators__top}>
              <p className={styles.moderators__top__address}>Електронна адреса</p>
            </div>
            {moderators.map((moderator) => {
              return (
                <div key={moderator.userId} className={styles.moderators__item}>
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

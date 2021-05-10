import React, { useState, useEffect } from 'react';
import Input from '../../../components/common/labeledInput/index';
import { FormButton } from '../../../components/common/formElements/index';
import { Formik, Form } from 'formik';
import styles from './tabs.module.scss';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';
import { requestSecureData } from '../../../services/requestDataFunction';

// const emailList = [
//   {
//     email: 'Karley_Dach@melissa.tv',
//   },
//   {
//     email: 'Karley_Dach@melissa.tv',
//   },
//   {
//     email: 'Shanna@melissa.tv',
//   },
//   {
//     email: 'Shanna@melissa.tv',
//   },
// ];

const Tabs = (props: { id: any }) => {
  const { getToken } = useAuth();
  let initialValues = {};
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index: any) => {
    setToggleState(index);
  };

  const [moderatorsList, setModeratorsList] = useState({});

  const getModeratorsList = async () => {
    const endpoint = `${APIUrl}SuperAdmin/GetIoEModeratorsById${props.id}`;
    const currentToken = await getToken();
    console.log(`currentToken`, currentToken);

    requestSecureData(endpoint, 'GET', currentToken).then((res: any) => {
      console.log(`res`, res);
      // const statusCode = res.statusCode.toString();
      // if (statusCode.match(/^[23]\d{2}$/)) {
      //   setModeratorsList(res.data);
      //   console.log(`res.data`, res.data);
      // } else {
      //   console.log(`error`);
      // }
    });
  };

  useEffect(() => {
    getModeratorsList();
  }, []);

  return (
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
          <div className={styles.moderators__list}>
            {/* {moderatorsList.map((item: any, key: number) => {
              return (
                <div key={key} className={styles.moderators__item}>
                  <div className={styles.moderators__item__mail}>
                    {item.email}
                  </div>
                  <div className={styles.moderators__item__link}>
                    Призначити адміном
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;

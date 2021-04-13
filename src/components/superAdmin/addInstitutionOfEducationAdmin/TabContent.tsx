 import React, { useState } from 'react';
import Input from '../../../components/common/labeledInput/index';
import { FormButton } from '../../../components/common/formElements/index';
import { Formik, Form } from 'formik';
import styles from './tabs.module.scss';

const emailList = [
  {
    email: 'Karley_Dach@melissa.tv',
  },
  {
    email: 'Karley_Dach@melissa.tv',
  },
  {
    email: 'Shanna@melissa.tv',
  },
  {
    email: 'Shanna@melissa.tv',
  }
]
function Tabs() {
  const [initialValues, setinitialValues] = useState({});
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: any) => {
    setToggleState(index);
  };

  return (
   
    <div className="container">
      <div className={styles.tabs}>
        <div 
        data-testid='toggle-btn' 
        className={toggleState === 1 ? `${styles.tabs__block} ${styles.tabs__block__active}` : `${styles.tabs__block}`} 
        onClick={() => toggleTab(1)}>
          Додати по емейл</div>
        
        <div 
        data-testid='toggle-btn'
        className={toggleState === 1 ? `${styles.tabs__block} ${styles.tabs__block__active}` : `${styles.tabs__block}`} 
        onClick={() => toggleTab(2)}>
          Вибрати зі списку модераторів</div>
      </div>

      <div className= {styles.content}>
        <div
          className={toggleState === 1 ? `${styles.content__tabs} ${styles.content__tabs__active}` : `${styles.content__tabs}`}
        >
            <Formik
                  initialValues={initialValues}
                  onSubmit={() => {}}
                >
                  {() => (
                    <Form className={styles.mainContent}>
                      <div className={styles.mainInfo}>
                        <Input id='email' label='Додати адміністратора:' name='addAdmin' placeholder="Email"/>
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
          className={toggleState === 2 ? `${styles.content__tabs} ${styles.content__tabs__active}` : `${styles.content__tabs}`}
        >
            <div className={styles.moderators__top}>
              <p className={styles.moderators__top__address}>Електронна адреса</p>
            </div>
            <div className={styles.moderators__list}>
            { emailList.map((item: any, key: number) => {
              return(
              <div key={key} className={styles.moderators__item}>
                  
                  <div className={styles.moderators__item__mail}>
                    {item.email}
                    
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
    </div>
  );
}

export default Tabs;


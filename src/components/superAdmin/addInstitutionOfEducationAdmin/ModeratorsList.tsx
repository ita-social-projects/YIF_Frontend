 import React, { useState } from 'react';
import Input from '../../../components/common/labeledInput/index';
import { FormButton } from '../../../components/common/formElements/index';
import { Formik, Form } from 'formik';
import styles from './addInstitutionOfEducation.module.scss';


const EmailInput = () => {
   const [initialValues, setinitialValues] = useState({});
   const [opened, setOpened] = useState(false);
   const handleClick = (e: any) => {
    setOpened(!opened);
  };
      return (
        <>
        <div className={styles.moderators} onClick={(e) => handleClick(e)}>Вибрати з модераторів</div>
          <div className={`${styles.moderators__wrapper} ${opened ? `${styles.moderators__wrapper__opened}` : null}`}>
            <div className={styles.moderators__top}>
              <p className={styles.moderators__top__address}>Електронна адреса</p>
            </div>
            <div className={styles.moderators__list}>
                <div className={styles.moderators__item}>
                  <div className={styles.moderators__item__mail}>
                    Karley_Dach@melissa.tv
                  </div>
                  <div className={styles.moderators__item__link}>
                    Призначити адміном
                  </div>
                </div>
            </div>
          </div>
        </>
      );
};

export default EmailInput;


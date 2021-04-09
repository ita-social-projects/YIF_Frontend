 import React, { useState } from 'react';
import { APIUrl } from '../../../services/endpoints';
import Input from '../../../components/common/labeledInput/index';
import { FormButton } from '../../../components/common/formElements/index';
import { Formik, Form } from 'formik';
import styles from './addInstitutionOfEducation.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import AccordionItem from '../../accordion';


const EmailInput = () => {
   const [initialValues, setinitialValues] = useState({});
   const [opened, setOpened] = useState(false);
   const handleClick = (e: any) => {
    setOpened(!opened);
  };
      return (
        <>
        <div className={styles.email__add} onClick={(e) => handleClick(e)}>Додати по емейл</div>
          <div className={`${styles.input__wrapper} ${opened ? `${styles.input__wrapper__opened}` : null}`}>
            <Formik
                  initialValues={initialValues}
                  onSubmit={() => {}}
                >
                  {() => (
                    <Form className={styles.mainContent}>
                      <div className={styles.mainInfo}>
                        <Input id='name' label='Додати адміністратора:' name='addAdmin' />
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
        </>
      );
};

export default EmailInput;


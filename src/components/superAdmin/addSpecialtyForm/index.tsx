import React from 'react';
import styles from './addSpecialtyForm.module.scss';
import { FormButton } from '../../common/formElements';
import { Field, Formik, Form } from 'formik';
import { validationField } from '../../../services/validateForm/ValidatorsField';

const AddSpecialtyForm = () => {
  return (
    <div className={styles.wrapper}>
        <h1 className={styles.wrapper__title}>
          Нова спеціальність
        </h1>
      <Formik
        initialValues={{
          directionName: '',
          directionCode: '',
          specialtyName: '',
          specialtyDescription: '',
        }}
        validationSchema={validationField}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <Form
            className={styles.form}
            onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
              handleSubmit(e);
            }}
          >
            <div className={styles.topWrapper}>
              <div className={styles.halfWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='directionNam'
                >
                  Напрям:
                </label>
                <Field
                  className={styles.topWrapper__input}
                  as='select'
                  id='directionName'
                  data-testid='select-type'
                  name='directionNam'
               
                >
                  <option data-testid='empty' value=''>Інформаційні технології</option>
                  <option data-testid='university' value='university'>
                    Соціальні та поведінкові науки
                  </option>
                  <option data-testid='college' value='college'>
                    Електрична інженерія
                  </option>
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
                  value={'010'}
                />

              </div>

              <div className={styles.fullWidth}>
                <label
                  className={styles.topWrapper__label}
                  htmlFor='specialtyName'
                >
                  Назва:
                </label>
                <Field
                  className={styles.topWrapper__input}
                  id='specialtyName'
                  name='specialtyName'
                  value={'Інженерія програмного забезпечення(Інтернет речей)'}
                />
              </div>
              <div className={styles.topWrapper__column}>
                <div className={`${styles.fullWidth} ${styles.fullWidth__textarea}`}>
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
                    value={'"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'}
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

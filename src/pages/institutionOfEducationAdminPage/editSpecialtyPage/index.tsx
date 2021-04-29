import React, { useState, useEffect } from 'react';
import Input from '../../../components/common/labeledInput/index';
import { Formik, Form } from 'formik';
import styles from './editSpecialty.module.scss';
import { FormButton } from '../../../components/common/formElements/index';
import editSpecialtyValidation from './editSpecialtyValidation';

const EditSpecialty = () => {
  const [initialValues, setinitialValues] = useState({});
  const [fetching, setFetching] = useState(true);
  const {
    specialtyName,
    educationalProgramLink,
    description,
    examRequirements,
  } = {
    specialtyName: 'Автоматизація та комп’ютерно-інтегровані технології',
    educationalProgramLink: 'example.com',
    description:
      'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
    examRequirements: [
      {
        examName: 'Англійська мова',
        minimumScore: 100,
        coefficient: 0.25,
      },
      {
        examName: 'Математика',
        minimumScore: 100,
        coefficient: 0.4,
      },
      {
        examName: 'Українська мова та література',
        minimumScore: 100,
        coefficient: 0.25,
      },
    ],
  };

  useEffect(() => {
    const requirements: any = {};
    examRequirements.forEach((i) => {
      const { examName, coefficient, minimumScore } = i;
      requirements[`${examName}${minimumScore}`] = minimumScore;
      requirements[`${examName}`] = coefficient;
    });
    setinitialValues({
      specialtyName: specialtyName,
      paymentForm: 'бюджет, контракт',
      educationFormName: 'денна, заочна, вечірня',
      educationalProgramLink: educationalProgramLink,
      description: description,
      ...requirements,
    });
    setFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!fetching && (
        <>
          <div className={styles.editSpecialty}>
            <main className={styles.mainContent}>
              <h1 className={styles.title}>
                Дані про спеціальність у вашому університеті, які ви можете
                змінити
              </h1>
              <h3 className={styles.subtitle}>
                Натисніть на поле для вводу, щоб ввести нові дані
              </h3>
              <h2 className={styles.infoTitle}>Основна інформація</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={editSpecialtyValidation}
                onSubmit={() => {}}
              >
                {() => (
                  <Form className={styles.mainContent}>
                    <div className={styles.mainInfo}>
                      <Input id='name' label='Назва:' name='specialtyName' />
                      <Input
                        id='paymentForm'
                        label='Оплата:'
                        name='paymentForm'
                      />
                      <Input
                        id='educationForm'
                        label='Форма навчання:'
                        name='educationFormName'
                      />
                      <Input
                        id='educationalProgramLink'
                        label='Програма:'
                        name='educationalProgramLink'
                      />
                      <Input
                        id='description'
                        label='Опис'
                        name='description'
                        area='true'
                      />
                    </div>
                    <h2 className={styles.infoTitle}>Вимоги до ЗНО</h2>
                    {examRequirements.map((exam) => {
                      const { examName, minimumScore } = exam;
                      return (
                        <div className={styles.customInput} key={examName}>
                          <span>{examName}:</span>
                          <Input
                            id={`${examName}${minimumScore}`}
                            label='Мінімум балів:'
                            name={`${examName}${minimumScore}`}
                            requirement='true'
                            type='number'
                            min='0'
                            max='200'
                            step='1'
                          />
                          <Input
                            id={`${examName}`}
                            label='Коефіцієнт:'
                            name={`${examName}`}
                            requirement='true'
                            type='number'
                            min='0'
                            max='1'
                            step='0.01'
                          />
                        </div>
                      );
                    })}
                    <FormButton
                      title={'Зберегти'}
                      id='registerFormButton'
                      data-testid='button'
                      form='register'
                    />
                  </Form>
                )}
              </Formik>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default EditSpecialty;

import React, { useState, useEffect } from 'react';
import Input from '../../../components/common/labeledInput/index';
import { Formik, Form } from 'formik';
import styles from './editSpecialty.module.scss';
import { FormButton } from '../../../components/common/formElements/index';
import editSpecialtyValidation from './editSpecialtyValidation';
import Plus from '../../../components/common/icons/Plus';

const EditSpecialty = () => {
  const [initialValues, setinitialValues] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [examRequirements, setExamRequirements] = useState<any>([]);
  const [fetching, setFetching] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { specialtyName, educationalProgramLink, description } = {
    specialtyName: 'Автоматизація та комп’ютерно-інтегровані технології',
    educationalProgramLink: 'example.com',
    description:
      'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
  };

  const examSubjects = [
    { id: 1, examName: 'Англійська мова' },
    { id: 2, examName: 'Математика' },
    { id: 3, examName: 'Українська мова та література' },
    { id: 4, examName: 'Біологія' },
    { id: 5, examName: 'Фізика' },
    { id: 6, examName: 'Християнська етика' },
  ];

  const addSubject = (id: number) => {
    console.log('Cliked');
    examSubjects.forEach((i) => {
      if (id === i.id) {
        setExamRequirements([...examRequirements, i]);
        console.log(examRequirements);
      }
    });
    setIsChanged(!isChanged);
  };

  useEffect(() => {
    const requirements: any = {};
    examRequirements.forEach((i: any) => {
      const { examName, id } = i;
      requirements[`${examName}${id}`] = '';
      requirements[`${examName}`] = '';
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
  }, [isChanged]);

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
                    {examRequirements.map((exam: any) => {
                      const { examName, id } = exam;
                      return (
                        <div className={styles.customInput} key={id}>
                          <span>{examName}:</span>
                          <Input
                            id={`${examName}${id}`}
                            label='Мінімум балів:'
                            name={`${examName}${id}`}
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
                    <div
                      className={styles.plusContainer}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <Plus />
                      <span>Додати предмет</span>
                    </div>
                    {isOpen && (
                      <div className={`${styles.subjectContainer}`}>
                        <div className={styles.containerHeader}>
                          <span>Виберіть предмети</span>
                          <div
                            className={styles.closeContainerIcon}
                            onClick={() => setIsOpen(!isOpen)}
                          ></div>
                        </div>
                        <div className={styles.subjectWrapper}>
                          {examSubjects.map((subject) => {
                            return (
                              <div
                                key={subject.id}
                                className={styles.subject}
                                onClick={() => {
                                  addSubject(subject.id);
                                  console.log(subject.id);
                                }}
                              >
                                {subject.examName}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
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

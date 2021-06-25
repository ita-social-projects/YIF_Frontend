import React, { useState, useEffect, useReducer } from 'react';
import Input from '../../../../components/common/labeledInput';
import { Formik, Form } from 'formik';
import styles from './editSpecialty.module.scss';
import { FormButton } from '../../../../components/common/formElements';
import editSpecialtyValidation from './editSpecialtyValidation';
import Plus from '../../../../components/common/icons/Plus';
import Delete from '../../../../components/common/icons/Delete';

const examSubjects = [
  { id: 1, examName: 'Англійська мова' },
  { id: 2, examName: 'Математика' },
  { id: 3, examName: 'Українська мова та література' },
  { id: 4, examName: 'Біологія' },
  { id: 5, examName: 'Фізика' },
  { id: 6, examName: 'Християнська етика' },
];

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'setInitialValues':
      return {
        ...state,
        initialValues: {
          ...action.payload,
        },
      };
    case 'setExamSubjects':
      return {
        ...state,
        fetching: false,
        eSubjects: action.payload,
      };

    case 'addRequirement':
      return {
        ...state,

        examRequirements: [
          ...state.examRequirements,
          ...state.eSubjects.filter((s: any) => s.id === action.payload),
        ],
        eSubjects: state.eSubjects.filter((s: any) => s.id !== action.payload),
      };
    case 'removeRequirement':
      return {
        ...state,
        eSubjects: [
          ...state.eSubjects,
          ...state.examRequirements.filter((s: any) => s.id === action.payload),
        ],
        examRequirements: [
          ...state.examRequirements.filter((s: any) => s.id !== action.payload),
        ],
      };

    default:
      return state;
  }
}

const EditSpecialty = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { specialtyName, educationalProgramLink, description } = {
    specialtyName: 'Автоматизація та комп’ютерно-інтегровані технології',
    educationalProgramLink: 'example.com',
    description:
      'Це базовий опис спеціальності. Ця спеціальність підійде для тих хто хоче реалізувати себе у майбутньому у даній галузі. Для здобувачів вищої освіти вона буде цікавою тому що вони зможуть розкрити себе у даному напрямку за рахунок актуальної інформації, яку будуть доносити ним професіонали своєї справи, які є майстрами у своїй галузі.',
  };
  const initialState = {
    fetching: true,
    initialValues: null,
    eSubjects: [],
    examRequirements: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fetching, initialValues, eSubjects, examRequirements } = state;

  useEffect(() => {
    const requirements: any = {};
    examRequirements.forEach((i: any) => {
      const { examName, id } = i;
      requirements[`${examName}${id}`] = '';
      requirements[`${examName}`] = '';
    });
    dispatch({
      type: 'setInitialValues',
      payload: {
        specialtyName: specialtyName,
        paymentForm: 'бюджет, контракт',
        educationFormName: 'денна, заочна, вечірня',
        educationalProgramLink: educationalProgramLink,
        description: description,
        ...requirements,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.examRequirements]);

  useEffect(() => {
    dispatch({
      type: 'setExamSubjects',
      payload: examSubjects,
    });
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
                        label='Опис:'
                        name='description'
                        area='true'
                      />
                    </div>
                    <h2 className={styles.infoTitle}>Вимоги до ЗНО</h2>
                    {isOpen && eSubjects.length > 0 && (
                      <div className={`${styles.subjectContainer}`}>
                        <div className={styles.containerHeader}>
                          <span>Виберіть предмети</span>
                          <div
                            className={styles.closeContainerIcon}
                            onClick={() => setIsOpen(!isOpen)}
                          ></div>
                        </div>
                        <div className={styles.subjectWrapper}>
                          {eSubjects.map((subject: any) => {
                            return (
                              <div
                                key={subject.id}
                                className={styles.subject}
                                onClick={() => {
                                  dispatch({
                                    type: 'addRequirement',
                                    payload: subject.id,
                                  });
                                }}
                              >
                                {subject.examName}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
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
                          <div
                            className={styles.deleteRequirement}
                            onClick={() => {
                              dispatch({
                                type: 'removeRequirement',
                                payload: id,
                              });
                            }}
                          ></div>
                        </div>
                      );
                    })}
                    {!isOpen && (
                      <div className={styles.plusContainer}>
                        <Plus handleClick={() => setIsOpen(!isOpen)} />
                        <span onClick={() => setIsOpen(!isOpen)}>
                          Додати предмет
                        </span>
                      </div>
                    )}

                    <div className={styles.specialtyAction}>
                      <FormButton
                        title={'Зберегти'}
                        id='registerFormButton'
                        data-testid='button'
                        form='register'
                      />
                      {/*<Delete />*/}
                    </div>
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

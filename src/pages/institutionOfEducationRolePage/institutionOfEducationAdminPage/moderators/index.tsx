import React, { useState, useEffect } from 'react';
import ActionInput from '../../../../components/institutionOfEducationAdmin/actionInput';
import Moderator from '../../../../components/institutionOfEducationAdmin/moderator';
import styles from './moderators.module.scss';
import { Form, Formik } from 'formik';

interface Moderator {
  id: number;
  email: string;
  isBlocked: boolean;
}

const moderators = [
  {
    id: 1,
    email: 'moderator1@gmail.com',
    isBlocked: false,
  },
  {
    id: 2,
    email: 'moderator2@gmail.com',
    isBlocked: false,
  },
  {
    id: 3,
    email: 'moderator3@gmail.com',
    isBlocked: false,
  },
  {
    id: 4,
    email: 'moderator4@gmail.com',
    isBlocked: false,
  },
  {
    id: 5,
    email: 'moderator5@gmail.com',
    isBlocked: false,
  },
];

function Moderators() {
  const [moderatorsState, setModeratorsState] = useState<Array<Moderator>>([
    {
      id: 0,
      email: '',
      isBlocked: false,
    },
  ]);

  useEffect(() => {
    setModeratorsState(moderators);
  }, []);

  const handleModeratorBlocking = (id: number) => {
    const updated = moderatorsState.map((moderator) => {
      if (id === moderator.id) {
        moderator.isBlocked = !moderator.isBlocked;
      }
      return moderator;
    });
    setModeratorsState(updated);
  };

  const handleModeratorDeleting = (id: number) => {
    const updated = moderatorsState.filter((moderator) => {
      return moderator.id !== id;
    });
    setModeratorsState(updated);
  };
  return (
    <main className={styles.moderators}>
      <div className={styles.container}>
        <h1 className={styles.title}>Модератори</h1>
        <h2 className={styles.subtitle}>
          Щоб додати модератора, ведіть електрону пошту особи, яку бажаєте
          призначити модератором і ми відправимо на неї лист для реєстрації
        </h2>
        <div className={styles.emailInput}>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={() => {}}
          >
            <Form className={styles.addModeratorForm}>
              <ActionInput name='email' />
            </Form>
          </Formik>
        </div>

        <div className={styles.moderatorList}>
          {moderatorsState.map((moderator) => {
            const { id, email, isBlocked } = moderator;
            return (
              <Moderator
                key={id}
                email={email}
                deleteHandler={() => {
                  handleModeratorDeleting(id);
                }}
                blockHandler={() => {
                  handleModeratorBlocking(id);
                }}
                isBlocked={isBlocked}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Moderators;

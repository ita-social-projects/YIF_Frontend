import React, { useState } from 'react';
import ActionInput from '../../../components/institutionOfEducationAdmin/actionInput';
import Moderator from '../../../components/institutionOfEducationAdmin/moderator';
import styles from './moderators.module.scss';
import { Form, Formik } from 'formik';

function Moderators() {
  const [isLocked, setIsLocked] = useState(false);
  const handleModeratorBlocking = () => {
    setIsLocked(!isLocked);
  };
  const handleModeratorDeleting = () => {
    setIsLocked(!isLocked);
  };
  const email = 'moderator@gmail.com';
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
            onSubmit={() => {
              setIsLocked(!isLocked);
            }}
          >
            <Form className={styles.addModeratorForm}>
              <ActionInput name='email' />
            </Form>
          </Formik>
        </div>

        <div className={styles.moderatorList}>
          <Moderator
            email={email}
            deleteHandler={handleModeratorDeleting}
            blockHandler={handleModeratorBlocking}
            isLocked={isLocked}
          />
          <Moderator
            email={email}
            deleteHandler={handleModeratorDeleting}
            blockHandler={handleModeratorBlocking}
            isLocked={isLocked}
          />
          <Moderator
            email={email}
            deleteHandler={handleModeratorDeleting}
            blockHandler={handleModeratorBlocking}
            isLocked={isLocked}
          />
          <Moderator
            email={email}
            deleteHandler={handleModeratorDeleting}
            blockHandler={handleModeratorBlocking}
            isLocked={isLocked}
          />
          <Moderator
            email={email}
            deleteHandler={handleModeratorDeleting}
            blockHandler={handleModeratorBlocking}
            isLocked={isLocked}
          />
        </div>
      </div>
    </main>
  );
}

export default Moderators;

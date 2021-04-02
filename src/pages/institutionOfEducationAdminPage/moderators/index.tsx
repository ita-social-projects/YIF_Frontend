import React, { useState } from 'react';
import Moderator from '../../../components/institutionOfEducationAdmin/moderator';
import styles from './moderators.module.scss';

function Moderators() {
  const [isLocked, setIsLocked] = useState(false);
  const handleModeratorBlocking = () => {
    setIsLocked(!isLocked);
  };
  const email = 'moderator@gmail.com';
  return (
    <main>
      <div className={styles.container}>
        <h1 className={styles.title}>Модератори</h1>
        <h2 className={styles.subtitle}>
          Введіть електрону пошту модератора і ми відправимо на неї лист для
          реєстрації
        </h2>
        <input type='text' />
        <button type='submit'></button>
        <Moderator
          email={email}
          deleteHandler={() => {}}
          lockHandler={handleModeratorBlocking}
          isLocked={isLocked}
        />
      </div>
    </main>
  );
}

export default Moderators;

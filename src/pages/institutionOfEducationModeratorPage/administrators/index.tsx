import React, { useState, useEffect } from 'react';
import Administrator from '../../../components/institutionOfEducationModerator/administrator';
import styles from './administrators.module.scss';

interface Administrator {
  id: number;
  email: string;
}

const administrators = [
  {
    id: 1,
    email: 'administrator1@gmail.com'
  },
  {
    id: 2,
    email: 'administrator2@gmail.com'
  },
  {
    id: 3,
    email: 'administrator3@gmail.com'
  }
];

function Administrators() {

  const [administratorsState, setAdministratorsState] = useState<Array<Administrator>>([
    {
      id: 0,
      email: ''
    },
  ]);

  useEffect(() => {
    setAdministratorsState(administrators);
  }, []);

  return (
    <main className={styles.administrators}>
      <div className={styles.container}>
        <h1 className={styles.title}>Адміністратори</h1>
        <div className={styles.administratorList}>
          {administratorsState.map((administrator) => {
            const { id, email } = administrator;
            return (
              <Administrator
                key={id}
                email={email}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Administrators;

import React from 'react';
import styles from './confirmationBox.module.scss';

type Props = {
  question: string;
  handleClick: () => Promise<boolean>;
};

const ConfirmationBox: React.FC<Props> = ({ question, handleClick }) => {
  const emailRegEx =
    /([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)/;
  //highlights only emails for now

  const textArr = question.split(emailRegEx).map((text) => {
    return emailRegEx.test(text) ? (
      <span className={styles.highlighted}>{text}</span>
    ) : (
      text
    );
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.question}>
        <h2>{textArr}</h2>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => handleClick()} className={styles.animatedButton}>
          Так
        </button>
        <button onClick={() => handleClick()} className={styles.animatedButton}>
          Ні
        </button>
      </div>
    </div>
  );
};

export { ConfirmationBox };

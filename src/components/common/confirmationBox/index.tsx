import React from 'react';
import styles from './confirmationBox.module.scss';

type Props = {
  question: string;
  handleClick: (response: boolean) => void;
};

const ConfirmationBox: React.FC<Props> = ({ question, handleClick }) => {
  const emailRegEx =
    /([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)/;
  //highlights only email for now

  const textArr = question.split(emailRegEx).map((text, index) => {
    return emailRegEx.test(text) ? (
      <span className={styles.highlighted} key={index}>
        {text}
      </span>
    ) : (
      text
    );
  });

  return (
    <div className={styles.mainContainer} data-testid='confirmationBox'>
      <div className={styles.question}>
        <h2>{textArr}</h2>
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => handleClick(true)}
          className={styles.animatedButton}
          data-testid='accept'
        >
          Так
        </button>
        <button
          onClick={() => handleClick(false)}
          className={styles.animatedButton}
          data-testid='reject'
        >
          Ні
        </button>
      </div>
    </div>
  );
};

export { ConfirmationBox };

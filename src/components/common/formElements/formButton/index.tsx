import React from 'react';
import styles from './formButton.module.scss';
interface Props {
  title: string; // text in the button
  form: string; // there can be two options: login or register. It depends on the form where you need the button. Each option has different styles
}

const FormButton: React.FC<Props> = (props) => {
  const { title, form } = props;
  return (
    <button
      className={
        form === 'login'
          ? `${styles.formButton} ${styles.buttonLogin} ${styles.animatedButton}`
          : form === 'register'
          ? `${styles.formButton} ${styles.animatedButton}`
          : form === 'profile'
          ? `${styles.formButton} ${styles.buttonLogin} ${styles.animatedButton}`
          : form === 'resetPassword'
          ? `${styles.formButton} ${styles.buttonProfile} ${styles.animatedButton}`
          : 'incorrect form'
      }
      type='submit'
    >
      {title}
    </button>
  );
};

export default FormButton;

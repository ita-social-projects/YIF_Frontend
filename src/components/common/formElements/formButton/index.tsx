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
          ? `${styles.formButton} ${styles.buttonLogin}`
          : `${styles.formButton}`
      }
      type='submit'
    >
      {title}
    </button>
  );
};

export default FormButton;

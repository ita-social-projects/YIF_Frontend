import React from 'react';
import styles from './formButton.module.scss';
interface Props {
  title: string;
}

const FormButton: React.FC<Props> = (props) => {
  const { title } = props;
  return (
    <button className={styles.formButton} type='submit'>
      {title}
    </button>
  );
};

export default FormButton;

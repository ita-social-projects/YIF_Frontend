import React from 'react';
import styles from './formTextField.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  text: string;
  url: string;
}

const FormTextField: React.FC<Props> = (props) => {
  const { text, url } = props;
  return (
    <div className={styles.formTextField}>
      <p>{text}</p>
      <p className={styles.formTextField__text}>Перейдіть</p>

      <Link to={url} className={styles.formTextField__link}>
        сюди
      </Link>
    </div>
  );
};

export default FormTextField;

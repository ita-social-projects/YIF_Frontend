import React from 'react';
import styles from './formTextField.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  text: string; // here should be the text you want to see before "Перейдіть сюди"
  url: string; //here should be a link to the page, that needs to be opened on click
  styles?: {
    [key: string]: string;
  };
}

const FormTextField: React.FC<Props> = (props) => {
  const { text, url } = props;
  return (
    <div className={styles.formTextField} style={props.styles}>
      <p>{text}</p>
      <p className={styles.formTextField__text}>Перейдіть</p>

      <Link to={url} className={styles.formTextField__link}>
        сюди
      </Link>
    </div>
  );
};

export default FormTextField;

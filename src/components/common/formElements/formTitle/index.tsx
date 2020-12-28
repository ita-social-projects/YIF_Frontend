import React from 'react';
import styles from './formTitle.module.scss';
interface Props {
  title: string; //here should be the text you want to see as a Title of the form
}

const FormTitle: React.FC<Props> = (props) => {
  const { title } = props;
  return <h3 className={styles.formTitle}>{title}</h3>;
};

export default FormTitle;

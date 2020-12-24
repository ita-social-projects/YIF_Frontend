import React from 'react';
import styles from './formTitle.module.scss';
interface Props {
  title: string;
}

const FormTitle: React.FC<Props> = (props) => {
  const { title } = props;
  return <h3 className={styles.formTitle}>{title}</h3>;
};

export default FormTitle;

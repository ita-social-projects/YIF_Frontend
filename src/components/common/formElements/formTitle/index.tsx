import React from 'react';
import styles from './formTitle.module.scss';
interface Props {
  title: string; //here should be the text you want to see as a Title of the form
  styles?: {
    [key: string]: string;
  };
}

const FormTitle: React.FC<Props> = (props) => {
  const { title } = props;
  return (
    <h3 className={styles.formTitle} style={props.styles}>
      {title}
    </h3>
  );
};

export default FormTitle;

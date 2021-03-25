import React from 'react';
import { FieldAttributes, useField } from 'formik';
import styles from './input.module.scss';

type CustomInput = {
  id: string;
  label: string;
  props?: any;
  requirement: string;
} & FieldAttributes<any>;

const Input: React.FC<CustomInput> = ({ label, id, requirement, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <div className={styles.customInput}>
      {
        <div className={requirement ? styles.smallField : styles.inputField}>
          <label htmlFor={id}>{label}</label>
          {props.area ? (
            <textarea
              id={id}
              {...props}
              {...field}
              cols='30'
              rows='4'
              data-testid='textArea'
            ></textarea>
          ) : (
            <input
              type='text'
              id={id}
              {...props}
              {...field}
              className={requirement && styles.smallInput}
            />
          )}
        </div>
      }
      {errorText && (
        <div className={styles.inputError}>
          <span>{errorText}</span>
        </div>
      )}
    </div>
  );
};

export default Input;

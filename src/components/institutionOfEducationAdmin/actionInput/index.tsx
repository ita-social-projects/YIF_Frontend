import React from 'react';
import { FieldAttributes, useField } from 'formik';
import styles from './actionInput.module.scss';

type Props = {
  handleClick?: () => void;
  props?: any;
} & FieldAttributes<any>;

const ActionInput: React.FC<Props> = ({ handleClick, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <div className={styles.actionInput}>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          type='text'
          {...props}
          {...field}
        />
        {errorText && (
          <div className={styles.inputError}>
            <span>{errorText}</span>
          </div>
        )}
      </div>
      <button type='submit' className={`${styles.animatedButton}`}>
        Додати
      </button>
    </div>
  );
};

export default ActionInput;

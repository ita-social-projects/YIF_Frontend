import React from 'react';
import { FieldAttributes, useField, useFormikContext } from 'formik';
import styles from './actionInput.module.scss';
import { FormInputError } from '../../common/formElements/index';

type Props = {
  handleClick?: () => void;
  name: string;
} & FieldAttributes<any>;

const ActionInput: React.FC<Props> = ({ name }) => {
  const [field, meta, helper] = useField<string>(name);
  const { submitForm, isSubmitting } = useFormikContext();

  const handleClick = (e: any) => {
    if (meta.value.length == 0) {
      helper.setError('Будь ласка заповніть поле');
      helper.setTouched(true);
    } else {
      submitForm();
    }
  };
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <div className={styles.actionInput}>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type='text' {...field} />
        {errorText && (
          <FormInputError errorType='input' errorMessage={errorText} />
        )}
      </div>
      <button
        type='button'
        onClick={handleClick}
        disabled={isSubmitting}
        className={`${styles.animatedButton}`}
      >
        Додати
      </button>
    </div>
  );
};

export default ActionInput;

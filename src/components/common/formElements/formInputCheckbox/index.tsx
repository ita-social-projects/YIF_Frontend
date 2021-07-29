import React, { FC } from 'react';
import { FieldProps } from 'formik';
import styles from './formInputCheckbox.module.scss';
import { FormInputError } from '../index';
interface CustomInputProps {
  id: string;
  type: string;
  labelText: string;
}

const FormInputCheckbox: FC<CustomInputProps & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  type = 'checkbox',
  id,
  labelText,
  ...props
}) => {
  return (
    <div className={styles.formMargin}>
      <div>
        <label className={styles.formContainer}>
          <input id={id} type='checkbox' {...field} {...props} />
          <span className={styles.formCheckmark}></span>
          <div className={styles.formLabel}>{labelText}</div>
        </label>
      </div>
      {touched[field.name] && errors[field.name] ? (
        <FormInputError
          errorFor='inputField'
          errorMessage={errors[field.name]}
        />
      ) : null}
    </div>
  );
};

export default FormInputCheckbox;

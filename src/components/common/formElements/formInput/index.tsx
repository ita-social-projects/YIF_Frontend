import React, { FC, useState } from 'react';
import { FieldProps } from 'formik';
import styles from './formInput.module.scss';
import { FormInputError } from '../index';
interface CustomInputProps {
  id: string; // id attribute
  type: string; //here should be the value that you expect to see in the HTML attribute 'type'
  iconName: string; //here are two options: 'email' and 'lock'. You have type 'email' if you want to see the mail icon and 'lock' for the lock icon
  showIconPassword: boolean;
}

const FormInput: FC<CustomInputProps & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  type = 'email',
  iconName = 'email',
  showIconPassword = false,
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const emailSVG = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5973 22.1621C22.6086 22.1248 22.6162 22.0855 22.6162 22.0441V8.38539C22.6162 8.34374 22.6086 8.30414 22.5971 8.26661C22.5954 8.26147 22.5944 8.25632 22.5925 8.25118C22.5772 8.20722 22.5547 8.16763 22.5265 8.13292C22.5246 8.1306 22.5244 8.12778 22.5225 8.12546C22.5213 8.12418 22.5198 8.12366 22.5186 8.12238C22.4885 8.08793 22.4529 8.06016 22.4129 8.03934C22.4098 8.03779 22.4074 8.03574 22.4043 8.03419C22.3665 8.01594 22.3254 8.00566 22.2821 8.00257C22.2778 8.00231 22.2737 8.00129 22.2694 8.00129C22.2654 8.00103 22.2618 8 22.2577 8H2.35897C2.3549 8 2.35108 8.00103 2.34701 8.00129C2.34318 8.00154 2.33936 8.00231 2.33553 8.00257C2.29177 8.00566 2.24992 8.0162 2.21165 8.03471C2.20926 8.03574 2.20735 8.03754 2.20495 8.03856C2.1643 8.05939 2.12819 8.08767 2.09781 8.12263C2.09662 8.12392 2.09518 8.12418 2.09399 8.12546C2.09207 8.12752 2.09183 8.13035 2.08992 8.13266C2.0617 8.16737 2.03898 8.20722 2.02368 8.25118C2.02176 8.25632 2.02081 8.26147 2.01913 8.26686C2.00765 8.3044 2 8.34399 2 8.38564V22.0446C2 22.0867 2.00789 22.1268 2.01961 22.1649C2.02128 22.17 2.02224 22.1749 2.02392 22.1801C2.03946 22.2243 2.06242 22.2641 2.09088 22.2988C2.09255 22.3009 2.09303 22.3035 2.0947 22.3055C2.09614 22.3073 2.09805 22.3084 2.09973 22.3102C2.11145 22.3233 2.12436 22.3348 2.13775 22.3462C2.14373 22.351 2.14899 22.3569 2.15521 22.3616C2.17099 22.3734 2.18797 22.3829 2.20543 22.3917C2.20974 22.3937 2.21356 22.3971 2.21787 22.3989C2.26116 22.4187 2.30875 22.43 2.35873 22.43H22.2572C22.3072 22.43 22.3548 22.4189 22.3981 22.3989C22.4048 22.3958 22.411 22.3911 22.4175 22.3875C22.4323 22.3796 22.4471 22.3713 22.4608 22.3613C22.4679 22.3559 22.4744 22.349 22.4813 22.3431C22.4935 22.3325 22.5055 22.322 22.516 22.3099C22.5179 22.3078 22.5201 22.3063 22.522 22.3042C22.5239 22.3019 22.5244 22.2988 22.5263 22.2965C22.5543 22.2621 22.5768 22.2225 22.5921 22.1788C22.5944 22.1731 22.5956 22.1677 22.5973 22.1621ZM2.7177 9.26002L8.7556 15.1889L2.7177 21.1651V9.26002ZM15.0929 14.8984C15.0681 14.9159 15.0417 14.9305 15.0209 14.9552C15.013 14.9644 15.0104 14.9765 15.0035 14.9863L12.3082 17.6328L3.28354 8.77103H21.3329L15.0929 14.8984ZM9.28748 15.711L12.0662 18.4396C12.1348 18.507 12.2214 18.5406 12.3082 18.5406C12.395 18.5406 12.4816 18.507 12.55 18.4396L15.2943 15.745L21.3312 21.6587H3.27827L9.28748 15.711ZM15.8264 15.2226L21.8988 9.26002V21.1712L15.8264 15.2226Z"
        fill="#AFBECF"
      />
    </svg>
  );

  const lockSVG = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.73926 22.48H20.0193C20.4277 22.48 20.7593 22.1933 20.7593 21.84V10.8896C20.7593 10.5363 20.4277 10.2496 20.0193 10.2496H19.6685C19.6685 9.5904 19.6685 8.65728 19.6685 8.64448C19.6226 4.98048 16.1291 2 11.88 2C7.61834 2 4.1248 4.98944 4.09076 8.6688V10.2496H3.74C3.33152 10.2496 3 10.5363 3 10.8896V21.84C2.99926 22.1933 3.33004 22.48 3.73926 22.48ZM19.2793 21.2H4.47926V11.5296H19.2793V21.2ZM5.57002 8.67392C5.5974 5.69984 8.42716 3.28 11.8793 3.28C15.321 3.28 18.1515 5.6928 18.1878 8.65536C18.1878 8.69696 18.1878 9.60384 18.1878 10.2496H5.56928L5.57002 8.67392Z"
        fill="#AFBECF"
      />
      <path
        d="M10.2635 19.0528C10.2635 19.406 10.595 19.6928 11.0035 19.6928H12.7514C13.1599 19.6928 13.4914 19.406 13.4914 19.0528V16.9849C14.0945 16.567 14.4541 15.936 14.4541 15.2601C14.4541 14.0339 13.2983 13.0361 11.8775 13.0361C10.4567 13.0361 9.30078 14.0339 9.30078 15.2601C9.30078 15.936 9.66042 16.567 10.2635 16.9849V19.0528V19.0528ZM11.8782 14.3168C12.4828 14.3168 12.9749 14.7405 12.9749 15.2608C12.9749 15.6006 12.7544 15.9161 12.3984 16.0832C12.1601 16.1952 12.0121 16.4108 12.0121 16.6451V18.4128H11.7443V16.6451C11.7443 16.4108 11.5963 16.1945 11.358 16.0832C11.0028 15.9161 10.7815 15.6006 10.7815 15.2608C10.7808 14.7398 11.2729 14.3168 11.8782 14.3168Z"
        fill="#AFBECF"
      />
    </svg>
  );

  const showPasswordIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
    </svg>
  );

  const hidePasswordIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z" />
    </svg>
  );

  return (
    <>
      <div
        className={
          touched[field.name] && errors[field.name]
            ? `${styles.inputContainer} ${styles.inputFailed}`
            : `${styles.inputContainer} `
        }
      >
        <label className={styles.imgContainer}>
          {iconName === 'email'
            ? emailSVG
            : iconName === 'lock'
            ? lockSVG
            : 'incorrect iconName'}
        </label>
        <input
          id={id}
          className={styles.formInput}
          type={showPassword ? 'text' : type}
          {...field}
          {...props}
        />
        {showIconPassword ? (
          <span
            className={styles.inputContainer__hideShowPasswordIcon}
            onClick={toggleShowPassword}
          >
            {showPassword ? hidePasswordIcon : showPasswordIcon}
          </span>
        ) : null}
      </div>
      {touched[field.name] && errors[field.name] ? (
        <FormInputError
          errorType="input"
          errorMessage={errors[field.name]}
          data-testid={field.name}
        />
      ) : null}
    
    </>
  );
};

export default FormInput;

import React from 'react';

import style from './buttonUploading.module.scss';

const ButtonUploading = (props: any) => {
  const { isDisabled, isTransperent, value, handleClick } = props;
  return (
    <a
      href='/'
      className={`${style.btn} ${
        isTransperent ? style.animatedButtonTransparent : style.animatedButton
      } ${isDisabled ? style.disabled : null}`}
      onClick={(e) => {
        e.preventDefault();
        if (!isDisabled) {
          handleClick(e);
        }
      }}
    >
      {value}
    </a>
  );
};

export default ButtonUploading;

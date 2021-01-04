import React from 'react';
import style from './spinner.module.scss';

const Spinner = () => {
  return (
    <div id={style.content}>
      <div className={style.loader}>
        <div className={`${style.line} ${style.one}`}></div>
        <div className={`${style.line} ${style.two}`}></div>
        <div className={`${style.line} ${style.three}`}></div>
      </div>
    </div>
  );
};

export default Spinner;

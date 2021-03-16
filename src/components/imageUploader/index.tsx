import React, { useState } from 'react';
import ImageUploaderPopup from './imageUploaderPopup/imageUploaderPopup';
import style from './imageUploader.module.scss';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/reducers/setUserReducer';
import { FormInputSuccess } from '../common/formElements/formInputSuccess/formInputSuccess';

const ImageUploader = (props: any) => {
  const { additionalStyles, avatar, aspectRatio, text, imageHandler } = props;

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isSuccessLoad, setSuccessLoad] = useState(false);

  return (
    <>
      <div
        style={additionalStyles}
        className={style.avatarContainer}
        onClick={() => {
          setPopupOpen(!isPopupOpen);
        }}
      >
        <img src={avatar} alt='avatar' className={style.avatar} />
      </div>
      {isPopupOpen && (
        <ImageUploaderPopup
          setPopupOpen={(newState: boolean) => setPopupOpen(newState)}
          aspectRatio={aspectRatio}
          text={text}
          imageHandler={imageHandler}
        />
      )}
      {isSuccessLoad &&
        setTimeout(() => {
          setSuccessLoad(false);
          return true;
        }, 3000) && (
          <div className={`${style.successContainer} ${style.elementShowHide}`}>
            <FormInputSuccess successMessage='Зображення завантажено успішно' />
          </div>
        )}
    </>
  );
};

export default ImageUploader;

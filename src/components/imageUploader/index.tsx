import React, { useState } from 'react';

import ImageUploaderPopup from './imageUploaderPopup/imageUploaderPopup';
import style from './imageUploader.module.scss';

const ImageUploader = (props: any) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isSuccessLoad, setSuccessLoad] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState(
    'assets/icons/avatar.jpg'
  );

  const { additionalStyles } = props;
  return (
    <>
      <div
        style={additionalStyles}
        className={style.avatarContainer}
        onClick={() => {
          setPopupOpen(!isPopupOpen);
        }}
      >
        <img src={profileImageSrc} alt='avatar' className={style.avatar} />
      </div>
      {isPopupOpen && (
        <ImageUploaderPopup
          setPopupOpen={(newState: any) => setPopupOpen(newState)}
          setSuccessLoad={(newState: any) => setSuccessLoad(newState)}
          setProfileImageSrc={(newState: string) =>
            setProfileImageSrc(newState)
          }
        />
      )}
      {isSuccessLoad &&
        setTimeout(() => {
          setSuccessLoad(false);
          return true;
        }, 3000) && (
          <div className={`${style.successContainer} ${style.elementShowHide}`}>
            <span>Зображення завантажено успішно.</span>
          </div>
        )}
    </>
  );
};

export default ImageUploader;

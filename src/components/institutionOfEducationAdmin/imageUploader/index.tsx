import React, { useState } from 'react';
import ImageUploaderPopup from '../../imageUploader/imageUploaderPopup/imageUploaderPopup';
import style from './imup.module.scss';

const ImageUploader = (props: any) => {
  const { foto, aspectRatio, text, imageHandler } = props;
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <div
        className={style.uploader}
        onClick={() => {
          setPopupOpen(!isPopupOpen);
        }}
      >
        <img src={foto} alt='institutionOfEducationFoto' />
      </div>
      {isPopupOpen && (
        <ImageUploaderPopup
          setPopupOpen={(newState: boolean) => setPopupOpen(newState)}
          aspectRatio={aspectRatio}
          text={text}
          imageHandler={imageHandler}
        />
      )}
    </>
  );
};

export default ImageUploader;

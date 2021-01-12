import React, { useState } from 'react';
import style from './imageCropper.module.scss';
const ImageCropper = (props: any) => {
  const { loadedImage, setLoadedImage } = props;

  return (
    <div className={style.imagePrevieContainer}>
      <img
        src='assets/icons/close.svg'
        className={style.closeButton}
        alt='close icon'
        onClick={() =>
          setLoadedImage({
            name: '',
            size: 0,
            type: '',
            data: '',
          })
        }
      />
      <div className={style.imgHolder}>
        <img src={loadedImage.data?.toString()} alt='loaded profile' />
      </div>
      {/* <span className={style.progressBar}>
        {loadedImage.isUploading && <span>loading...</span>}
      </span> */}
    </div>
  );
};

export default ImageCropper;

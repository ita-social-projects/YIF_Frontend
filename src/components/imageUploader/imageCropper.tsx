import React, { useState } from 'react';
import style from './imageCropper.module.scss';

const ImageCropper = (props: any) => {
  const { loadedImage } = props;

  return (
    <div className={style.imagePrevieContainer}>
      <img src={loadedImage.data?.toString()} alt='loaded profile' />

      <span className={style.progressBar}>
        {loadedImage.isUploading && <span>loading...</span>}
      </span>
    </div>
  );
};

export default ImageCropper;

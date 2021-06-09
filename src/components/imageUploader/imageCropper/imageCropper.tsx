import React from 'react';
import style from './imageCropper.module.scss';
import { TLoadedImage } from '../imageUploaderPopup/imageUploaderPopup';
import Spinner from '../../common/spinner';
import Cropper from 'react-cropper';
import './cropper.scss';

type TProps = {
  loadedImage: TLoadedImage;
  isLoading: boolean;
  setLoadedImage: Function;
  setError: Function;
  setCropper: Function;
  aspectRatio: number;
  text: string;
};

const ImageCropper = (props: TProps) => {
  const {
    loadedImage,
    setLoadedImage,
    isLoading,
    setError,
    setCropper,
    aspectRatio,
  } = props;
  let image = loadedImage.data?.toString();
  return (
    <div className={style.imagePrevieContainer}>
      <img
        src='/assets/icons/close.svg'
        className={style.closeButton}
        alt='close icon'
        onClick={() => {
          setLoadedImage({
            name: '',
            size: 0,
            type: '',
            data: '',
          });
          setError('');
        }}
      />
      <div className={style.imgHolder}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Cropper
            style={{ height: '100%', width: '100%' }}
            aspectRatio={aspectRatio}
            initialAspectRatio={1}
            preview='.img-preview'
            src={image}
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageCropper;

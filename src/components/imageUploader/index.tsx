import React, { useState, useEffect } from 'react';

import style from './imageUploader.module.scss';
import ImageCropper from './imageCropper';

type TLoadedImage = {
  name: any;
  size: any;
  type: any;
  data: string | ArrayBuffer | null;
};

const ImageUploader = () => {
  const InitialLoadedImageState: TLoadedImage = {
    name: '',
    size: 0,
    type: '',
    data: '',
  };
  const [loadedImage, setLoadedImage] = useState(InitialLoadedImageState);

  let fileInput: any = React.createRef();

  const onFileLoad = (e: any) => {
    const file = e.currentTarget.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      // console.log('Image Loaded', fileReader.result);
      const fileLoaded = {
        name: file.name,
        size: file.size,
        type: file.type,
        data: fileReader.result,
      };
      setLoadedImage(fileLoaded);
    };

    fileReader.onabort = () => {
      console.log('Read aborted!');
    };

    fileReader.onerror = () => {
      console.log('Read ERROR!');
    };
    console.log('file', file);
    fileReader.readAsDataURL(file);
  };
  // console.log('loadedImage.data: ', loadedImage.data);
  return (
    <section className={style.container}>
      <form>
        <div className={style.imageLoader}>
          <div className={style.header}>
            <h2>Оберіть фотографію профілю</h2>
          </div>
          <div className={style.draggableContainer}>
            {loadedImage.size > 0 && <ImageCropper loadedImage={loadedImage} />}
            {loadedImage.size === 0 && (
              <>
                <input
                  type='file'
                  ref={(input) => (fileInput = input)}
                  accept='image/png, image/jpeg'
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={onFileLoad}
                  onChange={onFileLoad}
                />

                <div className={style.helperImage}>
                  <img
                    src='assets/icons/imageUpload.svg'
                    alt='Перетягніть фотографію профілю сюди'
                  />
                </div>
                <div className={style.helperText}>
                  Перетягніть фотографію профілю сюди <br />
                  <span>- або -</span>
                </div>
                <div className={style.fileBrowserContainer}>
                  <a
                    href='/'
                    className={style.animatedButtonTransparent}
                    onClick={(e) => {
                      e.preventDefault();
                      fileInput.click();
                    }}
                  >
                    Виберіть фото з комп'ютера
                  </a>
                </div>
              </>
            )}
          </div>
          <div className={style.footer}>
            <a
              href='/'
              className={style.animatedButton}
              onClick={(e) => {
                e.preventDefault();
                console.log(loadedImage);
              }}
            >
              Завантажити
            </a>
            <a
              href='/'
              className={style.animatedButtonTransparent}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Скасувати
            </a>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ImageUploader;

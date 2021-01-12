import React, { useState } from 'react';

import style from './imageUploader.module.scss';
import ImageCropper from './imageCropper';
import ButtonUploading from './buttonUploading';
import { requestData } from '../../services/requestDataFunction';

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
  const [error, setError] = useState({ errorMessage: '' });

  let fileInput: any = React.createRef();

  const highlightArea = () => {
    document
      .getElementById('imageLoaderContainer')
      ?.classList.toggle(style.highlight);
  };
  const isImageValid = (files: any) => {
    // Check if file only one.
    if (files.length > 1) {
      setError({
        errorMessage:
          'На жаль, можна перетягувати лише одну фотографію. Перетягніть лише потрібну фотографію профілю.',
      });
      return false;
    }

    // Check if file type is jpg or png.
    const supportedFilesTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const file = files[0];
    const { type } = file;
    if (supportedFilesTypes.indexOf(type)) {
      setError({
        errorMessage:
          'Переконайтеся, що завантажуєте файли формату JPG або PNG, і повторіть спробу.',
      });
      return false;
    }

    // Check file extension.
    const fileExtension = file.name.replace(/^.*\./, '');
    if (fileExtension === /(?:jpg|jpeg|png)/i) {
      setError({
        errorMessage:
          'Переконайтеся, що завантажуєте файли формату JPG або PNG, і повторіть спробу.',
      });
      return false;
    }

    // Check file size.
    if (file.size > 10485760) {
      setError({
        errorMessage:
          'Переконайтеся, що завантажуєте зображення розміром не більше 10 MB, і повторіть спробу.',
      });
      return false;
    }

    return true;
  };

  const onFileDrop = (e: any) => {
    const files: any = e.dataTransfer.files;

    if (!isImageValid(files)) {
      return;
    }

    previewFile(files[0]);
  };

  const onFileLoad = (e: any) => {
    const files = e.currentTarget.files;

    if (!isImageValid(files)) {
      return;
    }
    previewFile(files[0]);
  };

  const previewFile = (file: any) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      const fileLoaded = {
        name: file.name,
        size: file.size,
        type: file.type,
        data: fileReader.result,
      };
      setLoadedImage(fileLoaded);
      setError({ errorMessage: '' });
    };

    fileReader.onabort = () => {
      setError({
        errorMessage: 'Заванатження перервано.',
      });
    };

    fileReader.onerror = () => {
      setError({
        errorMessage: 'Помилка завантаження.',
      });
    };
  };

  // Progress BAR

  return (
    <section className={style.container}>
      <div className={style.imageLoader} id='imageLoaderContainer'>
        <div className={style.header}>
          <h2>Оберіть фотографію профілю</h2>
        </div>
        <div className={style.draggableContainer}>
          {error.errorMessage.length > 0 && (
            <div className={style.errorContainer}>
              <p>
                {error.errorMessage}&nbsp;
                <span onClick={() => setError({ errorMessage: '' })}>
                  Закрити
                </span>
              </p>
            </div>
          )}

          {loadedImage.size > 0 && (
            <ImageCropper
              loadedImage={loadedImage}
              setLoadedImage={(newState: TLoadedImage) =>
                setLoadedImage(newState)
              }
            />
          )}

          {loadedImage.size === 0 && (
            <>
              <input
                type='file'
                ref={(input) => (fileInput = input)}
                accept='image/*'
                id='fileElem'
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  highlightArea();
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  highlightArea();
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  highlightArea();
                  onFileDrop(e);
                }}
                onChange={(e) => {
                  onFileLoad(e);
                }}
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
          <ButtonUploading
            isDisabled={loadedImage.size > 0 ? false : true}
            isTransperent={false}
            value={'Завантажити'}
            // REFACTORING:
            handleClick={(e: any) => {
              requestData(
                'https://yifbackend.tk/api/Users/ChangePhoto',
                'POST',
                {
                  photoBase64: loadedImage.data,
                }
              )
                .then((res: any) => {
                  const statusCode = res.statusCode.toString();
                  console.log(res);
                  if (statusCode.match(/^[23]\d{2}$/)) {
                    setError({
                      errorMessage: '',
                    });
                    // SHOW MESSAGE SUCCES
                    // CLOSE THE COMPONENT
                  } else {
                    setError({
                      errorMessage:
                        res.data.message ||
                        'Щось пішло не так, спробуйте знову.',
                    });
                  }
                })
                .catch((error) => {
                  setError({
                    errorMessage: 'Щось пішло не так, спробуйте знову.',
                  });
                });
            }}
          />
          <ButtonUploading
            isDisabled={false}
            isTransperent={true}
            value={'Скасувати'}
            handleClick={(e: any) => console.log(e)}
          />
        </div>
      </div>
    </section>
  );
};

export default ImageUploader;

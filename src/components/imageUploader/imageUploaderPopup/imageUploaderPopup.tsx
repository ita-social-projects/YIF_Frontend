import React, { useState } from 'react';
import style from './imageUploaderPopup.module.scss';
import ImageCropper from '../imageCropper/imageCropper';
import ButtonUploading from '../buttonUploading/buttonUploading';
import { FormInputErrorWithButton } from '../../common/formElements';
import { APIUrl } from '../../../services/endpoints';
import { requestImageProfile } from '../../../services/requestDataFunction';

export type TLoadedImage = {
  name: string;
  size: number;
  type: string;
  data: string | ArrayBuffer | null;
};

type TProps = {
  setPopupOpen: Function;
  setSuccessLoad: Function;
  setProfileImageSrc: Function;
};

const ImageUploaderPopup = (props: TProps) => {
  const { setPopupOpen, setSuccessLoad, setProfileImageSrc } = props;

  const InitialLoadedImageState: TLoadedImage = {
    name: '',
    size: 0,
    type: '',
    data: '',
  };

  const [loadedImage, setLoadedImage] = useState(InitialLoadedImageState);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  //const [cropData, setCropData] = useState('#');
  const [cropper, setCropper] = useState<any>();

  let fileInput: any = React.createRef();

  const highlightArea = () => {
    document
      .getElementById('imageLoaderContainer')
      ?.classList.toggle(style.highlight);
  };

  const isImageValid = (files: any) => {
    // Check if file only one.
    if (files.length > 1) {
      setError(
        'На жаль, можна перетягувати лише одну фотографію. Перетягніть лише потрібну фотографію профілю.'
      );
      return false;
    }
    // Check if file type is jpg or png.
    const supportedFilesTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const file = files[0];
    const { type } = file;
    if (supportedFilesTypes.indexOf(type)) {
      setError(
        'Переконайтеся, що завантажуєте файли формату JPG, JPEG або PNG, і повторіть спробу.'
      );
      return false;
    }
    // Check file extension.
    const fileExtension = file.name.replace(/^.*\./, '');
    if (fileExtension === /(?:jpg|jpeg|png)/i) {
      setError(
        'Переконайтеся, що завантажуєте файли формату JPG, JPEG або PNG, і повторіть спробу.'
      );
      return false;
    }
    // Check file size.
    if (file.size > 10485760) {
      setError(
        'Переконайтеся, що завантажуєте зображення розміром не більше 10 MB, і повторіть спробу.'
      );
      return false;
    }

    return true;
  };

  const onFileDrop = (e: React.DragEvent) => {
    const files = e.dataTransfer.files;

    if (!isImageValid(files)) {
      return;
    }

    previewFile(files[0]);
  };

  const onFileLoad = (e: React.FormEvent<HTMLInputElement>) => {
    const files: any = e.currentTarget.files;
    if (!isImageValid(files)) {
      return;
    }
    previewFile(files[0]);
  };

  const previewFile = (file: File) => {
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
      setError('');
    };

    fileReader.onabort = () => {
      setError('Заванатження перервано.');
    };

    fileReader.onerror = () => {
      setError('Помилка завантаження.');
    };
  };

  // const getCropData = () => {
  //   if (typeof cropper !== 'undefined') {
  //     setCropData(cropper.getCroppedCanvas().toDataURL());
  //   }
  // };

  return (
    <section className={style.container}>
      <div className={style.imageLoader} id='imageLoaderContainer'>
        <div className={style.header}>
          <h2>Оберіть фотографію профілю</h2>
        </div>
        <div className={style.draggableContainer}>
          {error.length > 0 && (
            <FormInputErrorWithButton
              errorType='form'
              errorMessage={error}
              errorButtonHandler={() => setError('')}
            />
          )}

          {loadedImage.size > 0 && (
            <ImageCropper
              loadedImage={loadedImage}
              setLoadedImage={(newState: TLoadedImage) =>
                setLoadedImage(newState)
              }
              isLoading={isLoading}
              setError={(newState: string) => setError(newState)}
              setCropper={(newState: any) => setCropper(newState)}
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
                onDrop={(e: React.DragEvent) => {
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
                  className={style.underlineAnimation}
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
            handleClick={() => {
              setLoading(true);
              const imageToUpload = cropper.getCroppedCanvas().toDataURL();

              console.log(imageToUpload);
              requestImageProfile(`${APIUrl}Users/ChangePhoto`, 'POST', {
                photoBase64: imageToUpload,
              })
                .then((res: any) => {
                  const statusCode = res.statusCode.toString();
                  console.log(res);
                  if (statusCode.match(/^[23]\d{2}$/)) {
                    setError('');
                    setSuccessLoad(true);
                    setPopupOpen(false);
                    setLoading(false);
                    setProfileImageSrc(imageToUpload);
                  } else {
                    setError(
                      res.data.message || 'Щось пішло не так, спробуйте знову.'
                    );
                    setLoading(false);
                  }
                })
                .catch((err) => {
                  setError('Щось пішло не так, спробуйте знову.');
                  setLoading(false);
                });
            }}
          />
          <ButtonUploading
            isDisabled={false}
            isTransperent={true}
            value={'Скасувати'}
            handleClick={() => setPopupOpen(false)}
          />
        </div>
      </div>
    </section>
  );
};

export default ImageUploaderPopup;

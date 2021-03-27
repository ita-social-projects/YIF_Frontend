import React, { useState } from 'react';
import ImageUploaderPopup from '../../../imageUploader/imageUploaderPopup/imageUploaderPopup';

const IUpload = (props: any) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isSuccessLoad, setSuccessLoad] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState('');

  return (
    <>
      <div
        onClick={() => {
          setPopupOpen(!isPopupOpen);
        }}
      >
        <img alt='ioe' src={'/assets/images/defaultUniversityImage.jpg'} />
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
    </>
  );
};

export default IUpload;

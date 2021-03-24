import React from 'react';
import ImageUploader from '../../../imageUploader';

const ImagePickerField = ({ form, field }: any) => {
  const [picture, setPicture] = React.useState('');
  const defaultPicture = '/assets/images/defaultUnivPicture.svg';
  const avatar = picture ? picture : defaultPicture;
  const aspectRatio = 16 / 9;
  const nameOfObject = 'університету';

  const avatarStyles = {
    height: '14rem',
    width: '100%',
    borderRadius: '0.3rem',
    padding: '1rem',
  };

  return (
    <ImageUploader
      additionalStyles={avatarStyles}
      defaultPicture={defaultPicture}
      avatar={avatar}
      aspectRatio={aspectRatio}
      text={nameOfObject}
      imageHandler={(newPicture: string) => {
        setPicture(newPicture);
        form.setFieldValue(field.name, newPicture);
      }}
    />
  );
};

export default ImagePickerField;

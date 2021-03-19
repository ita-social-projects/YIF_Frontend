import React, { Fragment, useEffect, useState } from 'react';
import styles from './userOption.module.scss';
import { FormButton, FormInputError } from '../../../common/formElements';
import { Field, Form, Formik } from 'formik';
import { validationField } from '../../../../services/validateForm/ValidatorsField';
import FormInputProfile from '../../../common/formElements/formInputProfile';
import Spinner from '../../../common/spinner';
import ImageUploader from '../../../imageUploader';
import useProfile from '../../../../services/useProfile';
import { APIUrl } from '../../../../services/endpoints';
import { FormInputSuccess } from '../../../common/formElements/formInputSuccess/formInputSuccess';
import { userSelector } from '../../../../store/reducers/setUserReducer';
import { useSelector } from 'react-redux';
import { requestData } from '../../../../services/requestDataFunction';
import { requestImageProfile } from '../../../../services/requestDataFunction';
import { store } from '../../../../store/store';
import { setUserPhoto } from '../../../../store/reducers/setUserReducer';

const UserOption = () => {
  const avatarSyles = {
    position: 'absolute',
    top: '2.5rem',
    left: '2.5rem',
  };

  const url = `${APIUrl}Users/Current/SetProfile`;
  const useYIFProfile = useProfile(url);
  const user = useSelector(userSelector);
  const [listSchool, setListSchool] = useState([]);
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });

  const [isLoading, setLoading] = useState(false);
  const [isSuccessLoad, setSuccessLoad] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState();

  const [pic, setPic] = useState('');
  const settingPic = (value: string) => {
    setPic(value);
  };

  const { photo } = useSelector(userSelector);
  const defaultPicture = 'assets/images/defaultUnivPicture.svg';
  const avatar = photo ? photo : defaultPicture;

  const imageHandler = (image: string) => {
    setLoading(true);

    requestImageProfile(`${APIUrl}Users/Current/ChangePhoto`, 'POST', {
      photo: image,
    })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          // setError('');
          setSuccessLoad(true);
          setLoading(false);
          setProfileImageSrc(res.data.photo);
          store.dispatch(
            setUserPhoto({
              photo: res.data.photo,
            })
          );
        } else {
          setError(res.data.message || 'Щось пішло не так, спробуйте знову.');
          setLoading(false);
        }
      })
      .catch((err) => {
        // setError('Щось пішло не так, ви можете спробувати знову.');
        setLoading(false);
      });
  };

  useEffect(() => {
    requestData(`${APIUrl}School/GetAllSchoolNamesAsStringsAsync`, 'GET')
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
          setListSchool(res.data);
        } else {
          setError({
            hasError: true,
            errorStatusCode: res.statusCode,
            errorMessage:
              res.data.message || 'Щось пішло не так, спробуйте знову.',
          });
        }
      })
      .catch((error) => {
        setError({
          hasError: true,
          errorStatusCode: error.statusCode,
          errorMessage: 'Щось пішло не так, спробуйте знову.',
        });
      });
  }, []);

  return (
    <Fragment>
      <section className={styles.mainStyle}>
        <ImageUploader
          additionalStyles={avatarSyles}
          avatar={avatar}
          aspectRatio={1}
          text='профілю'
          imageHandler={imageHandler}
        />
        <div className={styles.wrapper}>
          <div className={styles.titleContainer}>
            <h4 className={styles.title}>Персональні дані</h4>
            {useYIFProfile.submitted && !useYIFProfile.error.hasError && (
              <div className={styles.spinner}>
                <Spinner />
              </div>
            )}
            {useYIFProfile.error.hasError && (
              <FormInputError
                errorType='form'
                errorMessage={useYIFProfile.error.errorMessage}
              />
            )}
            {useYIFProfile.success.hasSuccess && (
              <FormInputSuccess
                successMessage={useYIFProfile.success.successMessage}
              />
            )}
          </div>
          <Formik
            initialValues={{
              lastName: user.surname,
              firstName: user.name,
              fathersName: user.middleName,
              email: user.email,
              phone: user.phoneNumber,
              school: user.schoolName,
            }}
            enableReinitialize
            validationSchema={validationField}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              console.log(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              setFieldTouched,
              setFieldValue,
            }) => (
              <Form
                className={styles.form}
                onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
                  handleSubmit(e);
                  if (
                    touched.firstName &&
                    errors.firstName === undefined &&
                    errors.lastName === undefined &&
                    errors.fathersName === undefined &&
                    errors.email === undefined &&
                    errors.phone === undefined &&
                    errors.school === undefined
                  ) {
                    useYIFProfile.handleSubmit(e);
                  }
                }}
              >
                <div>
                  <Field
                    id='lastNameInput'
                    component={FormInputProfile}
                    data-testid='lastName'
                    fieldText='Last name'
                    iconName='user'
                    type='text'
                    name='lastName'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      useYIFProfile.handleLastNameChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                </div>
                <div>
                  <Field
                    id='firstNameInput'
                    component={FormInputProfile}
                    data-testid='firstName'
                    fieldText='First name'
                    iconName='user'
                    type='text'
                    name='firstName'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      useYIFProfile.handleFirstNameChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                </div>
                <div>
                  <Field
                    id='fathersNameInput'
                    component={FormInputProfile}
                    data-testid='fathersName'
                    fieldText='Fathers name'
                    iconName='user'
                    type='text'
                    name='fathersName'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      useYIFProfile.handleFathersNameChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.fathersName}
                  />
                </div>
                <div>
                  <Field
                    id='emailUserInput'
                    component={FormInputProfile}
                    data-testid='email'
                    fieldText='email'
                    iconName='email'
                    type='email'
                    name='email'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      useYIFProfile.handleEmailChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div>
                  <Field
                    id='phoneInput'
                    component={FormInputProfile}
                    data-testid='phone'
                    fieldText='phone'
                    iconName='phone'
                    type='tel'
                    name='phone'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      useYIFProfile.handlePhoneChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                </div>
                <div className={styles.selectWrapper}>
                  <label className={styles.labelSelect}>Школа</label>
                  <Field
                    id='selectInput'
                    data-testid='select'
                    name='school'
                    as='select'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      useYIFProfile.handleSchoolChange(e);
                    }}
                  >
                    <option className={styles.selectField} value=''>
                      Виберіть свою школу
                    </option>
                    {listSchool.map((option, index) => {
                      return (
                        <option
                          className={styles.selectField}
                          key={index}
                          value={option}
                        >
                          {option}
                        </option>
                      );
                    })}
                  </Field>
                </div>
                <div className={styles.button}>
                  <FormButton
                    id='userProfileButton'
                    data-testid='button'
                    form='profile'
                    title='Відправити'
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className={styles.img}>
          <img src='assets/images/userProfile.svg' alt='user' />
        </div>
      </section>
    </Fragment>
  );
};

export default UserOption;

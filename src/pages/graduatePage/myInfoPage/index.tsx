import React, { useEffect, useState } from 'react';
import styles from './myInfo.module.scss';
import {
  FormButton,
  FormInputError,
} from '../../../components/common/formElements';
import { Field, Form, Formik } from 'formik';
import { validationField } from '../../../services/validateForm/ValidatorsField';
import FormInputProfile from '../../../components/common/formElements/formInputProfile';
import Spinner from '../../../components/common/spinner';
import ImageUploader from '../../../components/imageUploader';
import useProfile from '../../../services/useProfile';
import { APIUrl } from '../../../services/endpoints';
import { FormInputSuccess } from '../../../components/common/formElements/formInputSuccess/formInputSuccess';
import { userSelector } from '../../../store/reducers/setUserReducer';
import { useSelector } from 'react-redux';
import { requestData } from '../../../services/requestDataFunction';
import { requestImageProfile } from '../../../services/requestDataFunction';
import { store } from '../../../store/store';
import { setUserPhoto } from '../../../store/reducers/setUserReducer';

const MyInfo = () => {
  const url = `${APIUrl}Users/Current/SetProfile`;
  const useYIFProfile = useProfile(url);
  const user = useSelector(userSelector);
  const [listSchool, setListSchool] = useState([]);
  const { photo } = useSelector(userSelector);
  const defaultPicture = '/assets/icons/avatar.jpg';
  const avatar = photo ? photo : defaultPicture;

  const imageHandler = (image: string) => {
    requestImageProfile(`${APIUrl}Users/Current/ChangePhoto`, 'POST', {
      photo: image,
    })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          store.dispatch(
            setUserPhoto({
              photo: res.data.photo,
            })
          );
        } else {
          useYIFProfile.setError({
            hasError: true,
            errorStatusCode: res.statusCode,
            errorMessage:
              res.data.message || 'Щось пішло не так, спробуйте знову.',
          });
        }
      })
      .catch((errr) => {
        console.log(errr);
      });
  };

  useEffect(() => {
    requestData(`${APIUrl}School/GetAllSchoolNamesAsStringsAsync`, 'GET')
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setListSchool(res.data);
        } else {
          useYIFProfile.setError({
            hasError: true,
            errorStatusCode: res.statusCode,
            errorMessage:
              res.data.message || 'Щось пішло не так, спробуйте знову.',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.mainStyle}>
        <ImageUploader
          additionalStyles={{}}
          avatar={avatar}
          aspectRatio={1}
          text='профілю'
          imageHandler={imageHandler}
        />
        <div className={styles.wrapper}>
          <div className={styles.titleContainer}>
            <h4 className={styles.title}>Мої дані</h4>
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
            onSubmit={() => {}}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
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
      </section>
    </div>
  );
};

export default MyInfo;

import React, {Fragment} from "react";
import styles from "./userOption.module.scss";
import {
  FormButton,
  FormInputError,
} from "../../../common/formElements";
import {Field, Form, Formik} from "formik";
import {validationField} from "../../../../services/validateForm/ValidatorsField";
import FormInputProfile from "../../../common/formElements/formInputProfile";
import Spinner from "../../../common/spinner";

const UserOption = () => {

  return (
      <Fragment>
        <section className={styles.mainStyle}>
          <div className={styles.wrapperImg}>
            <img
                src='assets/icons/avatar.jpg'
                alt='avatar'
                className={styles.imgAvatar}
            />
          </div>
          <h4 className={styles.title}>
            Персональні дані
          </h4>
           {/*The error component should be here and Spinner*/}
          <div className={styles.wrapper}>
            <Formik
                initialValues={{
                  lastName: '',
                  firstName: '',
                  fathersName: '',
                  email: '',
                  phone: '',
                  school: '',
                }}
                validationSchema={validationField}
                onSubmit={(values, actions) => {
                  actions.setSubmitting(false);
                  actions.resetForm({
                    values: {
                      lastName: '',
                      firstName: '',
                      fathersName: '',
                      email: '',
                      phone: '',
                      school: '',
                    },
                  });
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
                }) => (
                  <Form className={styles.form}
                        onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
                          handleSubmit(e);
                          console.log(values)
                        }}
                  >
                    <div>
                      <Field
                          component={FormInputProfile}
                          data-testid="lastName"
                          fieldText='Last name'
                          iconName='user'
                          type='text'
                          name='lastName'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          value={values.lastName}
                      />
                    </div>
                    <div>
                      <Field
                          component={FormInputProfile}
                          data-testid='firstName'
                          fieldText='First name'
                          iconName='user'
                          type='text'
                          name='firstName'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          value={values.firstName}
                      />
                    </div>
                    <div>
                      <Field
                          component={FormInputProfile}
                          data-testid='fathersName'
                          fieldText='Fathers name'
                          iconName='user'
                          type='text'
                          name='fathersName'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          value={values.fathersName}
                      />
                    </div>
                    <div>
                      <Field
                          component={FormInputProfile}
                          data-testid='email'
                          fieldText='email'
                          iconName='email'
                          type='email'
                          name='email'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          value={values.email}
                      />
                    </div>
                    <div>
                      <Field
                          component={FormInputProfile}
                          data-testid='phone'
                          fieldText='phone'
                          iconName='phone'
                          type='tel'
                          name='phone'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          value={values.phone}
                      />
                    </div>
                    <div>
                      <Field
                          component={FormInputProfile}
                          data-testid='school'
                          fieldText='school'
                          iconName='school'
                          type='school'
                          name='school'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          value={values.school}
                      />
                    </div>
                    <div className={styles.button}>
                      <FormButton data-testid='button' form='profile'
                                  title='Відправити'/>
                    </div>
                  </Form>
              )}
            </Formik>
            <div className={styles.img}>
              <img
                  src='assets/images/imgProfile.png'
                  alt='user'
              /></div>
          </div>
        </section>
      </Fragment>
  )
};

export default UserOption;
